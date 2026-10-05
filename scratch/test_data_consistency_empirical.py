#!/usr/bin/env python3
"""
EMPIRICAL TEST SUITE: CHALLENGER 2 — DATA CONSISTENCY, SCHEMAS & RISK RULES
Target files:
  - docs/03_Rice_Playbook.md
  - docs/04_Fruit_Playbook.md
  - docs/05_Kitchen_Playbook.md
  - docs/06_PMO_Master_Execution_Plan.md
Additional verification:
  - docs/00_MASTER_INDEX.md
  - docs/01_Mekong_Market_Intelligence_GTM_2026_2030.md
"""

import os
import re
import sys
import yaml
from typing import Dict, List, Any, Tuple

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")

TARGET_FILES = {
    "rice": os.path.join(DOCS_DIR, "03_Rice_Playbook.md"),
    "fruit": os.path.join(DOCS_DIR, "04_Fruit_Playbook.md"),
    "kitchen": os.path.join(DOCS_DIR, "05_Kitchen_Playbook.md"),
    "pmo": os.path.join(DOCS_DIR, "06_PMO_Master_Execution_Plan.md"),
}

all_test_results = {
    "yaml_validation": {},
    "canonical_events": {},
    "risk_rules_fruit": {},
    "risk_rules_kitchen": {},
    "pmo_chapters": {},
    "pmo_risks": {},
    "mass_balance": {},
    "dbscl_statistics": {},
}

def extract_code_blocks(filepath: str, lang: str = "yaml") -> List[Tuple[int, str]]:
    """Extract code blocks of given language with 1-based start line number."""
    blocks = []
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    in_block = False
    start_line = 0
    current_block = []
    fence_pattern = re.compile(rf"^```+{lang}\s*$", re.IGNORECASE)
    close_pattern = re.compile(r"^```+\s*$")
    
    for idx, line in enumerate(lines, 1):
        if not in_block:
            if fence_pattern.match(line.strip()):
                in_block = True
                start_line = idx
                current_block = []
        else:
            if close_pattern.match(line.strip()):
                in_block = False
                blocks.append((start_line, "".join(current_block)))
                current_block = []
            else:
                current_block.append(line)
    return blocks

# =============================================================================
# SUITE 1: 100% YAML SCHEMA SYNTAX VALIDATION
# =============================================================================
def test_yaml_schemas():
    print("\n" + "=" * 80)
    print("SUITE 1: 100% YAML SCHEMA SYNTAX PARSING & VALIDATION")
    print("=" * 80)
    
    total_yaml_blocks = 0
    valid_yaml_blocks = 0
    invalid_yaml_blocks = 0
    details = []
    
    for key, path in TARGET_FILES.items():
        fname = os.path.basename(path)
        blocks = extract_code_blocks(path, "yaml")
        print(f"\nAnalyzing file: {fname} (Found {len(blocks)} YAML blocks)")
        
        for block_idx, (start_line, content) in enumerate(blocks, 1):
            total_yaml_blocks += 1
            # Attempt to parse YAML
            try:
                # Use load_all in case multiple YAML documents exist in block
                parsed_docs = list(yaml.safe_load_all(content))
                valid_yaml_blocks += 1
                doc_types = [type(d).__name__ for d in parsed_docs if d is not None]
                top_keys = []
                for d in parsed_docs:
                    if isinstance(d, dict):
                        top_keys.extend(list(d.keys())[:3])
                summary = f"Valid ({len(parsed_docs)} docs, types: {doc_types}, keys: {top_keys[:4]})"
                print(f"  [PASS] Block #{block_idx} at line {start_line}: {summary}")
                details.append({
                    "file": fname,
                    "line": start_line,
                    "status": "PASS",
                    "docs_count": len(parsed_docs),
                    "error": None
                })
            except Exception as e:
                invalid_yaml_blocks += 1
                print(f"  [FAIL] Block #{block_idx} at line {start_line}: Syntax Error: {e}")
                details.append({
                    "file": fname,
                    "line": start_line,
                    "status": "FAIL",
                    "docs_count": 0,
                    "error": str(e)
                })
                
    all_test_results["yaml_validation"] = {
        "total": total_yaml_blocks,
        "valid": valid_yaml_blocks,
        "invalid": invalid_yaml_blocks,
        "success_rate": (valid_yaml_blocks / total_yaml_blocks * 100) if total_yaml_blocks > 0 else 0,
        "details": details
    }
    print(f"\n--> YAML Validation Summary: Total={total_yaml_blocks}, Valid={valid_yaml_blocks}, Invalid={invalid_yaml_blocks}")
    assert invalid_yaml_blocks == 0, f"Found {invalid_yaml_blocks} invalid YAML blocks!"

