#!/usr/bin/env python3
"""
GOTRACE Tay Nam Bo - Comprehensive Empirical Financial & Operational Stress Testing Engine
Performs rigorous sensitivity, runway, breakeven, churn, and gate solvency analysis.
"""

import numpy as np

def run_all_stress_tests():
    results = {}
    
    print("=" * 90)
    print("GOTRACE TÂY NAM BỘ - FINANCIAL & OPERATIONAL STRESS TEST ENGINE")
    print("=" * 90)
    
    # -------------------------------------------------------------------------
    # TEST 1: PHASE 1 BUDGET ADEQUACY (568M VND / 6 FTEs / 90 Days)
    # -------------------------------------------------------------------------
    print("\n[TEST 1] PHASE 1 BUDGET ADEQUACY & BURN RATE ANALYSIS")
    print("-" * 90)
    
    # Baseline from documents:
    base_budget = 568.0 # Million VND
    base_salaries_mo = 132.0 # Million VND
    base_ops_mo = [35.0, 30.0, 30.0] # M1, M2, M3 in Doc 07 (Total 95M)
    base_tech_mo = 8.0 # 24M total
    base_contingency = 53.0 # 9.4%
    
    # Breakdown of salaries:
    # PMO Lead: 30M, BD Lead: 25M, BD Support: 12M, Tech Lead: 30M, 2 Field Agents: 35M (17.5M each)
    # Total monthly gross = 132M VND.
    
    # Statutory Employer Contributions under Vietnamese Law:
    # BHXH (17.5%), BHYT (3%), BHTN (1%), Union (2%) = 23.5%
    employer_contrib_pct = 0.235
    thirteenth_month_pct = 1.0 / 12.0 # 8.33%
    
    # Cost scenarios:
    # S1: Documented (Nominal 132M, 95M ops, 24M tech, 53M cont) = 568M
    # S2: Compliant Personnel (132M gross + 23.5% employer contributions + 8.33% 13th month accrual) = 174.0M/mo
    compliant_personnel_mo = base_salaries_mo * (1 + employer_contrib_pct + thirteenth_month_pct)
    compliant_personnel_90d = compliant_personnel_mo * 3
    
    # Operational Reality Check:
    # 6 FTEs spanning Can Tho, Sa Dec/Cao Lanh, Long Xuyen, and HCMC
    # Office Rent: Can Tho Hub (10M) + Sa Dec Hub (6M) = 16M/mo (Doc 07 budgeted 12M/mo)
    # Office Security Deposit: 2 months rent = 32M (Doc 07 budgeted 0M!)
    # Mobility / Fuel / Transit:
    # 2 Field Agents: 80 km/day * 26 days = 2,080 km/mo * 500 VND/km + ferry = 2.5M * 2 = 5.0M/mo
    # PMO Lead & BD Lead: Inter-provincial car/bus/Grab/HCMC meetings = 5.0M * 2 = 10.0M/mo
    # Tech Lead & BD Support: Local transit = 2.0M/mo
    # Total mobility: 17.0M/mo (Doc 07 budgeted 13.0M/mo)
    
    # Travel Allowance Calculation check:
    budgeted_travel_monthly = 39.0 / 3.0 # 13.0M VND
    working_days = 26
    travel_per_fte_day = (budgeted_travel_monthly * 1_000_000) / (6 * working_days)
    
    # Accommodation:
    # Doc 05 budgeted 5.0M/mo. 5.0M / 350k hotel = 14.3 nights total for entire 6-person team!
    # Realistic: 4 field travelers * 6 nights/mo = 24 nights * 350k = 8.4M/mo.
    
    # Client Entertaining & HTX relations:
    # Doc 05 budgeted 5.0M/mo. 15 C-level meetings + 10 HTX. 15 * 400k + 10 * 300k = 9.0M/mo.
    
    # IT Equipment / Workstations:
    # Doc 07 budgeted 20M for 2 field agent tablets & printers.
    # What about laptops for PMO Lead, BD Lead, Tech Lead, BD Support?
    # Even a BYOD equipment allowance of 1.5M/mo * 4 people = 6.0M/mo * 3 = 18.0M VND.
    
    real_ops_monthly_ongoing = 16.0 + 17.0 + 8.4 + 9.0 + 6.0 # = 56.4M/mo
    real_ops_upfront = 32.0 + 20.0 # Deposit + field hardware = 52.0M
    real_ops_90d = (real_ops_monthly_ongoing * 3) + real_ops_upfront # 169.2 + 52 = 221.2M
    
    real_total_spend_compliant = compliant_personnel_90d + real_ops_90d + 24.0
    real_total_spend_capped_salaries = (base_salaries_mo * 3) + real_ops_90d + 24.0
    
    print(f"1. Documented Phase 1 Budget: {base_budget:.1f}M VND (~$23,000 USD)")
    print(f"   - Budgeted Travel per FTE per working day: {travel_per_fte_day:,.0f} VND/day (~${travel_per_fte_day/25000:.2f} USD)")
    print(f"   - Budgeted Accommodation per month: 5.0M VND (~14 nights across 6 people)")
    print(f"   - Unbudgeted Office Lease Deposit (2 hubs): 32.0M VND")
    print(f"   - Unbudgeted Workstation/BYOD Subsidy (4 leads): 18.0M VND")
    print(f"2. Realistic Spend (Strict Capped Salaries @ 132M/mo): {real_total_spend_capped_salaries:.1f}M VND")
    print(f"   -> Cash Shortfall: {real_total_spend_capped_salaries - base_budget:.1f}M VND (Underfunded by {(real_total_spend_capped_salaries - base_budget)/base_budget*100:.1f}%)")
    print(f"3. Realistic Spend (Full Statutory On-Costs @ 174M/mo): {real_total_spend_compliant:.1f}M VND")
    print(f"   -> Cash Shortfall: {real_total_spend_compliant - base_budget:.1f}M VND (Underfunded by {(real_total_spend_compliant - base_budget)/base_budget*100:.1f}%)")
    
    # -------------------------------------------------------------------------
    # TEST 2: BREAKEVEN SENSITIVITY & TIMELINE MODELING
    # -------------------------------------------------------------------------
    print("\n[TEST 2] BREAKEVEN SENSITIVITY & THE 182M vs 380M CONTRADICTION")
    print("-" * 90)
    
    # Document Contradiction:
    # Doc 05 (PMO Org), Line 230:
    # "Ngân sách Vận hành Giai đoạn 2: ~380 triệu VND/tháng (~4,6 tỷ VND/năm). Đến tháng thứ 8–9, doanh thu thuê bao SaaS từ 8–10 Anchors và phí tích hợp sẽ hoàn toàn bù đắp chi phí này..."
    # Doc 06 (Revenue Risk), Lines 403-418:
    # "Đồ thị giao thoa điểm hòa vốn vận hành: Chi phí đốt PMO ~182M/tháng. Tổng dòng thu tháng 9: 195M > 182M. Hòa vốn tháng 8-9."
    
    print("CRITICAL LOGICAL BUG:")
    print("Doc 05 plans 14 FTEs in Phase 2 with OPEX = 380M/mo.")
    print("Doc 06 calculates Month 9 Breakeven using Phase 1 OPEX = 182M/mo against 195M revenue.")
    print(f"At Month 9, if 14 FTEs are hired: Revenue (195M) - OPEX (380M) = DEFICIT of -185M/mo!")
    print("To break even at 380M OPEX, GOTRACE needs 10-12 Anchors + 3 Diagnostics/mo, which is double the documented Month 9 traction!")
    
    # Sensitivity Simulation: Sales cycle delay from 30 days to 60 days
    # Let's model 4 detailed scenarios over 18 months:
    # Case A: Documented Base (30d cycle, 182M burn frozen)
    # Case B: Scaled Base (30d cycle, 380M scaled at Month 7)
    # Case C: 60-Day Delay Scaled (60d cycle, 380M scaled at Month 7)
    # Case D: 60-Day Delay Prudent (60d cycle, Hiring Frozen at 8 FTEs / 220M OPEX)
    
    def simulate_pnl(sales_delay_months, scale_month, p2_opex, diag_to_anchor_conv):
        cash = 568.0
        min_cash = cash
        be_month = None
        flows = []
        anchors = 0
        
        for m in range(1, 19):
            opex = 182.0 if m < scale_month else p2_opex
            
            # Diagnostic generation
            diag_closed = 0
            if m > sales_delay_months:
                diag_closed = 1 if m <= sales_delay_months + 2 else 2
                
            rev_diag = diag_closed * 40.0
            
            # Anchors converted: 3 months after diagnostic
            if m > sales_delay_months + 3:
                new_anchors = int(round(diag_closed * diag_to_anchor_conv))
                anchors += new_anchors
                rev_integ = new_anchors * 35.0
            else:
                rev_integ = 0.0
                
            rev_saas = anchors * 20.0
            total_rev = rev_saas + rev_diag + rev_integ
            net = total_rev - opex
            cash += net
            if cash < min_cash:
                min_cash = cash
            if net >= 0 and be_month is None and m >= 3:
                be_month = m
                
            flows.append((m, opex, total_rev, net, cash, anchors))
        return be_month, min_cash, flows

    be_A, min_A, flows_A = simulate_pnl(sales_delay_months=1, scale_month=19, p2_opex=182.0, diag_to_anchor_conv=0.5)
    be_B, min_B, flows_B = simulate_pnl(sales_delay_months=1, scale_month=7, p2_opex=380.0, diag_to_anchor_conv=0.5)
    be_C, min_C, flows_C = simulate_pnl(sales_delay_months=2, scale_month=7, p2_opex=380.0, diag_to_anchor_conv=0.4)
    be_D, min_D, flows_D = simulate_pnl(sales_delay_months=2, scale_month=10, p2_opex=220.0, diag_to_anchor_conv=0.4)
    
    print("\nMONTHLY FINANCIAL SENSITIVITY MATRIX (18-MONTH HORIZON):")
    print(f"{'Scenario':<38} | {'Breakeven':<12} | {'Min Cash Balance':<18} | {'Capital Hole':<16}")
    print("-" * 90)
    print(f"{'Case A: Doc 06 Ideal (182M burn frozen)':<38} | {f'Month {be_A}':<12} | {min_A:>14.1f}M VND | {max(0, -min_A):>12.1f}M VND")
    print(f"{'Case B: Scale to 14 FTEs (380M burn @ M7)':<38} | {f'Month {be_B}' if be_B else 'Never in 18m':<12} | {min_B:>14.1f}M VND | {max(0, -min_A if min_B>0 else -min_B):>12.1f}M VND")
    print(f"{'Case C: 60d Delay + Scale to 14 FTEs':<38} | {f'Month {be_C}' if be_C else 'Never in 18m':<12} | {min_C:>14.1f}M VND | {max(0, -min_C):>12.1f}M VND")
    print(f"{'Case D: 60d Delay + Prudent Freeze (220M)':<38} | {f'Month {be_D}' if be_D else 'Beyond 18m':<12} | {min_D:>14.1f}M VND | {max(0, -min_D):>12.1f}M VND")

    # -------------------------------------------------------------------------
    # TEST 3: REVENUE LAYER DURABILITY & CHURN ANALYSIS
    # -------------------------------------------------------------------------
    print("\n[TEST 3] REVENUE LAYER DURABILITY & CHURN DYNAMICS")
    print("-" * 90)
    
    # Doc 06 assumes:
    # Anchor Retention: 90% (10% churn)
    # CAC: 55M VND
    # ACV SaaS: 240M VND
    # Gross Margin: 85%
    # Documented LTV: 816M VND (4.0 years) -> Formula mismatch!
    
    print("1. Mathematical Inconsistency in Doc 06 Unit Economics:")
    print("   - Doc 06 claims: Retention > 90% (Churn = 10%), LTV = 816M VND, Lifetime = 4.0 years.")
    print("   - TRUE LTV Formula: LTV = (ACV * Margin) / Churn.")
    print("   - At 10% Churn: LTV = (240M * 0.85) / 0.10 = 2,040M VND (Lifetime = 10.0 years).")
    print("   - At 4.0 Years Lifetime: Implied Churn is 1 / 4.0 = 25.0%!")
    print("   -> Doc 06 confuses 4-year cumulative contract cap with true LTV, or implicitly assumes 25% churn while claiming 90% retention!")
    
    print("\n2. Churn Stress Table on Anchor Economics:")
    print(f"{'Annual Churn':<14} | {'Annual Retention':<16} | {'Customer Lifetime':<18} | {'Corrected LTV':<14} | {'LTV / CAC':<10}")
    print("-" * 80)
    for ch in [0.10, 0.20, 0.25, 0.35, 0.45]:
        ltv_corr = (240.0 * 0.85) / ch
        ratio = ltv_corr / 55.0
        print(f"{ch*100:>10.0f}%    | {(1-ch)*100:>12.0f}%    | {1.0/ch:>14.1f} yrs   | {ltv_corr:>10.1f}M VND | {ratio:>8.1f}x")
        
    print("\n3. Revenue Stack Fragility Assessment:")
    print("   - Layer 1 (SaaS): High risk of off-season churn (May-Oct post Dong-Xuan harvest). Exporters operate on 2-3% trading margins.")
    print("   - Layer 2 (Diagnostic Entry Wedge): High risk of 'One-and-Done' project drop-off. Once 12 deliverables are delivered, SME millers may use in-house Excel instead of committing to 240M/yr SaaS.")
    print("   - Layer 4 (Network GCI Fees): 2.5 Billion VND projected in Year 3 (50-100 VND/bag or 2,000 VND/ton). Exporters will strongly push back against per-ton tolling on top of SaaS subscriptions.")
    print("   - Layer 5 (Visual Proof Media): 290M VND in Year 1 is 13.5% of total revenue. Net profit in Year 1 is +100M VND. If this single non-software media deal fails, Year 1 flips to -190M VND LOSS.")

    # -------------------------------------------------------------------------
    # TEST 4: DOWNSIDE PROTECTION & STAGE-GATE SOLVENCY
    # -------------------------------------------------------------------------
    print("\n[TEST 4] STAGE-GATE DOWNSIDE PROTECTION & CAPITAL RECOVERY")
    print("-" * 90)
    
    # Gate 1: Day 30
    # Doc 06 line 589: Loss < 150M. Doc 07 line 217: Cost ~170M, refund ~400M.
    # Month 1 Budget: 193M (Doc 07) / 204M (Doc 05).
    # Month 1 Real Commitments:
    # Personnel: 132M (non-refundable)
    # Travel/Ops: 35M (spent)
    # Cloud/Tech: 8M (spent)
    # Office lease 2-month deposit: 32M (forfeited on early termination)
    # Initial hardware: 20M (tablets/printers, salvage value 50% = 10M loss)
    # Contingency buffer: not spent
    sunk_d30 = 132.0 + 35.0 + 8.0 + 32.0 + 10.0 # = 217.0M VND
    recoverable_d30 = base_budget - sunk_d30 # 568 - 217 = 351.0M VND
    
    print("1. Gate Day 30 (Market Validation Gate):")
    print(f"   - Claimed Loss Ceiling: < 150.0M VND (Doc 06) / ~170.0M VND (Doc 07)")
    print(f"   - Actual Sunk Cost: {sunk_d30:.1f}M VND")
    print(f"   - Actual Recoverable Capital: {recoverable_d30:.1f}M VND (vs claimed '~400M')")
    print(f"   -> Understatement of Day 30 Exit Loss: {sunk_d30 - 150.0:.1f}M VND ({((sunk_d30 - 150.0)/150.0)*100:.1f}% higher than claimed)")
    
    # Gate 2: Day 60
    # Month 2 additional spend: 188M (salaries 132M, travel 30M, cloud 8M, contingency 18M)
    # Severance / Labor Code compliance: If 6 FTEs terminated at Day 60 without prior notice.
    # Under Vietnam Labor Code 2019, 60-day probation for university degrees requires evaluation before day 60.
    sunk_d60 = sunk_d30 + 170.0 # M2 without lease deposit = 387.0M VND
    recoverable_d60 = base_budget - sunk_d60 # = 181.0M VND
    print("\n2. Gate Day 60 (Operational Integrity Gate):")
    print(f"   - Actual Sunk Cost: {sunk_d60:.1f}M VND")
    print(f"   - Actual Recoverable Capital: {recoverable_d60:.1f}M VND (close to Doc 07 claimed 187M)")
    
    # Gate 3: Day 90
    # Day 90: Gross spend = 568M.
    # Revenue offset assumption: Doc 05 line 213 claims Net Burn = 348M because 220M revenue is collected.
    # Doc 07 claims 200M-350M revenue collected.
    # WHAT IF ZERO CASH IS COLLECTED IN 90 DAYS?
    # Diagnostic accounts payable in Vietnam enterprise is Net 30/60.
    # If cash collection is delayed:
    print("\n3. Gate Day 90 (Commercial Conversion Gate & Working Capital Gap):")
    print(f"   - If Revenue Collection = 0M in 90 Days: Gross capital spent = 568.0M VND.")
    print(f"   - Residual Bank Balance at Day 90: 0.0M VND.")
    print(f"   - If BOD only disbursed Net 348M (counting on revenue offset): PROJECT FACES ILLIQUIDITY BY DAY 55!")
    print("   -> CRITICAL RECOMMENDATION: BOD MUST disburse the full 568M upfront as gross capital. Any diagnostic revenue collected must be treated as working capital buffer, NOT deducted from Phase 1 commitment.")

    print("\n" + "=" * 90)
    print("STRESS TEST COMPLETE: 5 CRITICAL FLAWS IDENTIFIED.")
    print("=" * 90)

if __name__ == '__main__':
    run_all_stress_tests()
