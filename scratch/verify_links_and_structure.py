#!/usr/bin/env python3
"""
Comprehensive Link & Structure Integrity Verifier for GOTRACE Docs
Author: Challenger 1 (challenger_link_integrity)
"""

import os
import re
import sys
import urllib.parse
from collections import defaultdict

DOCS_DIR = os.path.abspath("/Users/mac/mekong cli lastest/GOTRACE/docs")
WORKSPACE_ROOT = os.path.abspath("/Users/mac/mekong cli lastest/GOTRACE")

EXPECTED_FLAT_00_09_DOCS = [
    "00_MASTER_INDEX.md",
    "00_Executive_Brief.md",
    "01_Mekong_Market_Intelligence_GTM_2026_2030.md",
    "02_Platform_Object_Implementation_Blueprint.md",
    "03_Rice_Playbook.md",
    "04_Fruit_Playbook.md",
    "05_Kitchen_Playbook.md",
    "06_PMO_Master_Execution_Plan.md",
    "07_Target_Account_Map.md",
    "08_Sales_Discovery_Playbook.md",
    "09_Strategic_Gap_Analysis.md",
]

GHOST_FILENAMES = [
    "00_Strategy.md",
    "06_ICP_Account_List.md",
]

# Patterns for links
MD_LINK_RE = re.compile(r'!?\[([^\]]*)\]\(([^)]+)\)')
MD_REF_DEF_RE = re.compile(r'^\s*\[([^\]]+)\]:\s*(\S+)', re.MULTILINE)
HTML_LINK_RE = re.compile(r'(?:href|src)=["\']([^"\']+)["\']', re.IGNORECASE)
HTML_ANCHOR_TARGET_RE = re.compile(r'<a\s+[^>]*(?:name|id)=["\']([^"\']+)["\']', re.IGNORECASE)

def github_slugify(heading_text):
    """
    Simulate standard Markdown heading anchor generation.
    Handles Vietnamese unicode, punctuation removal, space to dash.
    """
    text = heading_text.strip().lower()
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = text.replace('`', '').replace('*', '').replace('_', '')
    cleaned = []
    for ch in text:
        if ch.isalnum() or ch in (' ', '-', '_'):
            cleaned.append(ch)
        elif ch in ('.', ':', '?', '!', ',', ';', '(', ')', '[', ']', '{', '}', '/', '\\', '"', "'", '`', '—', '–', '+', '=', '*', '%', '$', '#', '@', '&'):
            continue
        else:
            cleaned.append(ch)
    text = "".join(cleaned)
    slug = re.sub(r'\s+', '-', text)
    return slug

def extract_anchors_and_headings(file_path):
    """
    Extract headings, slug anchors, and explicit HTML anchor tags (<a name="..."> or <a id="...">)
    from a markdown file.
    """
    headings = []
    slug_counts = defaultdict(int)
    valid_anchors = set()
    
    if not os.path.isfile(file_path):
        return headings, valid_anchors

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return headings, valid_anchors

    in_code_block = False
    for line_idx, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        
        # 1. HTML explicit anchor targets: <a name="..."> or <a id="...">
        for m in HTML_ANCHOR_TARGET_RE.finditer(line):
            anchor_name = m.group(1).strip()
            valid_anchors.add(anchor_name)
            valid_anchors.add(github_slugify(anchor_name))

        # 2. Heading match: # Heading
        m = re.match(r'^(#{1,6})\s+(.*)$', stripped)
        if m:
            heading_content = m.group(2).strip()
            # GitHub custom anchor syntax: {#custom-id}
            custom_anchor_match = re.search(r'\{#([a-zA-Z0-9_\-]+)\}\s*$', heading_content)
            if custom_anchor_match:
                custom_id = custom_anchor_match.group(1)
                valid_anchors.add(custom_id)
                heading_content = re.sub(r'\{#[a-zA-Z0-9_\-]+\}\s*$', '', heading_content).strip()
            
            slug = github_slugify(heading_content)
            if slug_counts[slug] > 0:
                slug_with_count = f"{slug}-{slug_counts[slug]}"
            else:
                slug_with_count = slug
            slug_counts[slug] += 1
            valid_anchors.add(slug_with_count)
            valid_anchors.add(slug)
            headings.append((line_idx, m.group(1), heading_content, slug_with_count))
            
    return headings, valid_anchors

def find_all_markdown_files(root_dir):
    md_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for f in filenames:
            if f.endswith('.md'):
                md_files.append(os.path.join(dirpath, f))
    return sorted(md_files)

def parse_links_from_file(file_path):
    links = []
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return links

    in_code_block = False
    for line_no, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
            
        # 1. Standard markdown links
        for m in MD_LINK_RE.finditer(line):
            text = m.group(1)
            target = m.group(2).strip()
            if ' ' in target:
                target_parts = target.split()
                if len(target_parts) > 1 and (target_parts[1].startswith('"') or target_parts[1].startswith("'")):
                    target = target_parts[0]
            links.append((line_no, text, target, 'markdown'))

        # 2. Reference definitions
        for m in MD_REF_DEF_RE.finditer(line):
            ref = m.group(1)
            target = m.group(2).strip()
            links.append((line_no, ref, target, 'ref_def'))

        # 3. HTML links
        for m in HTML_LINK_RE.finditer(line):
            target = m.group(1).strip()
            links.append((line_no, 'HTML', target, 'html'))

    return links