# =============================================================================
# SUITE 2: CANONICAL EVENTS & RISK RULES COUNTING
# =============================================================================
def test_canonical_events_rice():
    print("\n" + "=" * 80)
    print("SUITE 2A: RICE PLAYBOOK 29 CANONICAL EVENTS AUDIT")
    print("=" * 80)
    path = TARGET_FILES["rice"]
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Check table rows for Canonical Events (1 to 29)
    # Row pattern: | # | Event Code | ...
    event_table_pattern = re.compile(r"^\|\s*(\d+)\s*\|\s*`?([A-Z0-9_]+)`?\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|", re.MULTILINE)
    matches = event_table_pattern.findall(content)
    
    events_found = []
    for m in matches:
        num, code, name, phase, trigger, actor, inputs, outputs, evidence, rules = m
        events_found.append({
            "num": int(num),
            "code": code.strip("` "),
            "name": name.strip(),
            "phase": phase.strip(),
            "actor": actor.strip(),
            "evidence": evidence.strip()
        })
        
    print(f"Total Canonical Events extracted from Table: {len(events_found)}")
    for ev in events_found:
        print(f"  Event #{ev['num']:02d}: {ev['code']:<25} | {ev['name']:<35} | {ev['phase']}")
    
    # Verify continuity
    nums = [e["num"] for e in events_found]
    expected_nums = list(range(1, 30))
    is_continuous = (nums == expected_nums)
    
    # Check mermaid diagram
    mermaid_events = re.findall(r"E\d+\[\s*(\d+)\.\s*([A-Z0-9_]+)\s*\]", content)
    print(f"Total Canonical Events mapped in Mermaid diagram: {len(mermaid_events)}")
    
    all_test_results["canonical_events"] = {
        "count": len(events_found),
        "expected": 29,
        "is_continuous": is_continuous,
        "mermaid_count": len(mermaid_events),
        "events": events_found
    }
    assert len(events_found) == 29, f"Expected 29 events, found {len(events_found)}"
    assert is_continuous, f"Event numbers not strictly 1..29: {nums}"

def test_risk_rules_fruit():
    print("\n" + "=" * 80)
    print("SUITE 2B: FRUIT PLAYBOOK 10 RISK RULES (R01-R10) AUDIT")
    print("=" * 80)
    path = TARGET_FILES["fruit"]
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Table pattern: | **R01** | **Unapproved Growing Area** | **CRITICAL** | `Logic` | Impact | Action |
    rule_pattern = re.compile(r"^\|\s*\*\*?(R\d+)\*\*?\s*\|\s*\*\*?([^|*]+)\*\*?\s*\|\s*\*\*?([A-Z]+)\*\*?\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*([^|]+)\|", re.MULTILINE)
    matches = rule_pattern.findall(content)
    
    rules = []
    for m in matches:
        code, name, severity, logic, impact, action = m
        rules.append({
            "code": code.strip(),
            "name": name.strip(),
            "severity": severity.strip(),
            "logic": logic.strip(),
            "impact": impact.strip(),
            "action": action.strip()
        })
        
    print(f"Total Fruit Risk Rules extracted from Table: {len(rules)}")
    for r in rules:
        print(f"  {r['code']}: [{r['severity']:<8}] {r['name']:<30} -> {r['action'][:50]}...")
        
    rule_codes = [r["code"] for r in rules]
    expected_codes = [f"R{i:02d}" for i in range(1, 11)]
    is_complete = (rule_codes == expected_codes)
    
    all_test_results["risk_rules_fruit"] = {
        "count": len(rules),
        "expected": 10,
        "is_complete": is_complete,
        "rules": rules
    }
    assert len(rules) == 10, f"Expected 10 Fruit risk rules, found {len(rules)}"
    assert is_complete, f"Fruit risk rule codes mismatch: {rule_codes} vs {expected_codes}"

