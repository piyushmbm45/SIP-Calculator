/**
 * SIP Calculator Utilities
 */

export const formatCurrency = (value) => {
    if (!value || isNaN(value)) return '₹0';
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(2)} K`;
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
  };
  
  export const formatNumber = (value) => {
    if (!value) return '';
    return Number(value).toLocaleString('en-IN');
  };
  
  /**
   * Basic SIP Calculator
   * FV = P * [((1 + r)^n - 1) / r] * (1 + r)
   */
  export const calculateSIP = ({
    monthlyInvestment,
    annualReturn,
    years,
    expenseRatio = 0,
    initialInvestment = 0,
    topUpPercent = 0,
    inflationRate = 0,
    compoundFrequency = 'monthly',
  }) => {
    const P = parseFloat(monthlyInvestment) || 0;
    const r_annual = (parseFloat(annualReturn) || 0) / 100;
    const expense = (parseFloat(expenseRatio) || 0) / 100;
    const n_years = parseFloat(years) || 0;
    const lumpsum = parseFloat(initialInvestment) || 0;
    const topUp = (parseFloat(topUpPercent) || 0) / 100;
    const inflation = (parseFloat(inflationRate) || 0) / 100;
  
    if (P <= 0 || r_annual <= 0 || n_years <= 0) {
      return null;
    }
  
    const r_net = r_annual - expense;
    const n_months = n_years * 12;
  
    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthly = P;
  
    // Calculate with top-up using yearly loop
    if (topUp > 0) {
      let fv = lumpsum * Math.pow(1 + r_net / 12, n_months);
      totalInvested = lumpsum;
  
      for (let year = 0; year < n_years; year++) {
        const r_monthly = r_net / 12;
        const months = 12;
        // FV of this year's SIP at end of total period
        const remainingMonths = (n_years - year) * 12;
        const fv_year = currentMonthly * ((Math.pow(1 + r_monthly, remainingMonths) - 1) / r_monthly) * (1 + r_monthly);
        fv += fv_year;
        totalInvested += currentMonthly * months;
        currentMonthly = currentMonthly * (1 + topUp);
      }
      futureValue = fv;
    } else {
      // Simple SIP formula
      const r_monthly = r_net / 12;
      futureValue = P * ((Math.pow(1 + r_monthly, n_months) - 1) / r_monthly) * (1 + r_monthly);
      futureValue += lumpsum * Math.pow(1 + r_net / 12, n_months);
      totalInvested = P * n_months + lumpsum;
    }
  
    // Inflation-adjusted value
    const inflationAdjusted = inflation > 0
      ? futureValue / Math.pow(1 + inflation, n_years)
      : futureValue;
  
    const wealthGained = futureValue - totalInvested;
    const absoluteReturns = totalInvested > 0 ? ((futureValue - totalInvested) / totalInvested) * 100 : 0;
  
    // XIRR approximation using CAGR
    const cagr = totalInvested > 0
      ? (Math.pow(futureValue / totalInvested, 1 / n_years) - 1) * 100
      : 0;
  
    return {
      futureValue,
      totalInvested,
      wealthGained,
      absoluteReturns,
      inflationAdjusted,
      cagr,
      monthlyBreakdown: generateBreakdown(P, r_net, n_years, lumpsum, topUp),
    };
  };
  
  const generateBreakdown = (P, r_net, n_years, lumpsum, topUp) => {
    const breakdown = [];
    const r_monthly = r_net / 12;
    let portfolioValue = lumpsum;
    let totalInvested = lumpsum;
    let currentMonthly = P;
  
    for (let year = 1; year <= Math.min(n_years, 30); year++) {
      for (let m = 0; m < 12; m++) {
        portfolioValue = (portfolioValue + currentMonthly) * (1 + r_monthly);
        totalInvested += currentMonthly;
      }
      breakdown.push({
        year,
        value: portfolioValue,
        invested: totalInvested,
        gains: portfolioValue - totalInvested,
      });
      currentMonthly = currentMonthly * (1 + topUp);
    }
    return breakdown;
  };
  
  /**
   * Lumpsum Calculator
   */
  export const calculateLumpsum = ({ principal, annualReturn, years, expenseRatio = 0 }) => {
    const P = parseFloat(principal) || 0;
    const r = ((parseFloat(annualReturn) || 0) - (parseFloat(expenseRatio) || 0)) / 100;
    const n = parseFloat(years) || 0;
  
    if (P <= 0 || r <= 0 || n <= 0) return null;
  
    const futureValue = P * Math.pow(1 + r, n);
    const wealthGained = futureValue - P;
    const absoluteReturns = ((futureValue - P) / P) * 100;
  
    return { futureValue, totalInvested: P, wealthGained, absoluteReturns };
  };