def main():
    print("=" * 80)
    print("EMPIRICAL CHALLENGER: 100% LINK & STRUCTURE INTEGRITY AUDIT")
    print("=" * 80)
    print(f"Target Docs Directory: {DOCS_DIR}")
    print(f"Workspace Root: {WORKSPACE_ROOT}\n")

    # Step 1: Check root docs flat structure
    print("[CHECK 1] Flat Structure 00-09 in docs/ root:")
    root_entries = os.listdir(DOCS_DIR)
    root_md_files = sorted([f for f in root_entries if f.endswith('.md')])
    root_subdirs = sorted([d for d in root_entries if os.path.isdir(os.path.join(DOCS_DIR, d))])

    print(f"Found {len(root_md_files)} markdown files in docs/ root:")
    for f in root_md_files:
        print(f"  - {f}")
    print(f"Found subdirectories: {root_subdirs}")

    structure_passed = True
    if len(root_md_files) != 11:
        print(f"❌ FAIL: Expected exactly 11 markdown files, found {len(root_md_files)}")
        structure_passed = False
    else:
        print("✅ PASS: Exactly 11 markdown files found in docs/ root.")

    missing_expected = set(EXPECTED_FLAT_00_09_DOCS) - set(root_md_files)
    unexpected_files = set(root_md_files) - set(EXPECTED_FLAT_00_09_DOCS)
    if missing_expected:
        print(f"❌ Missing expected files: {missing_expected}")
        structure_passed = False
    if unexpected_files:
        print(f"❌ Unexpected markdown files in docs/ root: {unexpected_files}")
        structure_passed = False
    if not missing_expected and not unexpected_files:
        print("✅ PASS: All 11 markdown files match exact expected 00-09 specification.")

    print("\n" + "-" * 80)

    # Step 2: Ghost Files Audit
    print("[CHECK 2] Ghost Files Reference Audit:")
    all_md_files = find_all_markdown_files(DOCS_DIR)
    print(f"Scanning {len(all_md_files)} total markdown files across docs/ and subdirectories...")

    ghost_hyperlinks = []
    ghost_active_mentions = []
    
    # Check active 11 docs for any ghost mentions
    for md_file in [os.path.join(DOCS_DIR, f) for f in root_md_files]:
        with open(md_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        for ghost in GHOST_FILENAMES:
            if ghost in content:
                for line_idx, line in enumerate(content.splitlines(), 1):
                    if ghost in line:
                        ghost_active_mentions.append((md_file, line_idx, ghost, line.strip()))

    # Check ALL docs (including archive) for any hyperlinks targeting ghost files
    for md_file in all_md_files:
        links = parse_links_from_file(md_file)
        for line_no, text, target, link_type in links:
            for ghost in GHOST_FILENAMES:
                if ghost in target:
                    ghost_hyperlinks.append((md_file, line_no, text, target, ghost))

    ghost_passed = True
    if ghost_active_mentions:
        print(f"❌ FAIL: Active docs contain {len(ghost_active_mentions)} mentions of ghost files:")
        for fpath, lno, ghost, line in ghost_active_mentions:
            print(f"  {os.path.basename(fpath)}:{lno} -> {ghost}: {line[:100]}")
        ghost_passed = False
    else:
        print("✅ PASS: 0 ghost file mentions in the 11 active documents.")

    if ghost_hyperlinks:
        print(f"❌ FAIL: Found {len(ghost_hyperlinks)} hyperlinks targeting ghost files:")
        for fpath, lno, text, target, ghost in ghost_hyperlinks:
            rel = os.path.relpath(fpath, WORKSPACE_ROOT)
            print(f"  {rel}:{lno} [{text}]({target})")
        ghost_passed = False
    else:
        print("✅ PASS: 0 hyperlinks anywhere in the project point to ghost files.")

    print("\n" + "-" * 80)

    # Step 3: Scan all headings & HTML anchor targets to build anchor database
    print("[CHECK 3] Building Heading & Anchor Target Database...")
    file_headings = {}
    file_anchors = {}
    for md_file in all_md_files:
        headings, anchors = extract_anchors_and_headings(md_file)
        file_headings[md_file] = headings
        file_anchors[md_file] = anchors
    total_headings = sum(len(h) for h in file_headings.values())
    total_anchors = sum(len(a) for a in file_anchors.values())
    print(f"Indexed {total_headings} headings and {total_anchors} valid anchor targets across {len(all_md_files)} files.")

    print("\n" + "-" * 80)

    # Step 4: Extract and Verify 100% of Hyperlinks
    print("[CHECK 4] Hyperlink Empirical Verification (100% Scan):")

    total_links = 0
    external_links = 0
    anchor_only_links = 0
    relative_file_links = 0
    broken_file_links = []
    broken_anchor_links = []
    passed_links = []

    for md_file in all_md_files:
        rel_src = os.path.relpath(md_file, WORKSPACE_ROOT)
        links = parse_links_from_file(md_file)
        for line_no, text, target, link_type in links:
            total_links += 1
            target_clean = target.strip()
            
            # External or special protocols
            if target_clean.startswith(('http://', 'https://', 'mailto:', 'tel:', 'ftp://')):
                external_links += 1
                continue

            # Pure in-file anchor: #heading
            if target_clean.startswith('#'):
                anchor_only_links += 1
                anchor_name = urllib.parse.unquote(target_clean[1:])
                valid_anchors = file_anchors.get(md_file, set())
                if anchor_name in valid_anchors or github_slugify(anchor_name) in valid_anchors:
                    passed_links.append((rel_src, line_no, text, target_clean, "IN_FILE_ANCHOR_OK"))
                else:
                    broken_anchor_links.append((rel_src, line_no, text, target_clean, f"Anchor '#{anchor_name}' not found in current file"))
                continue

            # Relative or absolute file link, possibly with anchor: target.md#anchor
            relative_file_links += 1
            file_part = target_clean
            anchor_part = None
            if '#' in target_clean:
                file_part, anchor_part = target_clean.split('#', 1)
                anchor_part = urllib.parse.unquote(anchor_part)

            if '?' in file_part:
                file_part = file_part.split('?', 1)[0]

            # Resolve target path relative to md_file directory
            src_dir = os.path.dirname(md_file)
            resolved_target = os.path.abspath(os.path.join(src_dir, file_part))

            # 1. Check physical file existence on disk
            if not os.path.exists(resolved_target):
                broken_file_links.append((rel_src, line_no, text, target_clean, f"Target file does not exist on disk: {resolved_target}"))
                continue

            # 2. If anchor is attached, check anchor in target file
            if anchor_part and resolved_target.endswith('.md'):
                target_anchors = file_anchors.get(resolved_target, set())
                if not target_anchors and os.path.exists(resolved_target):
                    _, target_anchors = extract_anchors_and_headings(resolved_target)
                    file_anchors[resolved_target] = target_anchors
                
                if anchor_part in target_anchors or github_slugify(anchor_part) in target_anchors:
                    passed_links.append((rel_src, line_no, text, target_clean, "FILE_AND_ANCHOR_OK"))
                else:
                    broken_anchor_links.append((rel_src, line_no, text, target_clean, f"Anchor '#{anchor_part}' not found in target file '{os.path.basename(resolved_target)}'"))
            else:
                passed_links.append((rel_src, line_no, text, target_clean, "FILE_OK"))

    print(f"Total links parsed: {total_links}")
    print(f"  - External links (http/https/etc.): {external_links}")
    print(f"  - In-file anchor links (#...): {anchor_only_links}")
    print(f"  - Relative file links: {relative_file_links}")
    print(f"  - Passed verified links: {len(passed_links)}")
    print(f"  - Broken file links (404): {len(broken_file_links)}")
    print(f"  - Broken anchor links: {len(broken_anchor_links)}")

    if broken_file_links:
        print("\n❌ BROKEN FILE LINKS DETAILS:")
        for src, line_no, text, target, reason in broken_file_links:
            print(f"  [{src}:{line_no}] '{text}' -> '{target}': {reason}")

    if broken_anchor_links:
        print("\n❌ BROKEN ANCHOR LINKS DETAILS:")
        for src, line_no, text, target, reason in broken_anchor_links:
            print(f"  [{src}:{line_no}] '{text}' -> '{target}': {reason}")

    print("\n" + "=" * 80)
    print("AUDIT SUMMARY & VERDICT")
    print("=" * 80)
    
    total_defects = len(broken_file_links) + len(broken_anchor_links) + (0 if structure_passed else 1) + (0 if ghost_passed else 1)
    
    print(f"1. Flat Structure 00-09 (exact 11 files in docs/ root): {'PASS' if structure_passed else 'FAIL'}")
    print(f"2. Ghost File Elimination (0 un-rerouted/broken refs): {'PASS' if ghost_passed else 'FAIL'}")
    print(f"3. Relative File Links (100% exist on disk, 0 broken): {'PASS' if len(broken_file_links) == 0 else 'FAIL'}")
    print(f"4. Anchor Links Integrity (100% anchors exist): {'PASS' if len(broken_anchor_links) == 0 else 'FAIL'}")
    print(f"Total defects found: {total_defects}")
    
    verdict = "APPROVE" if total_defects == 0 else "REJECT"
    print(f"\nFINAL VERDICT: >>> {verdict} <<<")
    print("=" * 80)

    return total_defects

if __name__ == "__main__":
    sys.exit(main())