def test_risk_rules_kitchen():
    print("\n" + "=" * 80)
    print("SUITE 2C: KITCHEN PLAYBOOK 9 RISK RULES (K01-K09) AUDIT")
    print("=" * 80)
    path = TARGET_FILES["kitchen"]
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Box pattern matching with re.DOTALL to handle multiline Logic and Action
    box_pattern = re.compile(
        r"│\s*(K\d+)\s*—\s*([^│\n]+)\s*│\n│\s*Severity:\s*([A-Z]+)[^\n]*\n│\s*Logic:\s*(.*?)\n│\s*Action:\s*(.*?)└",
        re.DOTALL
    )
    matches = box_pattern.findall(content)
    
    rules = []
    for m in matches:
        code, name, severity, logic, action = m
        clean_action = re.sub(r"\s*│\s*", " ", action).strip()
        clean_logic = re.sub(r"\s*│\s*", " ", logic).strip()
        rules.append({
            "code": code.strip(),
            "name": name.strip(),
            "severity": severity.strip(),
            "logic": clean_logic,
            "action": clean_action
        })
        
    print(f"Total Kitchen Risk Rules extracted: {len(rules)}")
    for r in rules:
        print(f"  {r['code']}: [{r['severity']:<8}] {r['name']:<40}")
        
    rule_codes = [r["code"] for r in rules]
    expected_codes = [f"K{i:02d}" for i in range(1, 10)]
    is_complete = (rule_codes == expected_codes)
    
    all_test_results["risk_rules_kitchen"] = {
        "count": len(rules),
        "expected": 9,
        "is_complete": is_complete,
        "rules": rules
    }
    assert len(rules) == 9, f"Expected 9 Kitchen risk rules, found {len(rules)}"
    assert is_complete, f"Kitchen risk rule codes mismatch: {rule_codes} vs {expected_codes}"

def test_pmo_chapters_and_risks():
    print("\n" + "=" * 80)
    print("SUITE 2D: PMO MASTER 44 CHAPTERS & 14 RISKS (R01-R14) AUDIT")
    print("=" * 80)
    path = TARGET_FILES["pmo"]
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Chapters: ## CHƯƠNG (\d+): (.*)
    chapter_pattern = re.compile(r"^##\s*CHƯƠNG\s+(\d+):\s*(.*)$", re.MULTILINE)
    chapter_matches = chapter_pattern.findall(content)
    
    chapters = []
    for num_str, title in chapter_matches:
        chapters.append((int(num_str), title.strip()))
        
    print(f"Total PMO Chapters found: {len(chapters)}")
    for num, title in chapters:
        print(f"  Chương {num:02d}: {title}")
        
    ch_nums = [c[0] for c in chapters]
    expected_ch_nums = list(range(1, 45))
    chapters_valid = (ch_nums == expected_ch_nums)
    
    # Risks: in Chapter 29
    risk_pattern = re.compile(r"^\|\s*\*\*?(R\d+)\*\*?\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|", re.MULTILINE)
    risk_matches = risk_pattern.findall(content)
    
    pmo_risks = []
    for m in risk_matches:
        code, desc, prob, impact, owner, mitigation = m
        pmo_risks.append({
            "code": code.strip(),
            "desc": desc.strip(),
            "prob": prob.strip().strip("*"),
            "impact": impact.strip().strip("*"),
            "owner": owner.strip(),
            "mitigation": mitigation.strip()
        })
        
    print(f"\nTotal PMO Risks extracted: {len(pmo_risks)}")
    for r in pmo_risks:
        print(f"  {r['code']}: [{r['prob']}/{r['impact']}] {r['desc'][:40]}... (Owner: {r['owner']})")
        
    risk_codes = [r["code"] for r in pmo_risks]
    expected_risk_codes = [f"R{i:02d}" for i in range(1, 15)]
    risks_valid = (risk_codes == expected_risk_codes)
    
    all_test_results["pmo_chapters"] = {
        "count": len(chapters),
        "expected": 44,
        "is_continuous": chapters_valid,
        "chapters": chapters
    }
    all_test_results["pmo_risks"] = {
        "count": len(pmo_risks),
        "expected": 14,
        "is_complete": risks_valid,
        "risks": pmo_risks
    }
    assert len(chapters) == 44, f"Expected 44 PMO chapters, found {len(chapters)}"
    assert chapters_valid, f"PMO chapters sequence not 1..44: {ch_nums}"
    assert len(pmo_risks) == 14, f"Expected 14 PMO risks, found {len(pmo_risks)}"
    assert risks_valid, f"PMO risk codes mismatch: {risk_codes} vs {expected_risk_codes}"

# =============================================================================
# SUITE 3: MASS BALANCE FORMULATION & PYTHON CODE EXECUTION
# =============================================================================
def test_rice_mass_balance():
    print("\n" + "=" * 80)
    print("SUITE 3: RICE MASS BALANCE & FRAUD DETECTION EMPIRICAL EXECUTION")
    print("=" * 80)
    path = TARGET_FILES["rice"]
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Extract evaluate_rice_mass_balance and calculate_proportional_ancestry
    # from python code block
    py_blocks = extract_code_blocks(path, "python")
    print(f"Found {len(py_blocks)} Python code blocks in 03_Rice_Playbook.md")
    
    mb_code = ""
    for start_line, code in py_blocks:
        if "evaluate_rice_mass_balance" in code:
            mb_code = code
            print(f"Extracted Mass Balance code block at line {start_line} ({len(code.splitlines())} lines)")
            break
            
    assert mb_code, "Failed to find evaluate_rice_mass_balance code block in 03_Rice_Playbook.md"
    
    # Execute the code in a sandbox dictionary
    exec_scope = {}
    exec(mb_code, exec_scope)
    evaluate_rice_mass_balance = exec_scope.get("evaluate_rice_mass_balance")
    calculate_proportional_ancestry = exec_scope.get("calculate_proportional_ancestry")
    
    assert callable(evaluate_rice_mass_balance), "evaluate_rice_mass_balance is not callable"
    assert callable(calculate_proportional_ancestry), "calculate_proportional_ancestry is not callable"
    
    test_cases = [
        {
            "name": "Normal Compliant Batch (66% head, 2.5% broken, 8% bran, 22% husk, 1.5% loss)",
            "params": {
                "dry_paddy_kg": 10000.0,
                "head_rice_kg": 6600.0,
                "broken_rice_kg": 250.0,
                "bran_kg": 800.0,
                "husk_kg": 2200.0,
                "loss_kg": 150.0
            },
            "expected_status": "CLEARED",
            "expected_flags": []
        },
        {
            "name": "Mass Unbalanced Fraud (Input 10,000kg, Output 10,250kg -> Delta 2.5% > 1.5%)",
            "params": {
                "dry_paddy_kg": 10000.0,
                "head_rice_kg": 6800.0,
                "broken_rice_kg": 300.0,
                "bran_kg": 900.0,
                "husk_kg": 2100.0,
                "loss_kg": 150.0
            },
            "expected_status": "FLAGGED",
            "expected_flag_substring": "MASS_UNBALANCED_ERROR"
        },
        {
            "name": "High Yield Fraud Suspect (Total rice yield 72.0% > 70.5% - mixing external rice)",
            "params": {
                "dry_paddy_kg": 10000.0,
                "head_rice_kg": 6900.0,
                "broken_rice_kg": 300.0, # Yield = 72.0%
                "bran_kg": 600.0,
                "husk_kg": 2100.0,
                "loss_kg": 100.0 # Total output = 10,000kg (delta 0%)
            },
            "expected_status": "FLAGGED",
            "expected_flag_substring": "HIGH_YIELD_FRAUD_SUSPECT"
        },
        {
            "name": "Low Yield Pilferage Suspect (Total rice yield 60.0% < 62.0% - material theft or bad grain)",
            "params": {
                "dry_paddy_kg": 10000.0,
                "head_rice_kg": 5700.0,
                "broken_rice_kg": 300.0, # Yield = 60.0%
                "bran_kg": 1200.0,
                "husk_kg": 2700.0,
                "loss_kg": 100.0 # Total output = 10,000kg
            },
            "expected_status": "FLAGGED",
            "expected_flag_substring": "LOW_YIELD_PILFERAGE_SUSPECT"
        },
        {
            "name": "Excessive Broken Rice (Broken rate 25.0% > 20.0% - over-drying or milling fault)",
            "params": {
                "dry_paddy_kg": 10000.0,
                "head_rice_kg": 5100.0,
                "broken_rice_kg": 1700.0, # Total rice = 6800kg (68.0%), Broken % = 1700/6800 = 25.0%
                "bran_kg": 800.0,
                "husk_kg": 2300.0,
                "loss_kg": 100.0 # Total output = 10,000kg
            },
            "expected_status": "FLAGGED",
            "expected_flag_substring": "EXCESSIVE_BROKEN_SPIKE"
        }
    ]
    
    execution_results = []
    for tc in test_cases:
        res = evaluate_rice_mass_balance(**tc["params"])
        status_pass = (res["status"] == tc["expected_status"])
        flag_pass = True
        if "expected_flag_substring" in tc:
            flag_pass = any(tc["expected_flag_substring"] in f for f in res["flags"])
        elif "expected_flags" in tc:
            flag_pass = (res["flags"] == tc["expected_flags"])
            
        print(f"\n  Test Case: {tc['name']}")
        print(f"    Verdict: {'PASS' if (status_pass and flag_pass) else 'FAIL'}")
        print(f"    Returned: Status={res['status']}, Delta={res['balance_delta_pct']}%, Yield={res['total_rice_yield_pct']}%, Broken={res['broken_rate_pct']}%")
        print(f"    Flags: {res['flags']}")
        execution_results.append({
            "test_case": tc["name"],
            "pass": status_pass and flag_pass,
            "res": res
        })
        assert status_pass and flag_pass, f"Test case failed: {tc['name']}"
        
    # Test calculate_proportional_ancestry
    print("\n  Testing Multi-Lot Proportional Ancestry Calculation...")
    input_lots = [
        {"lot_id": "LOT-HTX-01", "producer_name": "HTX My An Hung", "area_code": "MSVT-DT-001", "dry_weight_kg": 4000.0},
        {"lot_id": "LOT-HTX-02", "producer_name": "HTX Tan Kieu", "area_code": "MSVT-DT-002", "dry_weight_kg": 3500.0},
        {"lot_id": "LOT-HTX-03", "producer_name": "HTX Phu Tho", "area_code": "MSVT-DT-003", "dry_weight_kg": 2500.0},
    ]
    ancestry_res = calculate_proportional_ancestry(input_lots, "FINISHED-LOT-EXPORT-001", 6800.0)
    
    total_allocated = sum(a["allocated_finished_kg"] for a in ancestry_res["ancestry_allocations"])
    total_pct = sum(a["ancestry_weight_pct"] for a in ancestry_res["ancestry_allocations"])
    print(f"    Input total dry weight: 10,000 kg")
    print(f"    Finished lot qty: {ancestry_res['total_finished_kg']} kg")
    print(f"    Total allocated kg sum: {total_allocated:.2f} kg (Diff: {abs(total_allocated - 6800.0):.4f})")
    print(f"    Total ancestry % sum: {total_pct:.2f}%")
    for a in ancestry_res["ancestry_allocations"]:
        print(f"      - {a['producer_name']}: {a['input_dry_weight_kg']} kg ({a['ancestry_weight_pct']}%) -> {a['allocated_finished_kg']} kg finished")
        
    assert abs(total_allocated - 6800.0) < 0.05, "Ancestry allocation sum mismatch!"
    assert abs(total_pct - 100.0) < 0.01, "Ancestry percentage sum mismatch!"
    
    all_test_results["mass_balance"] = {
        "unit_tests_count": len(test_cases),
        "unit_tests_passed": sum(1 for r in execution_results if r["pass"]),
        "ancestry_test_passed": True,
        "execution_results": execution_results,
        "ancestry_sample": ancestry_res
    }
    print("\n--> Mass Balance & Anomaly Detection Algorithm Verified 100% Functionally Correct!")

# =============================================================================
# SUITE 4: ĐBSCL REAL-WORLD STATISTICS CONSERVATION CHECK
# =============================================================================
def test_dbscl_statistics():
    print("\n" + "=" * 80)
    print("SUITE 4: ĐBSCL REAL-WORLD STATISTICS PRESERVATION AUDIT")
    print("=" * 80)
    
    # Specific statutory metrics to check across the project documents:
    stat_requirements = [
        {
            "id": "STAT_DONG_THAP_PADDY_AREA",
            "desc": "Đồng Tháp 530.677 ha lúa (hoặc 530,677 / 530k ha)",
            "patterns": [r"530[.,]677\s*(?:h[ae]c-?ta|ha)", r"530[kK]\s*ha"],
            "primary_files": ["03_Rice_Playbook.md", "06_PMO_Master_Execution_Plan.md"],
            "allow_related_files": ["01_Mekong_Market_Intelligence_GTM_2026_2030.md", "00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_MANGO_GROWING_AREAS",
            "desc": "1.147 mã vùng trồng xoài / vùng trồng Đồng Tháp (và 2.758 MSVT)",
            "patterns": [r"1[.,]147\s*(?:vùng(?:\s*trồng)?|mã(?:\s*số)?\s*vùng\s*trồng|MSVT)", r"2[.,]758\s*MSVT"],
            "primary_files": ["04_Fruit_Playbook.md", "05_Kitchen_Playbook.md"],
            "allow_related_files": ["01_Mekong_Market_Intelligence_GTM_2026_2030.md", "00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_POISONING_CASES_H1_2026",
            "desc": "58 vụ ngộ độc thực phẩm H1/2026 (hoặc 58 vụ ngộ độc)",
            "patterns": [r"58\s*vụ", r"ngộ\s*độc"],
            "combination_mode": "BOTH_ON_LINE", # Must have both 58 vụ and ngộ độc on same line
            "primary_files": ["05_Kitchen_Playbook.md"],
            "allow_related_files": ["00_Executive_Brief.md", "09_Strategic_Gap_Analysis.md", "00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_1MHA_PROJECT_421K_HA",
            "desc": "421.000 ha Đề án 1Mha (1 triệu ha lúa chất lượng cao)",
            "patterns": [r"421[.,]000\s*ha"],
            "primary_files": ["03_Rice_Playbook.md"],
            "allow_related_files": ["00_Executive_Brief.md", "09_Strategic_Gap_Analysis.md", "00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_PMO_BUDGET_568M",
            "desc": "Ngân sách PMO 568 triệu VND (hoặc 568M)",
            "patterns": [r"568\s*(?:triệu|M|tr)"],
            "primary_files": ["06_PMO_Master_Execution_Plan.md"],
            "allow_related_files": ["00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_REVENUE_RECOVERY_200_300M",
            "desc": "Doanh thu thu hồi PMO 200–300 triệu VND",
            "patterns": [r"200\s*[–-]\s*300\s*(?:triệu|M)"],
            "primary_files": ["06_PMO_Master_Execution_Plan.md"],
            "allow_related_files": ["00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_CARBON_CREDIT_PRICE",
            "desc": "Tín chỉ carbon 20 USD/tấn CO2e (hoặc $20/tấn)",
            "patterns": [r"\$20", r"20\s*USD", r"20\s*\$/tấn"],
            "primary_files": ["03_Rice_Playbook.md"],
            "allow_related_files": ["00_MASTER_INDEX.md"]
        },
        {
            "id": "STAT_HEADCOUNT_6_FTE",
            "desc": "Đội ngũ PMO thực địa 6 nhân sự (6 FTEs / 6 headcount)",
            "patterns": [r"6\s*(?:headcount|nhân\s*sự|FTE|thành\s*viên)"],
            "primary_files": ["06_PMO_Master_Execution_Plan.md"],
            "allow_related_files": ["00_MASTER_INDEX.md"]
        }
    ]
    
    stat_audit_results = []
    
    for req in stat_requirements:
        print(f"\nChecking Metric: {req['id']} — {req['desc']}")
        files_to_check = req["primary_files"] + req.get("allow_related_files", [])
        found_in_target_files = {}
        
        for fname in files_to_check:
            fpath = os.path.join(DOCS_DIR, fname)
            if not os.path.exists(fpath):
                continue
            with open(fpath, "r", encoding="utf-8") as f:
                lines = f.readlines()
            matches_file = []
            
            for l_idx, line in enumerate(lines, 1):
                if req.get("combination_mode") == "BOTH_ON_LINE":
                    # Check that all patterns exist on the line
                    if all(re.search(p, line, re.IGNORECASE) for p in req["patterns"]):
                        matches_file.append((l_idx, line.strip()))
                else:
                    # Check any pattern
                    if any(re.search(p, line, re.IGNORECASE) for p in req["patterns"]):
                        matches_file.append((l_idx, line.strip()))
                        
            if matches_file:
                found_in_target_files[fname] = matches_file
                print(f"  In {fname}: {len(matches_file)} occurrences")
                for l_idx, match_line in matches_file[:2]: # Show first 2
                    print(f"    Line {l_idx}: {match_line[:110]}...")
                
        total_found = sum(len(m) for m in found_in_target_files.values())
        is_preserved = total_found > 0
        stat_audit_results.append({
            "metric": req["id"],
            "desc": req["desc"],
            "total_occurrences": total_found,
            "preserved": is_preserved,
            "occurrences": found_in_target_files
        })
        assert is_preserved, f"CRITICAL: Metric '{req['desc']}' was NOT found in specified files!"
        
    all_test_results["dbscl_statistics"] = {
        "metrics_checked": len(stat_requirements),
        "metrics_preserved": sum(1 for r in stat_audit_results if r["preserved"]),
        "audit_details": stat_audit_results
    }
    print("\n--> All ĐBSCL Baseline Statistics Strictly Preserved Across Target Documents!")

if __name__ == "__main__":
    print("=" * 80)
    print("STARTING GOTRACE EMPIRICAL CHALLENGER 2 VERIFICATION RUN")
    print("=" * 80)
    
    try:
        test_yaml_schemas()
        test_canonical_events_rice()
        test_risk_rules_fruit()
        test_risk_rules_kitchen()
        test_pmo_chapters_and_risks()
        test_rice_mass_balance()
        test_dbscl_statistics()
        
        print("\n" + "=" * 80)
        print("ALL EMPIRICAL TEST SUITES PASSED (100% SUCCESS)!")
        print("=" * 80)
        sys.exit(0)
    except AssertionError as ae:
        print(f"\n[ASSERTION FAILED]: {ae}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[UNEXPECTED ERROR]: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(2)
