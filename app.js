// Initial Farm State & Default Sample Data for Cow Milk & Goat Milk (Dual Milk Purchases Supported)
const DEFAULT_RATES = {
  cattle: { rate175: 15.00, rate475: 35.00, rate500: 38.00, rate750: 50.00, rate1000: 65.00 },
  goat: { rate175: 25.00, rate475: 60.00, rate500: 65.00, rate750: 90.00, rate1000: 120.00 }
};

const SAMPLE_CUSTOMERS = [
  { 
    id: 'CUST-101', name: 'Dharshan', type: 'Daily Customer', milkType: 'Both (Cow & Goat)', phone: '0764805061', address: 'Route 1 - Green Valley',
    regCattle175: 0, regCattle475: 1, regCattle500: 0, regCattle750: 2, regCattle1000: 1,
    regGoat175: 1, regGoat475: 0, regGoat500: 1, regGoat750: 0, regGoat1000: 0, status: 'Active'
  },
  { 
    id: 'CUST-102', name: 'Hotel Royal Milk Account', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: '9845012345', address: 'Main Street Market #45',
    regCattle175: 10, regCattle475: 10, regCattle500: 5, regCattle750: 20, regCattle1000: 15,
    regGoat175: 0, regGoat475: 0, regGoat500: 0, regGoat750: 0, regGoat1000: 0, status: 'Active'
  },
  { 
    id: 'CUST-103', name: 'Sita Lakshmi', type: 'Daily Customer', milkType: 'Goat Milk Only', phone: '9988776655', address: 'Route 2 - Lakeview Homes',
    regCattle175: 0, regCattle475: 0, regCattle500: 0, regCattle750: 0, regCattle1000: 0,
    regGoat175: 2, regGoat475: 1, regGoat500: 0, regGoat750: 1, regGoat1000: 0, status: 'Active'
  },
  { 
    id: 'CUST-104', name: 'Green Park Canteen', type: 'Weekly Customer', milkType: 'Both (Cow & Goat)', phone: '0712345678', address: 'Route 3 - Park Avenue',
    regCattle175: 5, regCattle475: 10, regCattle500: 5, regCattle750: 10, regCattle1000: 5,
    regGoat175: 2, regGoat475: 2, regGoat500: 2, regGoat750: 2, regGoat1000: 2, status: 'Active'
  }
];

const SAMPLE_EXPENSES = [
  { id: 'EXP-101', date: '2026-09-01', category: 'Silage', name: 'Green Fodder Supplier', amount: 1200.00, remarks: 'Silage tractor load' },
  { id: 'EXP-102', date: '2026-09-01', category: 'Grass Cutter Wage', name: 'Murugan (Worker)', amount: 600.00, remarks: 'Daily grass cutting wage' },
  { id: 'EXP-103', date: '2026-09-01', category: 'Feed / Punnaku', name: 'Lakshmi Feed Store', amount: 450.00, remarks: '50kg Oil cake bag' },
  { id: 'EXP-104', date: '2026-09-01', category: 'Other Expense', name: 'Veterinary Doctor', amount: 100.00, remarks: 'Cattle health checkup' },
  { id: 'EXP-105', date: '2026-09-02', category: 'Grass Cutter Wage', name: 'Murugan (Worker)', amount: 600.00, remarks: 'Daily wage' }
];

const SAMPLE_RECORDS = [
  { 
    id: 'rec-2026-09-07', date: '2026-09-07', custType: 'Daily Customer', custName: 'Dharshan & Spot Sales', paymentStatus: 'Paid', amountPaid: 5790.00,
    cattle_q175: 10, cattle_q475: 20, cattle_q500: 15, cattle_q750: 44, cattle_q1000: 34,
    goat_q175: 4, goat_q475: 6, goat_q500: 5, goat_q750: 10, goat_q1000: 2,
    silage: 0, wage: 600, feed: 460, other: 0, remarks: 'Today total farm record (Cow & Goat Milk)' 
  },
  { 
    id: 'rec-2026-09-06', date: '2026-09-06', custType: 'Weekly Customer', custName: 'Green Park Canteen & Sita Lakshmi', paymentStatus: 'Partial', amountPaid: 1500.00,
    cattle_q175: 12, cattle_q475: 15, cattle_q500: 10, cattle_q750: 20, cattle_q1000: 10,
    goat_q175: 12, goat_q475: 10, goat_q500: 8, goat_q750: 15, goat_q1000: 5,
    silage: 0, wage: 600, feed: 450, other: 0, remarks: 'Partial cash payment received (Rs. 1500 paid, balance pending)' 
  },
  { 
    id: 'rec-2026-09-05', date: '2026-09-05', custType: 'Time-Being', custName: 'Event & Walk-ins', paymentStatus: 'Paid', amountPaid: 3500.00,
    cattle_q175: 5, cattle_q475: 32, cattle_q500: 10, cattle_q750: 42, cattle_q1000: 30,
    goat_q175: 0, goat_q475: 0, goat_q500: 0, goat_q750: 0, goat_q1000: 0,
    silage: 0, wage: 650, feed: 480, other: 120, remarks: 'Cutter overtime wage' 
  }
];

const USER_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: 'Dharshan (Admin)', role: 'Admin', icon: '👑', color: '#10b981', allowedTabs: ['dashboard', 'customers', 'expenses', 'daily-entry', 'records', 'settings'] },
  { username: 'sales', password: 'sales123', name: 'Sales Representative', role: 'Sales', icon: '💼', color: '#f59e0b', allowedTabs: ['dashboard', 'customers', 'daily-entry', 'records'] },
  { username: 'operator', password: 'op123', name: 'Farm Operator', role: 'Operator', icon: '🚜', color: '#6366f1', allowedTabs: ['daily-entry', 'expenses'] }
];

let appState = {
  currentUser: JSON.parse(localStorage.getItem('farm_user')) || null,
  rates: JSON.parse(localStorage.getItem('farm_rates')) || DEFAULT_RATES,
  customers: JSON.parse(localStorage.getItem('farm_customers')) || SAMPLE_CUSTOMERS,
  records: JSON.parse(localStorage.getItem('farm_records')) || SAMPLE_RECORDS,
  expenses: JSON.parse(localStorage.getItem('farm_expenses')) || SAMPLE_EXPENSES
};

let chartFinancials = null;
let chartCustomerBreakdown = null;
let currentFilter = 'ALL';
let currentViewingRecordId = null;

// Helper: Format Currency in Rs.
function formatCurrency(val) {
  return 'Rs. ' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Helper: Format Litres
function formatLitres(val) {
  return Number(val || 0).toFixed(2) + ' L';
}

// Helper: Get Customer Badge HTML
function getCustBadge(type) {
  if (type === 'Daily Customer') return `<span class="badge-cust badge-daily"><i class="fa-solid fa-calendar-day"></i> Daily</span>`;
  if (type === 'Weekly Customer') return `<span class="badge-cust badge-weekly"><i class="fa-solid fa-calendar-week"></i> Weekly</span>`;
  if (type === 'Monthly Customer') return `<span class="badge-cust badge-monthly"><i class="fa-solid fa-calendar-check"></i> Monthly</span>`;
  return `<span class="badge-cust badge-timebeing"><i class="fa-solid fa-clock"></i> Time-Being</span>`;
}

function getMilkBadge(milkType) {
  if (milkType === 'Goat Milk Only') return `<span class="badge-cust badge-monthly" style="background-color: rgba(99, 102, 241, 0.15); color: #818cf8; border-color: rgba(99, 102, 241, 0.3);"><i class="fa-solid fa-leaf"></i> Goat Milk Only</span>`;
  if (milkType === 'Cow Milk Only' || milkType === 'Cattle Milk Only') return `<span class="badge-cust badge-daily" style="background-color: rgba(20, 184, 166, 0.15); color: #14b8a6; border-color: rgba(20, 184, 166, 0.3);"><i class="fa-solid fa-cow"></i> Cow Milk Only</span>`;
  return `<span class="badge-cust badge-weekly" style="background-color: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-layer-group"></i> Both (Cow & Goat)</span>`;
}

function normalizeStr(str) {
  return (str || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

// Validate Phone Number
function validatePhoneNumber(phoneStr) {
  const raw = (phoneStr || '').toString().trim();
  if (!raw || raw.toUpperCase() === 'N/A') {
    return { valid: true, cleaned: 'N/A', error: null };
  }

  const digits = raw.replace(/\D/g, '');

  if (digits.length === 0) {
    return { valid: false, cleaned: raw, error: 'Phone number cannot contain only special characters.' };
  }

  let coreDigits = digits;
  if (coreDigits.length === 12 && coreDigits.startsWith('91')) {
    coreDigits = coreDigits.substring(2);
  } else if (coreDigits.length === 11 && coreDigits.startsWith('0')) {
    coreDigits = coreDigits.substring(1);
  }

  if (coreDigits.length === 10 && /^[6-9]\d{9}$/.test(coreDigits)) {
    return { valid: true, cleaned: coreDigits, error: null };
  }

  if (coreDigits.length === 10) {
    return { valid: true, cleaned: coreDigits, error: null };
  }

  if (digits.length >= 10 && digits.length <= 13) {
    return { valid: true, cleaned: digits, error: null };
  }

  return { 
    valid: false, 
    cleaned: raw, 
    error: `Invalid phone length (${digits.length} digits). Please enter a valid 10-digit mobile number.` 
  };
}

// Touch Stepper Controls for Mobile Bottle Inputs
function initTouchSteppers() {
  const bottleInputIds = [
    'cattle_q175', 'cattle_q475', 'cattle_q500', 'cattle_q750', 'cattle_q1000',
    'goat_q175', 'goat_q475', 'goat_q500', 'goat_q750', 'goat_q1000',
    'regCattle175', 'regCattle475', 'regCattle500', 'regCattle750', 'regCattle1000',
    'regGoat175', 'regGoat475', 'regGoat500', 'regGoat750', 'regGoat1000'
  ];

  bottleInputIds.forEach(id => {
    const inp = document.getElementById(id);
    if (inp && !inp.dataset.stepperInit) {
      inp.dataset.stepperInit = "true";
      inp.setAttribute('inputmode', 'numeric');
      inp.setAttribute('pattern', '[0-9]*');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'stepper-input';
      
      const btnMinus = document.createElement('button');
      btnMinus.type = 'button';
      btnMinus.className = 'btn-stepper btn-minus';
      btnMinus.innerHTML = '<i class="fa-solid fa-minus"></i>';
      btnMinus.setAttribute('aria-label', 'Decrease quantity');
      btnMinus.addEventListener('click', (e) => {
        e.preventDefault();
        let val = parseInt(inp.value, 10) || 0;
        if (val > 0) {
          inp.value = val - 1;
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });

      const btnPlus = document.createElement('button');
      btnPlus.type = 'button';
      btnPlus.className = 'btn-stepper btn-plus';
      btnPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';
      btnPlus.setAttribute('aria-label', 'Increase quantity');
      btnPlus.addEventListener('click', (e) => {
        e.preventDefault();
        let val = parseInt(inp.value, 10) || 0;
        inp.value = val + 1;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
      });

      inp.parentNode.insertBefore(wrapper, inp);
      wrapper.appendChild(btnMinus);
      wrapper.appendChild(inp);
      wrapper.appendChild(btnPlus);
    }
  });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initNavigation();
  initTouchSteppers();
  initFormListeners();
  initCustomerRegistrationForm();
  initStandaloneExpenseForm();
  initSettingsForm();
  updateRatePreviews();
  renderApp();

  const today = new Date().toISOString().split('T')[0];
  if (document.getElementById('entryDate')) {
    document.getElementById('entryDate').value = today;
    checkAndLoadDateRecord(today);
  }
});

// Authentication & Role Management Engine
function initAuth() {
  const loginForm = document.getElementById('loginForm');
  const loginNotice = document.getElementById('loginErrorNotice');
  const btnLogout = document.getElementById('btnLogout');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('loginUsername').value.trim();
      const p = document.getElementById('loginPassword').value.trim();

      const account = USER_ACCOUNTS.find(a => a.username.toLowerCase() === u.toLowerCase() && a.password === p);
      if (account) {
        if (loginNotice) loginNotice.style.display = 'none';
        loginUser(account);
      } else {
        if (loginNotice) {
          loginNotice.style.display = 'block';
          loginNotice.textContent = '❌ Invalid Username or Password. Try admin/admin123, sales/sales123, or operator/op123.';
        }
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      logoutUser();
    });
  }

  if (appState.currentUser) {
    updateUserSessionUI(appState.currentUser);
    applyRolePermissions(appState.currentUser);
  } else {
    showLoginModal();
  }
}

function quickLogin(roleKey) {
  const account = USER_ACCOUNTS.find(a => a.role.toLowerCase() === roleKey.toLowerCase());
  if (account) {
    loginUser(account);
  }
}

function loginUser(userObj) {
  appState.currentUser = userObj;
  localStorage.setItem('farm_user', JSON.stringify(userObj));
  hideLoginModal();
  updateUserSessionUI(userObj);
  applyRolePermissions(userObj);

  const defaultTab = userObj.allowedTabs[0] || 'daily-entry';
  const tabBtn = document.querySelector(`.nav-item[data-tab="${defaultTab}"]`) || document.querySelector(`.mobile-nav-item[data-tab="${defaultTab}"]`);
  if (tabBtn) tabBtn.click();
}

function logoutUser() {
  appState.currentUser = null;
  localStorage.removeItem('farm_user');

  const nameLabel = document.getElementById('userNameLabel');
  const roleLabel = document.getElementById('userRoleLabel');
  const sbName = document.getElementById('sidebarUserName');
  const sbRole = document.getElementById('sidebarUserRole');

  if (nameLabel) nameLabel.textContent = 'Guest User';
  if (roleLabel) {
    roleLabel.textContent = 'Unauthenticated';
    roleLabel.style.color = 'var(--text-muted)';
  }
  if (sbName) sbName.textContent = 'Guest User';
  if (sbRole) {
    sbRole.textContent = 'Unauthenticated';
    sbRole.style.color = 'var(--text-muted)';
  }

  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');
  const loginNotice = document.getElementById('loginErrorNotice');
  if (loginUsername) loginUsername.value = '';
  if (loginPassword) loginPassword.value = '';
  if (loginNotice) loginNotice.style.display = 'none';

  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  showLoginModal();
}

function showLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function hideLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function updateUserSessionUI(userObj) {
  if (!userObj) return;

  const nameLabel = document.getElementById('userNameLabel');
  const roleLabel = document.getElementById('userRoleLabel');
  const sbName = document.getElementById('sidebarUserName');
  const sbRole = document.getElementById('sidebarUserRole');

  if (nameLabel) nameLabel.textContent = `${userObj.icon} ${userObj.name}`;
  if (roleLabel) {
    roleLabel.textContent = userObj.role;
    roleLabel.style.color = userObj.color;
  }
  if (sbName) sbName.textContent = `${userObj.icon} ${userObj.name}`;
  if (sbRole) {
    sbRole.textContent = userObj.role;
    sbRole.style.color = userObj.color;
  }
}

window.logoutUser = logoutUser;
window.quickLogin = quickLogin;

function applyRolePermissions(userObj) {
  if (!userObj) return;

  const allowed = userObj.allowedTabs || ['daily-entry'];

  document.querySelectorAll('.nav-item').forEach(item => {
    const tab = item.getAttribute('data-tab');
    if (allowed.includes(tab)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const tab = item.getAttribute('data-tab');
    if (allowed.includes(tab)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  const isDeleteAllowed = (userObj.role === 'Admin');
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.style.display = isDeleteAllowed ? 'inline-flex' : 'none';
  });

  const isExportAllowed = (userObj.role === 'Admin' || userObj.role === 'Sales');
  const btnExport = document.getElementById('btnExportExcel');
  if (btnExport) btnExport.style.display = isExportAllowed ? 'block' : 'none';
}

// Navigation Logic
function initNavigation() {
  const desktopNavItems = document.querySelectorAll('.nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('pageTitle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  const titles = {
    'dashboard': 'Happy Family Farms - Overview & Summary',
    'customers': 'Happy Family Farms - Customer Master',
    'expenses': 'Happy Family Farms - Standalone Expense Logs',
    'daily-entry': 'Happy Family Farms - Daily Record Entry',
    'records': 'Happy Family Farms - Transaction Logs',
    'settings': 'Happy Family Farms - Rates & Pricing'
  };

  function switchTab(targetTab) {
    desktopNavItems.forEach(nav => {
      if (nav.getAttribute('data-tab') === targetTab) nav.classList.add('active');
      else nav.classList.remove('active');
    });

    mobileNavItems.forEach(mnav => {
      if (mnav.getAttribute('data-tab') === targetTab) mnav.classList.add('active');
      else mnav.classList.remove('active');
    });

    tabContents.forEach(tab => tab.classList.remove('active'));

    const targetElem = document.getElementById(`tab-${targetTab}`);
    if (targetElem) targetElem.classList.add('active');
    if (titles[targetTab] && pageTitle) pageTitle.textContent = titles[targetTab];

    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetTab === 'dashboard') {
      renderCharts();
    } else if (targetTab === 'expenses') {
      renderExpensesTable();
    }
  }

  desktopNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(item.getAttribute('data-tab'));
    });
  });

  mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(item.getAttribute('data-tab'));
    });
  });

  // Mobile Drawer Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      if (sidebar) sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  const btnQuickAdd = document.getElementById('btnQuickAdd');
  const mobileQuickAddBtn = document.getElementById('mobileQuickAddBtn');

  const handleQuickAdd = () => {
    switchTab('daily-entry');
    const today = new Date().toISOString().split('T')[0];
    const entryDateElem = document.getElementById('entryDate');
    if (entryDateElem) {
      entryDateElem.value = today;
      checkAndLoadDateRecord(today);
    }
  };

  if (btnQuickAdd) btnQuickAdd.addEventListener('click', handleQuickAdd);
  if (mobileQuickAddBtn) mobileQuickAddBtn.addEventListener('click', handleQuickAdd);

  const btnQuickRegister = document.getElementById('btnQuickRegister');
  if (btnQuickRegister) {
    btnQuickRegister.addEventListener('click', () => {
      switchTab('customers');
    });
  }

  const btnQuickExpense = document.getElementById('btnQuickExpense');
  if (btnQuickExpense) {
    btnQuickExpense.addEventListener('click', () => {
      const tabBtn = document.querySelector('[data-tab="expenses"]');
      if (tabBtn) tabBtn.click();
      const expDateElem = document.getElementById('expLogDate');
      if (expDateElem && !expDateElem.value) {
        expDateElem.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  const btnExportExcel = document.getElementById('btnExportExcel');
  if (btnExportExcel) {
    btnExportExcel.addEventListener('click', exportToExcel);
  }

  const filterCustType = document.getElementById('filterCustType');
  if (filterCustType) {
    filterCustType.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      const processed = appState.records.map(calculateRecord);
      renderTable(processed);
    });
  }
}

// Update Rate Previews on Daily Form
function updateRatePreviews() {
  const cattle = (appState.rates && appState.rates.cattle) ? appState.rates.cattle : DEFAULT_RATES.cattle;
  const goat = (appState.rates && appState.rates.goat) ? appState.rates.goat : DEFAULT_RATES.goat;

  const cp175 = document.getElementById('cattle_rate175Preview');
  const cp475 = document.getElementById('cattle_rate475Preview');
  const cp500 = document.getElementById('cattle_rate500Preview');
  const cp750 = document.getElementById('cattle_rate750Preview');
  const cp1000 = document.getElementById('cattle_rate1000Preview');

  if (cp175) cp175.textContent = formatCurrency(cattle.rate175);
  if (cp475) cp475.textContent = formatCurrency(cattle.rate475);
  if (cp500) cp500.textContent = formatCurrency(cattle.rate500);
  if (cp750) cp750.textContent = formatCurrency(cattle.rate750);
  if (cp1000) cp1000.textContent = formatCurrency(cattle.rate1000);

  const gp175 = document.getElementById('goat_rate175Preview');
  const gp475 = document.getElementById('goat_rate475Preview');
  const gp500 = document.getElementById('goat_rate500Preview');
  const gp750 = document.getElementById('goat_rate750Preview');
  const gp1000 = document.getElementById('goat_rate1000Preview');

  if (gp175) gp175.textContent = formatCurrency(goat.rate175);
  if (gp475) gp475.textContent = formatCurrency(goat.rate475);
  if (gp500) gp500.textContent = formatCurrency(goat.rate500);
  if (gp750) gp750.textContent = formatCurrency(goat.rate750);
  if (gp1000) gp1000.textContent = formatCurrency(goat.rate1000);
}

// Calculate row calculations dynamically for Cattle Milk AND Goat Milk
function calculateRecord(rec) {
  const cattleRates = (appState.rates && appState.rates.cattle) ? appState.rates.cattle : DEFAULT_RATES.cattle;
  const goatRates = (appState.rates && appState.rates.goat) ? appState.rates.goat : DEFAULT_RATES.goat;

  const c175 = Number(rec.cattle_q175 || 0);
  const c475 = Number(rec.cattle_q475 || 0);
  const c500 = Number(rec.cattle_q500 || 0);
  const c750 = Number(rec.cattle_q750 || (rec.milkType !== 'Goat Milk' ? rec.q750 : 0) || 0);
  const c1000 = Number(rec.cattle_q1000 || (rec.milkType !== 'Goat Milk' ? (rec.q1000 || rec.q1l) : 0) || 0);

  const g175 = Number(rec.goat_q175 || 0);
  const g475 = Number(rec.goat_q475 || 0);
  const g500 = Number(rec.goat_q500 || 0);
  const g750 = Number(rec.goat_q750 || (rec.milkType === 'Goat Milk' ? rec.q750 : 0) || 0);
  const g1000 = Number(rec.goat_q1000 || (rec.milkType === 'Goat Milk' ? (rec.q1000 || rec.q1l) : 0) || 0);

  const cattleLitres = (c175 * 0.175) + (c475 * 0.475) + (c500 * 0.500) + (c750 * 0.750) + (c1000 * 1.000);
  const goatLitres = (g175 * 0.175) + (g475 * 0.475) + (g500 * 0.500) + (g750 * 0.750) + (g1000 * 1.000);
  const totalLitres = cattleLitres + goatLitres;

  const cattleRev = (c175 * cattleRates.rate175) + (c475 * cattleRates.rate475) + (c500 * cattleRates.rate500) + (c750 * cattleRates.rate750) + (c1000 * cattleRates.rate1000);
  const goatRev = (g175 * goatRates.rate175) + (g475 * goatRates.rate475) + (g500 * goatRates.rate500) + (g750 * goatRates.rate750) + (g1000 * goatRates.rate1000);
  const totalRevenue = cattleRev + goatRev;

  const silage = Number(rec.silage || 0);
  const wage = Number(rec.wage || 0);
  const feed = Number(rec.feed || 0);
  const other = Number(rec.other || 0);
  const totalExpenses = silage + wage + feed + other;
  const netProfit = totalRevenue - totalExpenses;

  const paymentStatus = rec.paymentStatus || 'Paid';
  let amountPaid = 0;
  if (paymentStatus === 'Paid') {
    amountPaid = totalRevenue;
  } else if (paymentStatus === 'Pending') {
    amountPaid = 0;
  } else {
    amountPaid = Number(rec.amountPaid || 0);
  }
  const dueBalance = Math.max(0, totalRevenue - amountPaid);

  return {
    ...rec,
    custType: rec.custType || 'Daily Customer',
    custName: rec.custName || '',
    paymentStatus,
    amountPaid,
    dueBalance,
    cattle_q175: c175, cattle_q475: c475, cattle_q500: c500, cattle_q750: c750, cattle_q1000: c1000,
    goat_q175: g175, goat_q475: g475, goat_q500: g500, goat_q750: g750, goat_q1000: g1000,
    cattleLitres, goatLitres, totalLitres,
    cattleRev, goatRev, totalRevenue,
    silage, wage, feed, other, totalExpenses, netProfit
  };
}

// Customer Registration Logic
function initCustomerRegistrationForm() {
  const custForm = document.getElementById('customerForm');
  if (!custForm) return;

  const regPhoneInput = document.getElementById('regPhone');
  const phoneNotice = document.getElementById('phoneValidationNotice');

  if (regPhoneInput && phoneNotice) {
    regPhoneInput.addEventListener('input', () => {
      const val = regPhoneInput.value.trim();
      if (!val) {
        phoneNotice.textContent = '';
        return;
      }
      const check = validatePhoneNumber(val);
      if (check.valid) {
        phoneNotice.textContent = `✓ Valid phone number (${check.cleaned})`;
        phoneNotice.style.color = 'var(--emerald-accent)';
      } else {
        phoneNotice.textContent = `⚠️ ${check.error}`;
        phoneNotice.style.color = 'var(--rose-accent)';
      }
    });
  }

  custForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editingId = document.getElementById('editingCustId')?.value || '';
    const nameInput = document.getElementById('regCustName').value.trim();
    const phoneRaw = document.getElementById('regPhone').value.trim();
    const phoneCheck = validatePhoneNumber(phoneRaw);

    if (!phoneCheck.valid) {
      alert(`⛔ REGISTRATION BLOCKED (INVALID PHONE NUMBER):\n\n${phoneCheck.error}\n\nPlease enter a valid 10-digit mobile number (e.g. 0764805061).`);
      if (regPhoneInput) regPhoneInput.focus();
      return;
    }

    const phoneInput = phoneCheck.cleaned;
    const normName = normalizeStr(nameInput);

    if (editingId) {
      const custIdx = appState.customers.findIndex(c => c.id === editingId);
      if (custIdx !== -1) {
        const dupName = appState.customers.find(c => c.id !== editingId && normalizeStr(c.name) === normName);
        if (dupName) {
          alert(`⛔ UPDATE BLOCKED:\n\nCustomer name "${dupName.name}" is already registered under another account (${dupName.id}).`);
          return;
        }

        if (phoneInput !== 'N/A' && phoneInput.length > 3) {
          const dupPhone = appState.customers.find(c => c.id !== editingId && c.phone !== 'N/A' && c.phone === phoneInput);
          if (dupPhone) {
            alert(`⛔ UPDATE BLOCKED:\n\nPhone number "${phoneInput}" is already registered under customer "${dupPhone.name}" (${dupPhone.id}).`);
            if (regPhoneInput) regPhoneInput.focus();
            return;
          }
        }

        appState.customers[custIdx] = {
          ...appState.customers[custIdx],
          name: nameInput,
          type: document.getElementById('regCustType').value,
          milkType: document.getElementById('regMilkType').value,
          phone: phoneInput,
          address: document.getElementById('regAddress').value.trim() || 'N/A',
          regCattle175: Number(document.getElementById('regCattle175').value || 0),
          regCattle475: Number(document.getElementById('regCattle475').value || 0),
          regCattle500: Number(document.getElementById('regCattle500').value || 0),
          regCattle750: Number(document.getElementById('regCattle750').value || 0),
          regCattle1000: Number(document.getElementById('regCattle1000').value || 0),
          regGoat175: Number(document.getElementById('regGoat175').value || 0),
          regGoat475: Number(document.getElementById('regGoat475').value || 0),
          regGoat500: Number(document.getElementById('regGoat500').value || 0),
          regGoat750: Number(document.getElementById('regGoat750').value || 0),
          regGoat1000: Number(document.getElementById('regGoat1000').value || 0)
        };

        saveState();
        resetCustomerForm();
        renderApp();
        alert(`✅ Customer "${nameInput}" (${editingId}) Updated Successfully!`);
        return;
      }
    }

    const existingName = appState.customers.find(c => normalizeStr(c.name) === normName);
    if (existingName) {
      alert(`⛔ REGISTRATION BLOCKED (DUPLICATE ENTRY):\n\nCustomer "${existingName.name}" is ALREADY registered!\nID: ${existingName.id}\nCategory: ${existingName.type}\nPhone: ${existingName.phone}\n\nDuplicate customer entries are strictly prohibited.`);
      return;
    }

    if (phoneInput !== 'N/A' && phoneInput.length > 3) {
      const existingPhone = appState.customers.find(c => c.phone !== 'N/A' && c.phone === phoneInput);
      if (existingPhone) {
        alert(`⛔ REGISTRATION BLOCKED (DUPLICATE PHONE):\n\nPhone number "${phoneInput}" is ALREADY registered under customer "${existingPhone.name}" (ID: ${existingPhone.id}).`);
        if (regPhoneInput) regPhoneInput.focus();
        return;
      }
    }

    const newCust = {
      id: 'CUST-' + Math.floor(100 + Math.random() * 900),
      name: nameInput,
      type: document.getElementById('regCustType').value,
      milkType: document.getElementById('regMilkType').value,
      phone: phoneInput,
      address: document.getElementById('regAddress').value.trim() || 'N/A',
      regCattle175: Number(document.getElementById('regCattle175').value || 0),
      regCattle475: Number(document.getElementById('regCattle475').value || 0),
      regCattle500: Number(document.getElementById('regCattle500').value || 0),
      regCattle750: Number(document.getElementById('regCattle750').value || 0),
      regCattle1000: Number(document.getElementById('regCattle1000').value || 0),
      regGoat175: Number(document.getElementById('regGoat175').value || 0),
      regGoat475: Number(document.getElementById('regGoat475').value || 0),
      regGoat500: Number(document.getElementById('regGoat500').value || 0),
      regGoat750: Number(document.getElementById('regGoat750').value || 0),
      regGoat1000: Number(document.getElementById('regGoat1000').value || 0),
      status: 'Active'
    };

    appState.customers.unshift(newCust);
    saveState();
    resetCustomerForm();
    renderApp();

    alert(`✅ Customer "${newCust.name}" (${newCust.milkType}) Registered Successfully! Phone: ${newCust.phone}`);
  });

  const btnResetCust = document.getElementById('btnResetCustForm');
  if (btnResetCust) {
    btnResetCust.addEventListener('click', () => {
      resetCustomerForm();
    });
  }
}

function resetCustomerForm() {
  const custForm = document.getElementById('customerForm');
  if (!custForm) return;
  if (document.getElementById('editingCustId')) document.getElementById('editingCustId').value = '';
  custForm.reset();

  const phoneNotice = document.getElementById('phoneValidationNotice');
  if (phoneNotice) phoneNotice.textContent = '';

  const titleElem = document.getElementById('custFormTitle');
  if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-user-plus"></i> Customer Registration Master`;

  const btnSubmit = document.getElementById('btnSubmitCustForm');
  if (btnSubmit) btnSubmit.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save & Register Customer`;
}

function editCustomer(id) {
  const c = appState.customers.find(cust => cust.id === id);
  if (!c) return;

  if (document.getElementById('editingCustId')) document.getElementById('editingCustId').value = c.id;
  document.getElementById('regCustName').value = c.name;
  document.getElementById('regCustType').value = c.type;
  document.getElementById('regMilkType').value = (c.milkType === 'Cattle Milk Only' ? 'Cow Milk Only' : (c.milkType === 'Both (Cattle & Goat)' ? 'Both (Cow & Goat)' : c.milkType)) || 'Both (Cow & Goat)';
  document.getElementById('regPhone').value = c.phone === 'N/A' ? '' : c.phone;
  document.getElementById('regAddress').value = c.address === 'N/A' ? '' : c.address;

  document.getElementById('regCattle175').value = c.regCattle175 || 0;
  document.getElementById('regCattle475').value = c.regCattle475 || 0;
  document.getElementById('regCattle500').value = c.regCattle500 || 0;
  document.getElementById('regCattle750').value = c.regCattle750 || 0;
  document.getElementById('regCattle1000').value = c.regCattle1000 || 0;

  document.getElementById('regGoat175').value = c.regGoat175 || 0;
  document.getElementById('regGoat475').value = c.regGoat475 || 0;
  document.getElementById('regGoat500').value = c.regGoat500 || 0;
  document.getElementById('regGoat750').value = c.regGoat750 || 0;
  document.getElementById('regGoat1000').value = c.regGoat1000 || 0;

  const titleElem = document.getElementById('custFormTitle');
  if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--amber-accent);"></i> Edit Customer Details (${c.id})`;

  const btnSubmit = document.getElementById('btnSubmitCustForm');
  if (btnSubmit) btnSubmit.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Update Customer Details`;

  const custTab = document.querySelector('[data-tab="customers"]');
  if (custTab) custTab.click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 📅 Check if a record exists for a date. Auto-load for Editing if found!
function checkAndLoadDateRecord(selectedDate) {
  if (!selectedDate) return;

  const existingRec = appState.records.find(r => r.date === selectedDate);
  const statusNotice = document.getElementById('dateStatusNotice');

  if (existingRec) {
    const calc = calculateRecord(existingRec);

    document.getElementById('editingRecordId').value = existingRec.id;
    document.getElementById('custType').value = existingRec.custType || 'Daily Customer';
    document.getElementById('custName').value = existingRec.custName || '';
    if (document.getElementById('paymentStatus')) {
      document.getElementById('paymentStatus').value = existingRec.paymentStatus || 'Paid';
    }
    if (document.getElementById('amountPaid')) {
      document.getElementById('amountPaid').value = existingRec.amountPaid || 0;
    }
    const amtGroup = document.getElementById('amountPaidGroup');
    if (amtGroup) {
      amtGroup.style.display = (existingRec.paymentStatus === 'Partial') ? 'flex' : 'none';
    }
    
    document.getElementById('cattle_q175').value = calc.cattle_q175;
    document.getElementById('cattle_q475').value = calc.cattle_q475;
    document.getElementById('cattle_q500').value = calc.cattle_q500;
    document.getElementById('cattle_q750').value = calc.cattle_q750;
    document.getElementById('cattle_q1000').value = calc.cattle_q1000;

    document.getElementById('goat_q175').value = calc.goat_q175;
    document.getElementById('goat_q475').value = calc.goat_q475;
    document.getElementById('goat_q500').value = calc.goat_q500;
    document.getElementById('goat_q750').value = calc.goat_q750;
    document.getElementById('goat_q1000').value = calc.goat_q1000;

    document.getElementById('expSilage').value = existingRec.silage || 0;
    document.getElementById('expWage').value = existingRec.wage || 0;
    document.getElementById('expFeed').value = existingRec.feed || 0;
    document.getElementById('expOther').value = existingRec.other || 0;
    document.getElementById('remarks').value = existingRec.remarks || '';

    updateRatePreviews();
    updateLiveCalc();

    document.getElementById('entryFormTitle').innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--amber-accent);"></i> Edit Record (Date: ${selectedDate})`;
    document.getElementById('btnSubmitForm').innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Update Record for ${selectedDate}`;

    if (statusNotice) {
      statusNotice.style.display = 'block';
      statusNotice.className = 'status-notice notice-info';
      statusNotice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Record already exists for <strong>${selectedDate}</strong>. Modifying fields will update this date's single record.`;
    }
  } else {
    document.getElementById('editingRecordId').value = '';
    document.getElementById('custType').value = 'Daily Customer';
    document.getElementById('custName').value = 'Daily Farm Operations';
    
    ['cattle_q175','cattle_q475','cattle_q500','cattle_q750','cattle_q1000',
     'goat_q175','goat_q475','goat_q500','goat_q750','goat_q1000'].forEach(id => {
       const elem = document.getElementById(id);
       if (elem) elem.value = 0;
     });

    document.getElementById('expSilage').value = 0;
    document.getElementById('expWage').value = 0;
    document.getElementById('expFeed').value = 0;
    document.getElementById('expOther').value = 0;
    document.getElementById('remarks').value = '';

    updateRatePreviews();
    updateLiveCalc();

    document.getElementById('entryFormTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Record Farm Transaction`;
    document.getElementById('btnSubmitForm').innerHTML = `<i class="fa-solid fa-check"></i> Save Daily Record for ${selectedDate}`;

    if (statusNotice) {
      statusNotice.style.display = 'block';
      statusNotice.className = 'status-notice notice-success';
      statusNotice.innerHTML = `<i class="fa-solid fa-circle-check"></i> No record logged yet for <strong>${selectedDate}</strong>. Fill out details to save.`;
    }
  }
}

// Reset Form
function resetDailyForm() {
  const today = new Date().toISOString().split('T')[0];
  const dateElem = document.getElementById('entryDate');
  if (dateElem) {
    dateElem.value = today;
    checkAndLoadDateRecord(today);
  }
}

// Live calculation update across Cattle & Goat Milk bottle inputs
function updateLiveCalc() {
  const cattle = (appState.rates && appState.rates.cattle) ? appState.rates.cattle : DEFAULT_RATES.cattle;
  const goat = (appState.rates && appState.rates.goat) ? appState.rates.goat : DEFAULT_RATES.goat;

  const c175 = Number(document.getElementById('cattle_q175')?.value || 0);
  const c475 = Number(document.getElementById('cattle_q475')?.value || 0);
  const c500 = Number(document.getElementById('cattle_q500')?.value || 0);
  const c750 = Number(document.getElementById('cattle_q750')?.value || 0);
  const c1000 = Number(document.getElementById('cattle_q1000')?.value || 0);

  const g175 = Number(document.getElementById('goat_q175')?.value || 0);
  const g475 = Number(document.getElementById('goat_q475')?.value || 0);
  const g500 = Number(document.getElementById('goat_q500')?.value || 0);
  const g750 = Number(document.getElementById('goat_q750')?.value || 0);
  const g1000 = Number(document.getElementById('goat_q1000')?.value || 0);

  const cL = (c175 * 0.175) + (c475 * 0.475) + (c500 * 0.5) + (c750 * 0.75) + (c1000 * 1.0);
  const gL = (g175 * 0.175) + (g475 * 0.475) + (g500 * 0.5) + (g750 * 0.75) + (g1000 * 1.0);
  const totL = cL + gL;

  const cR = (c175 * cattle.rate175) + (c475 * cattle.rate475) + (c500 * cattle.rate500) + (c750 * cattle.rate750) + (c1000 * cattle.rate1000);
  const gR = (g175 * goat.rate175) + (g475 * goat.rate475) + (g500 * goat.rate500) + (g750 * goat.rate750) + (g1000 * goat.rate1000);
  const totR = cR + gR;

  if (document.getElementById('liveCattleLitres')) document.getElementById('liveCattleLitres').textContent = formatLitres(cL);
  if (document.getElementById('liveCattleRev')) document.getElementById('liveCattleRev').textContent = formatCurrency(cR);
  if (document.getElementById('liveGoatLitres')) document.getElementById('liveGoatLitres').textContent = formatLitres(gL);
  if (document.getElementById('liveGoatRev')) document.getElementById('liveGoatRev').textContent = formatCurrency(gR);

  if (document.getElementById('liveLitres')) document.getElementById('liveLitres').textContent = formatLitres(totL);
  if (document.getElementById('liveRevenue')) document.getElementById('liveRevenue').textContent = formatCurrency(totR);

  const pStatus = document.getElementById('paymentStatus')?.value || 'Paid';
  const amtGroup = document.getElementById('amountPaidGroup');
  const dueNotice = document.getElementById('dueBalanceNotice');
  const amtPaidInput = document.getElementById('amountPaid');

  if (amtGroup) {
    if (pStatus === 'Partial') {
      amtGroup.style.display = 'flex';
      const paid = Number(amtPaidInput?.value || 0);
      const due = Math.max(0, totR - paid);
      if (dueNotice) dueNotice.textContent = `⚠️ Remaining Balance Due: ${formatCurrency(due)}`;
    } else {
      amtGroup.style.display = 'none';
      if (dueNotice) dueNotice.textContent = '';
    }
  }
}

// Form Listeners for Daily Transaction Entry
function initFormListeners() {
  const entryDate = document.getElementById('entryDate');
  const custSelect = document.getElementById('selectRegisteredCustomer');
  const custType = document.getElementById('custType');
  const custName = document.getElementById('custName');
  const paymentStatus = document.getElementById('paymentStatus');
  const amountPaid = document.getElementById('amountPaid');

  if (entryDate) {
    entryDate.addEventListener('change', (e) => {
      checkAndLoadDateRecord(e.target.value);
    });
  }

  if (paymentStatus) {
    paymentStatus.addEventListener('change', updateLiveCalc);
  }
  if (amountPaid) {
    amountPaid.addEventListener('input', updateLiveCalc);
  }

  ['cattle_q175','cattle_q475','cattle_q500','cattle_q750','cattle_q1000',
   'goat_q175','goat_q475','goat_q500','goat_q750','goat_q1000'].forEach(id => {
     const input = document.getElementById(id);
     if (input) input.addEventListener('input', updateLiveCalc);
   });

  if (custSelect) {
    custSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (!selectedId) return;

      const foundCust = appState.customers.find(c => c.id === selectedId);
      if (foundCust) {
        if (custName) custName.value = foundCust.name;
        if (custType) custType.value = foundCust.type;
        
        document.getElementById('cattle_q175').value = foundCust.regCattle175 || 0;
        document.getElementById('cattle_q475').value = foundCust.regCattle475 || 0;
        document.getElementById('cattle_q500').value = foundCust.regCattle500 || 0;
        document.getElementById('cattle_q750').value = foundCust.regCattle750 || 0;
        document.getElementById('cattle_q1000').value = foundCust.regCattle1000 || 0;

        document.getElementById('goat_q175').value = foundCust.regGoat175 || 0;
        document.getElementById('goat_q475').value = foundCust.regGoat475 || 0;
        document.getElementById('goat_q500').value = foundCust.regGoat500 || 0;
        document.getElementById('goat_q750').value = foundCust.regGoat750 || 0;
        document.getElementById('goat_q1000').value = foundCust.regGoat1000 || 0;

        updateRatePreviews();
        updateLiveCalc();
      }
    });
  }

  const entryForm = document.getElementById('entryForm');
  if (entryForm) {
    entryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedDate = entryDate.value;
      const pStatus = document.getElementById('paymentStatus') ? document.getElementById('paymentStatus').value : 'Paid';
      const amtPaidVal = Number(document.getElementById('amountPaid')?.value || 0);

      const recordData = {
        id: 'rec-' + selectedDate,
        date: selectedDate,
        custType: custType.value,
        custName: nameVal,
        paymentStatus: pStatus,
        amountPaid: amtPaidVal,
        cattle_q175: Number(document.getElementById('cattle_q175').value || 0),
        cattle_q475: Number(document.getElementById('cattle_q475').value || 0),
        cattle_q500: Number(document.getElementById('cattle_q500').value || 0),
        cattle_q750: Number(document.getElementById('cattle_q750').value || 0),
        cattle_q1000: Number(document.getElementById('cattle_q1000').value || 0),
        goat_q175: Number(document.getElementById('goat_q175').value || 0),
        goat_q475: Number(document.getElementById('goat_q475').value || 0),
        goat_q500: Number(document.getElementById('goat_q500').value || 0),
        goat_q750: Number(document.getElementById('goat_q750').value || 0),
        goat_q1000: Number(document.getElementById('goat_q1000').value || 0),
        silage: Number(document.getElementById('expSilage').value || 0),
        wage: Number(document.getElementById('expWage').value || 0),
        feed: Number(document.getElementById('expFeed').value || 0),
        other: Number(document.getElementById('expOther').value || 0),
        remarks: document.getElementById('remarks').value
      };

      const existingIndex = appState.records.findIndex(r => r.date === selectedDate);

      if (existingIndex !== -1) {
        appState.records[existingIndex] = recordData;
        alert(`✅ Record for Date ${selectedDate} Updated Successfully!`);
      } else {
        appState.records.unshift(recordData);
        appState.records.sort((a, b) => new Date(b.date) - new Date(a.date));
        alert(`✅ New Daily Record for Date ${selectedDate} Saved Successfully!`);
      }

      saveState();
      renderApp();
      const recordsTab = document.querySelector('[data-tab="records"]');
      if (recordsTab) recordsTab.click();
    });
  }

  const btnResetForm = document.getElementById('btnResetForm');
  if (btnResetForm) {
    btnResetForm.addEventListener('click', () => {
      resetDailyForm();
    });
  }

  const btnClearAll = document.getElementById('btnClearAll');
  if (btnClearAll) {
    btnClearAll.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all records?')) {
        appState.records = [];
        saveState();
        renderApp();
      }
    });
  }
}

// Standalone Farm Expense Form Logic
function initStandaloneExpenseForm() {
  const form = document.getElementById('standaloneExpenseForm');
  if (!form) return;

  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('expLogDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const editingId = document.getElementById('editingExpId').value;
    const expDate = document.getElementById('expLogDate').value;
    const category = document.getElementById('expCategory').value;
    const payee = document.getElementById('expPayee').value.trim();
    const amount = Number(document.getElementById('expAmount').value || 0);
    const notes = document.getElementById('expNotes').value.trim();

    if (amount <= 0) {
      alert('⚠️ Please enter a valid expense amount greater than Rs. 0.00');
      return;
    }

    if (editingId) {
      const idx = appState.expenses.findIndex(x => x.id === editingId);
      if (idx !== -1) {
        appState.expenses[idx] = {
          ...appState.expenses[idx],
          date: expDate,
          category,
          name: payee,
          amount,
          remarks: notes
        };
        alert(`✅ Farm Expense (${category} - Rs. ${amount.toFixed(2)}) Updated Successfully!`);
      }
    } else {
      const newExp = {
        id: 'EXP-' + Math.floor(100 + Math.random() * 900),
        date: expDate,
        category,
        name: payee,
        amount,
        remarks: notes
      };
      appState.expenses.unshift(newExp);
      appState.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      alert(`✅ Farm Expense (${category} - Rs. ${amount.toFixed(2)}) Logged Successfully!`);
    }

    saveState();
    resetExpenseForm();
    renderApp();
  });

  const btnReset = document.getElementById('btnResetExpForm');
  if (btnReset) {
    btnReset.addEventListener('click', resetExpenseForm);
  }

  const filterExp = document.getElementById('filterExpCategory');
  if (filterExp) {
    filterExp.addEventListener('change', () => {
      renderExpensesTable();
    });
  }
}

function resetExpenseForm() {
  const form = document.getElementById('standaloneExpenseForm');
  if (!form) return;
  document.getElementById('editingExpId').value = '';
  form.reset();
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('expLogDate').value = today;
  document.getElementById('expFormTitle').innerHTML = `<i class="fa-solid fa-receipt"></i> Log Separate Farm Expense`;
  document.getElementById('btnSubmitExpForm').innerHTML = `<i class="fa-solid fa-plus-circle"></i> Save Expense Record`;
}

function renderExpensesTable() {
  const tbody = document.getElementById('expTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filterVal = document.getElementById('filterExpCategory')?.value || 'ALL';
  const filtered = filterVal === 'ALL' 
    ? appState.expenses 
    : appState.expenses.filter(x => x.category === filterVal);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);">No farm expenses logged for this filter.</td></tr>`;
    return;
  }

  filtered.forEach(exp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${exp.id}</code></td>
      <td><strong>${exp.date}</strong></td>
      <td><span class="badge-cust badge-monthly">${exp.category}</span></td>
      <td>${exp.name || '-'}</td>
      <td class="text-rose"><strong>${formatCurrency(exp.amount)}</strong></td>
      <td>${exp.remarks || '-'}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-action btn-edit" onclick="editExpense('${exp.id}')" title="Edit Expense">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteExpense('${exp.id}')" title="Delete Expense">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editExpense(id) {
  const exp = appState.expenses.find(x => x.id === id);
  if (!exp) return;

  document.getElementById('editingExpId').value = exp.id;
  document.getElementById('expLogDate').value = exp.date;
  document.getElementById('expCategory').value = exp.category;
  document.getElementById('expPayee').value = exp.name || '';
  document.getElementById('expAmount').value = exp.amount;
  document.getElementById('expNotes').value = exp.remarks || '';

  document.getElementById('expFormTitle').innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--amber-accent);"></i> Edit Farm Expense (${exp.id})`;
  document.getElementById('btnSubmitExpForm').innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Update Expense Record`;

  const expTab = document.querySelector('[data-tab="expenses"]');
  if (expTab) expTab.click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteExpense(id) {
  if (confirm('Delete this farm expense entry?')) {
    appState.expenses = appState.expenses.filter(x => x.id !== id);
    saveState();
    renderApp();
  }
}

// Settings Form for Cow Milk & Goat Milk Pricing Matrix
function initSettingsForm() {
  const form = document.getElementById('settingsForm');
  if (!form) return;

  const cattle = (appState.rates && appState.rates.cattle) ? appState.rates.cattle : DEFAULT_RATES.cattle;
  const goat = (appState.rates && appState.rates.goat) ? appState.rates.goat : DEFAULT_RATES.goat;

  document.getElementById('settingCattle175').value = cattle.rate175;
  document.getElementById('settingCattle475').value = cattle.rate475;
  document.getElementById('settingCattle500').value = cattle.rate500;
  document.getElementById('settingCattle750').value = cattle.rate750;
  document.getElementById('settingCattle1000').value = cattle.rate1000;

  document.getElementById('settingGoat175').value = goat.rate175;
  document.getElementById('settingGoat475').value = goat.rate475;
  document.getElementById('settingGoat500').value = goat.rate500;
  document.getElementById('settingGoat750').value = goat.rate750;
  document.getElementById('settingGoat1000').value = goat.rate1000;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    appState.rates = {
      cattle: {
        rate175: Number(document.getElementById('settingCattle175').value || 0),
        rate475: Number(document.getElementById('settingCattle475').value || 0),
        rate500: Number(document.getElementById('settingCattle500').value || 0),
        rate750: Number(document.getElementById('settingCattle750').value || 0),
        rate1000: Number(document.getElementById('settingCattle1000').value || 0)
      },
      goat: {
        rate175: Number(document.getElementById('settingGoat175').value || 0),
        rate475: Number(document.getElementById('settingGoat475').value || 0),
        rate500: Number(document.getElementById('settingGoat500').value || 0),
        rate750: Number(document.getElementById('settingGoat750').value || 0),
        rate1000: Number(document.getElementById('settingGoat1000').value || 0)
      }
    };
    saveState();
    updateRatePreviews();
    renderApp();
    alert('✅ Cow Milk & Goat Milk Pricing Settings Saved Successfully!');
  });
}

function saveState() {
  localStorage.setItem('farm_rates', JSON.stringify(appState.rates));
  localStorage.setItem('farm_customers', JSON.stringify(appState.customers));
  localStorage.setItem('farm_records', JSON.stringify(appState.records));
  localStorage.setItem('farm_expenses', JSON.stringify(appState.expenses));
}

// Render Application UI & Totals
function renderApp() {
  const processedRecords = appState.records.map(calculateRecord);

  let totalRev = 0, totalLitres = 0;
  let q175Tot = 0, q475Tot = 0, q500Tot = 0, q750Tot = 0, q1000Tot = 0;
  let silageTot = 0, wageTot = 0, feedTot = 0, otherTot = 0;

  let cattleRev = 0, cattleLitres = 0;
  let goatRev = 0, goatLitres = 0;

  let dailyRev = 0, dailyLitres = 0;
  let weeklyRev = 0, weeklyLitres = 0;
  let monthlyRev = 0, monthlyLitres = 0;
  let timebeingRev = 0, timebeingLitres = 0;

  processedRecords.forEach(r => {
    totalRev += r.totalRevenue;
    totalLitres += r.totalLitres;

    cattleRev += r.cattleRev;
    cattleLitres += r.cattleLitres;
    goatRev += r.goatRev;
    goatLitres += r.goatLitres;

    q175Tot += (r.cattle_q175 + r.goat_q175);
    q475Tot += (r.cattle_q475 + r.goat_q475);
    q500Tot += (r.cattle_q500 + r.goat_q500);
    q750Tot += (r.cattle_q750 + r.goat_q750);
    q1000Tot += (r.cattle_q1000 + r.goat_q1000);

    silageTot += r.silage;
    wageTot += r.wage;
    feedTot += r.feed;
    otherTot += r.other;

    if (r.custType === 'Daily Customer') {
      dailyRev += r.totalRevenue;
      dailyLitres += r.totalLitres;
    } else if (r.custType === 'Weekly Customer') {
      weeklyRev += r.totalRevenue;
      weeklyLitres += r.totalLitres;
    } else if (r.custType === 'Monthly Customer') {
      monthlyRev += r.totalRevenue;
      monthlyLitres += r.totalLitres;
    } else {
      timebeingRev += r.totalRevenue;
      timebeingLitres += r.totalLitres;
    }
  });

  // Include Standalone Expenses into Totals
  (appState.expenses || []).forEach(exp => {
    const amt = Number(exp.amount || 0);
    if (exp.category === 'Silage') silageTot += amt;
    else if (exp.category === 'Grass Cutter Wage') wageTot += amt;
    else if (exp.category === 'Feed / Punnaku') feedTot += amt;
    else otherTot += amt;
  });

  const totalExp = silageTot + wageTot + feedTot + otherTot;
  const netProfit = totalRev - totalExp;
  const marginPct = totalRev > 0 ? ((netProfit / totalRev) * 100).toFixed(1) : 0;

  let totalPendingDues = 0;
  processedRecords.forEach(r => {
    totalPendingDues += (r.dueBalance || 0);
  });

  document.getElementById('statTotalRev').textContent = formatCurrency(totalRev);
  document.getElementById('statTotalLitres').textContent = formatLitres(totalLitres);
  document.getElementById('statBottleBreakdown').textContent = `175ml: ${q175Tot} | 475ml: ${q475Tot} | 500ml: ${q500Tot} | 750ml: ${q750Tot} | 1L: ${q1000Tot}`;
  document.getElementById('statTotalExp').textContent = formatCurrency(totalExp);
  document.getElementById('statNetProfit').textContent = formatCurrency(netProfit);
  document.getElementById('statMarginBadge').textContent = `${marginPct}% Margin`;
  if (document.getElementById('statPendingDues')) {
    document.getElementById('statPendingDues').textContent = formatCurrency(totalPendingDues);
  }

  const catCattleRev = document.getElementById('catCattleRev');
  const catCattleLitres = document.getElementById('catCattleLitres');
  const catGoatRev = document.getElementById('catGoatRev');
  const catGoatLitres = document.getElementById('catGoatLitres');
  if (catCattleRev) catCattleRev.textContent = formatCurrency(cattleRev);
  if (catCattleLitres) catCattleLitres.textContent = formatLitres(cattleLitres);
  if (catGoatRev) catGoatRev.textContent = formatCurrency(goatRev);
  if (catGoatLitres) catGoatLitres.textContent = formatLitres(goatLitres);

  document.getElementById('custDailyRev').textContent = formatCurrency(dailyRev);
  document.getElementById('custDailyLitres').textContent = formatLitres(dailyLitres);
  
  const custWeeklyRev = document.getElementById('custWeeklyRev');
  const custWeeklyLitres = document.getElementById('custWeeklyLitres');
  if (custWeeklyRev) custWeeklyRev.textContent = formatCurrency(weeklyRev);
  if (custWeeklyLitres) custWeeklyLitres.textContent = formatLitres(weeklyLitres);

  document.getElementById('custMonthlyRev').textContent = formatCurrency(monthlyRev);
  document.getElementById('custMonthlyLitres').textContent = formatLitres(monthlyLitres);
  document.getElementById('custTimeBeingRev').textContent = formatCurrency(timebeingRev);
  document.getElementById('custTimeBeingLitres').textContent = formatLitres(timebeingLitres);

  document.getElementById('catSilageCost').textContent = formatCurrency(silageTot);
  document.getElementById('catWageCost').textContent = formatCurrency(wageTot);
  document.getElementById('catFeedCost').textContent = formatCurrency(feedTot);
  document.getElementById('catOtherCost').textContent = formatCurrency(otherTot);

  renderCustomerDropdown();
  renderCustomerDirectory(processedRecords);
  renderExpensesTable();
  renderTable(processedRecords);
  renderCharts(processedRecords);
  if (appState.currentUser) applyRolePermissions(appState.currentUser);
}

// Render Registered Customers Dropdown in Daily Entry
function renderCustomerDropdown() {
  const select = document.getElementById('selectRegisteredCustomer');
  if (!select) return;
  select.innerHTML = '<option value="">-- Select Registered Customer (Auto-fill) --</option>';
  appState.customers.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.milkType || 'Both (Cattle & Goat)'}) - ${c.address}`;
    select.appendChild(opt);
  });
}

// Render Customer Directory Table
function renderCustomerDirectory(processedRecords) {
  const tbody = document.getElementById('custTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (appState.customers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color: var(--text-muted);">No customers registered yet.</td></tr>`;
    return;
  }

  appState.customers.forEach(c => {
    let cLitres = 0, cRev = 0;
    processedRecords.forEach(r => {
      if (normalizeStr(r.custName).includes(normalizeStr(c.name))) {
        cLitres += r.totalLitres;
        cRev += r.totalRevenue;
      }
    });

    const cattleDef = `${c.regCattle175 || 0}/${c.regCattle475 || 0}/${c.regCattle500 || 0}/${c.regCattle750 || 0}/${c.regCattle1000 || 0}`;
    const goatDef = `${c.regGoat175 || 0}/${c.regGoat475 || 0}/${c.regGoat500 || 0}/${c.regGoat750 || 0}/${c.regGoat1000 || 0}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${c.id}</code></td>
      <td><strong>${c.name}</strong></td>
      <td>${getMilkBadge(c.milkType || 'Both (Cow & Goat)')}</td>
      <td>${getCustBadge(c.type)}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td style="font-size: 11px; color: var(--teal-accent);">${cattleDef}</td>
      <td style="font-size: 11px; color: var(--indigo-accent);">${goatDef}</td>
      <td><strong>${formatLitres(cLitres)}</strong></td>
      <td class="text-teal"><strong>${formatCurrency(cRev)}</strong></td>
      <td>
        <div class="action-buttons">
          <button class="btn-action btn-log" onclick="selectCustForLog('${c.id}')" title="Log Daily Entry">
            <i class="fa-solid fa-cart-plus"></i> Log
          </button>
          <button class="btn-action btn-edit" onclick="editCustomer('${c.id}')" title="Edit Customer Details">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteCustomer('${c.id}')" title="Delete Customer">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function selectCustForLog(custId) {
  const tabBtn = document.querySelector('[data-tab="daily-entry"]');
  if (tabBtn) tabBtn.click();
  const select = document.getElementById('selectRegisteredCustomer');
  if (select) {
    select.value = custId;
    select.dispatchEvent(new Event('change'));
  }
}

function deleteCustomer(id) {
  if (confirm('Delete this registered customer?')) {
    appState.customers = appState.customers.filter(c => c.id !== id);
    saveState();
    renderApp();
  }
}

function getPaymentStatusBadge(r) {
  const status = r.paymentStatus || 'Paid';
  if (status === 'Pending') {
    return `<span class="badge-cust badge-daily" style="background-color: rgba(244, 63, 94, 0.15); color: #f43f5e; border-color: rgba(244, 63, 94, 0.3); font-size: 11px;"><i class="fa-solid fa-circle-xmark"></i> Pending (${formatCurrency(r.dueBalance)})</span>`;
  }
  if (status === 'Partial') {
    return `<span class="badge-cust badge-weekly" style="background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); font-size: 11px;"><i class="fa-solid fa-clock"></i> Partial (Paid: ${formatCurrency(r.amountPaid)} | Due: ${formatCurrency(r.dueBalance)})</span>`;
  }
  return `<span class="badge-cust badge-daily" style="background-color: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3); font-size: 11px;"><i class="fa-solid fa-circle-check"></i> Paid</span>`;
}

// Render Log Records Table
function renderTable(records) {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filtered = currentFilter === 'ALL' 
    ? records 
    : records.filter(r => r.custType === currentFilter);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding: 24px; color: var(--text-muted);">No records found for selected filter.</td></tr>`;
    return;
  }

  filtered.forEach(r => {
    const cattleSummary = `175:${r.cattle_q175}|475:${r.cattle_q475}|500:${r.cattle_q500}|750:${r.cattle_q750}|1L:${r.cattle_q1000}`;
    const goatSummary = `175:${r.goat_q175}|475:${r.goat_q475}|500:${r.goat_q500}|750:${r.goat_q750}|1L:${r.goat_q1000}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${r.date}</strong></td>
      <td>${getCustBadge(r.custType)}</td>
      <td><strong>${r.custName || '-'}</strong><br>${getPaymentStatusBadge(r)}</td>
      <td style="font-size: 11px; color: var(--teal-accent);">${cattleSummary}</td>
      <td style="font-size: 11px; color: var(--indigo-accent);">${goatSummary}</td>
      <td><strong>${formatLitres(r.totalLitres)}</strong></td>
      <td class="text-teal"><strong>${formatCurrency(r.totalRevenue)}</strong></td>
      <td>${formatCurrency(r.silage)}</td>
      <td>${formatCurrency(r.wage)}</td>
      <td>${formatCurrency(r.feed)}</td>
      <td>${formatCurrency(r.other)}</td>
      <td class="text-rose"><strong>${formatCurrency(r.totalExpenses)}</strong></td>
      <td style="color:${r.netProfit >= 0 ? 'var(--emerald-accent)' : 'var(--rose-accent)'}"><strong>${formatCurrency(r.netProfit)}</strong></td>
      <td>${r.remarks || '-'}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-action btn-log" onclick="openReceiptModal('${r.id}')" title="Receipt, PDF & WhatsApp">
            <i class="fa-solid fa-file-invoice"></i> Receipt
          </button>
          <button class="btn-action btn-view" onclick="viewRecord('${r.id}')" title="View Full Details">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="btn-action btn-edit" onclick="editRecord('${r.id}')" title="Edit Date Record">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteRecord('${r.id}')" title="Delete Date Record">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// VIEW RECORD MODAL
function viewRecord(id) {
  const rec = appState.records.map(calculateRecord).find(r => r.id === id);
  if (!rec) return;

  currentViewingRecordId = id;

  const modalBody = document.getElementById('viewModalBody');
  modalBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <div class="lbl">Date</div>
        <div class="val">${rec.date}</div>
      </div>
      <div class="detail-item">
        <div class="lbl">Customer Category</div>
        <div class="val">${getCustBadge(rec.custType)}</div>
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <div class="lbl">Customer / Route Name</div>
        <div class="val">${rec.custName || 'N/A'}</div>
      </div>
      <div class="detail-item">
        <div class="lbl">Cow Milk Sales</div>
        <div class="val text-teal" style="font-size: 13px;">
          ${formatLitres(rec.cattleLitres)} (${formatCurrency(rec.cattleRev)})<br>
          <small style="color: var(--text-muted);">175ml:${rec.cattle_q175} | 475ml:${rec.cattle_q475} | 500ml:${rec.cattle_q500} | 750ml:${rec.cattle_q750} | 1L:${rec.cattle_q1000}</small>
        </div>
      </div>
      <div class="detail-item">
        <div class="lbl">Goat Milk Sales</div>
        <div class="val text-indigo" style="font-size: 13px;">
          ${formatLitres(rec.goatLitres)} (${formatCurrency(rec.goatRev)})<br>
          <small style="color: var(--text-muted);">175ml:${rec.goat_q175} | 475ml:${rec.goat_q475} | 500ml:${rec.goat_q500} | 750ml:${rec.goat_q750} | 1L:${rec.goat_q1000}</small>
        </div>
      </div>
      <div class="detail-item">
        <div class="lbl">Total Combined Volume</div>
        <div class="val text-teal">${formatLitres(rec.totalLitres)}</div>
      </div>
      <div class="detail-item">
        <div class="lbl">Total Combined Revenue</div>
        <div class="val text-teal">${formatCurrency(rec.totalRevenue)}</div>
      </div>
      <div class="detail-item">
        <div class="lbl">Expenses Breakdown</div>
        <div class="val" style="font-size: 12px; color: var(--rose-accent);">
          Silage: ${formatCurrency(rec.silage)} | Wage: ${formatCurrency(rec.wage)}<br>
          Feed: ${formatCurrency(rec.feed)} | Other: ${formatCurrency(rec.other)}
        </div>
      </div>
      <div class="detail-item">
        <div class="lbl">Total Expenses</div>
        <div class="val text-rose">${formatCurrency(rec.totalExpenses)}</div>
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <div class="lbl">Net Profit / Loss</div>
        <div class="val" style="font-size: 20px; color:${rec.netProfit >= 0 ? 'var(--emerald-accent)' : 'var(--rose-accent)'};">
          ${formatCurrency(rec.netProfit)}
        </div>
      </div>
      <div class="detail-item" style="grid-column: 1 / -1;">
        <div class="lbl">Remarks / Notes</div>
        <div class="val" style="font-size: 13px;">${rec.remarks || 'No notes provided.'}</div>
      </div>
    </div>
  `;

  const modal = document.getElementById('viewModal');
  if (modal) modal.classList.add('active');

  const btnEditFromView = document.getElementById('btnEditFromView');
  if (btnEditFromView) {
    btnEditFromView.onclick = () => {
      closeViewModal();
      editRecord(id);
    };
  }
}

function closeViewModal() {
  const modal = document.getElementById('viewModal');
  if (modal) modal.classList.remove('active');
}

// PDF & WHATSAPP RECEIPT MODAL
function openReceiptModal(id) {
  const rec = appState.records.map(calculateRecord).find(r => r.id === id);
  if (!rec) return;

  const modal = document.getElementById('receiptModal');
  if (!modal) return;

  let custPhone = 'N/A';
  const matchedCust = appState.customers.find(c => normalizeStr(c.name) === normalizeStr(rec.custName));
  if (matchedCust && matchedCust.phone) {
    custPhone = matchedCust.phone;
  }

  document.getElementById('rcptDate').textContent = rec.date;
  document.getElementById('rcptCategory').textContent = rec.custType;
  document.getElementById('rcptCustName').textContent = rec.custName || 'N/A';
  document.getElementById('rcptPhone').textContent = custPhone;

  const badgeElem = document.getElementById('rcptPaymentBadge');
  if (badgeElem) {
    badgeElem.textContent = rec.paymentStatus || 'Paid';
    if (rec.paymentStatus === 'Pending') {
      badgeElem.className = 'badge-cust badge-daily';
      badgeElem.style.backgroundColor = 'rgba(244, 63, 94, 0.15)';
      badgeElem.style.color = '#f43f5e';
      badgeElem.style.borderColor = 'rgba(244, 63, 94, 0.3)';
    } else if (rec.paymentStatus === 'Partial') {
      badgeElem.className = 'badge-cust badge-weekly';
      badgeElem.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
      badgeElem.style.color = '#f59e0b';
      badgeElem.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    } else {
      badgeElem.className = 'badge-cust badge-daily';
      badgeElem.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      badgeElem.style.color = '#10b981';
      badgeElem.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    }
  }

  const rates = appState.rates || DEFAULT_RATES;
  const cattleRates = rates.cattle || DEFAULT_RATES.cattle;
  const goatRates = rates.goat || DEFAULT_RATES.goat;

  const tbody = document.getElementById('rcptTableBody');
  tbody.innerHTML = '';

  const items = [
    { type: 'Cow Milk', size: '175ml', qty: rec.cattle_q175, price: cattleRates.rate175 },
    { type: 'Cow Milk', size: '475ml', qty: rec.cattle_q475, price: cattleRates.rate475 },
    { type: 'Cow Milk', size: '500ml', qty: rec.cattle_q500, price: cattleRates.rate500 },
    { type: 'Cow Milk', size: '750ml', qty: rec.cattle_q750, price: cattleRates.rate750 },
    { type: 'Cow Milk', size: '1000ml (1L)', qty: rec.cattle_q1000, price: cattleRates.rate1000 },
    { type: 'Goat Milk', size: '175ml', qty: rec.goat_q175, price: goatRates.rate175 },
    { type: 'Goat Milk', size: '475ml', qty: rec.goat_q475, price: goatRates.rate475 },
    { type: 'Goat Milk', size: '500ml', qty: rec.goat_q500, price: goatRates.rate500 },
    { type: 'Goat Milk', size: '750ml', qty: rec.goat_q750, price: goatRates.rate750 },
    { type: 'Goat Milk', size: '1000ml (1L)', qty: rec.goat_q1000, price: goatRates.rate1000 }
  ];

  let lineCount = 0;
  items.forEach(item => {
    if (item.qty > 0) {
      lineCount++;
      const amt = item.qty * item.price;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.type}</strong> (${item.size})</td>
        <td>${item.qty}</td>
        <td>${formatCurrency(item.price)}</td>
        <td><strong>${formatCurrency(amt)}</strong></td>
      `;
      tbody.appendChild(tr);
    }
  });

  if (lineCount === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b;">No bottle quantities logged.</td></tr>`;
  }

  document.getElementById('rcptTotalVolume').textContent = formatLitres(rec.totalLitres);
  document.getElementById('rcptGrandTotal').textContent = formatCurrency(rec.totalRevenue);

  const paidRow = document.getElementById('rcptPaidRow');
  const dueRow = document.getElementById('rcptDueRow');

  if (rec.paymentStatus === 'Partial') {
    if (paidRow) {
      paidRow.style.display = 'flex';
      document.getElementById('rcptAmountPaid').textContent = formatCurrency(rec.amountPaid);
    }
    if (dueRow) {
      dueRow.style.display = 'flex';
      document.getElementById('rcptRemainingDue').textContent = formatCurrency(rec.dueBalance);
    }
  } else if (rec.paymentStatus === 'Pending') {
    if (paidRow) paidRow.style.display = 'none';
    if (dueRow) {
      dueRow.style.display = 'flex';
      document.getElementById('rcptRemainingDue').textContent = formatCurrency(rec.dueBalance);
    }
  } else {
    if (paidRow) paidRow.style.display = 'none';
    if (dueRow) dueRow.style.display = 'none';
  }

  const btnPdf = document.getElementById('btnDownloadPDF');
  if (btnPdf) {
    btnPdf.onclick = () => {
      const element = document.getElementById('printableReceiptArea');
      const opt = {
        margin:       [10, 10, 10, 10],
        filename:     `Happy_Family_Farms_Receipt_${rec.date}_${(rec.custName || 'Customer').replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      if (window.html2pdf) {
        html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
    };
  }

  const btnWa = document.getElementById('btnShareWhatsApp');
  if (btnWa) {
    btnWa.onclick = () => {
      let waMsg = `🐄 *HAPPY FAMILY FARMS* 🐐\n`;
      waMsg += `*Dairy Billing Receipt*\n`;
      waMsg += `------------------------------------\n`;
      waMsg += `📅 Date: ${rec.date}\n`;
      waMsg += `👤 Customer: ${rec.custName || 'N/A'}\n`;
      waMsg += `🏷️ Category: ${rec.custType}\n`;
      waMsg += `💳 Payment Status: ${rec.paymentStatus || 'Paid'}\n`;
      waMsg += `------------------------------------\n`;
      waMsg += `*Order Items:*\n`;

      items.forEach(item => {
        if (item.qty > 0) {
          waMsg += `• ${item.type} (${item.size}): ${item.qty} pcs @ Rs. ${item.price.toFixed(2)} = Rs. ${(item.qty * item.price).toFixed(2)}\n`;
        }
      });

      waMsg += `------------------------------------\n`;
      waMsg += `🥛 Total Milk Volume: *${rec.totalLitres.toFixed(2)} Litres*\n`;
      waMsg += `💰 Grand Total Amount: *Rs. ${rec.totalRevenue.toFixed(2)}*\n`;
      if (rec.paymentStatus === 'Partial') {
        waMsg += `✅ Amount Paid: *Rs. ${rec.amountPaid.toFixed(2)}*\n`;
        waMsg += `⚠️ Remaining Balance Due: *Rs. ${rec.dueBalance.toFixed(2)}*\n`;
      } else if (rec.paymentStatus === 'Pending') {
        waMsg += `⚠️ Outstanding Balance Due: *Rs. ${rec.dueBalance.toFixed(2)}*\n`;
      } else {
        waMsg += `✅ Paid in Full\n`;
      }
      waMsg += `------------------------------------\n`;
      waMsg += `Thank you for choosing Happy Family Farms! 🥛🌱`;

      let cleanPhone = custPhone !== 'N/A' ? custPhone.replace(/\D/g, '') : '';
      if (cleanPhone.length === 10) cleanPhone = '94' + cleanPhone;
      const url = cleanPhone 
        ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(waMsg)}` 
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`;
      window.open(url, '_blank');
    };
  }

  modal.classList.add('active');
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  if (modal) modal.classList.remove('active');
}

// EDIT RECORD FUNCTION
function editRecord(id) {
  const rec = appState.records.find(r => r.id === id);
  if (!rec) return;

  const dateElem = document.getElementById('entryDate');
  if (dateElem) {
    dateElem.value = rec.date;
    checkAndLoadDateRecord(rec.date);
  }
  const tabBtn = document.querySelector('[data-tab="daily-entry"]');
  if (tabBtn) tabBtn.click();
}

function deleteRecord(id) {
  if (confirm('Delete this record entry?')) {
    appState.records = appState.records.filter(r => r.id !== id);
    saveState();
    renderApp();
  }
}

// Render Charts
function renderCharts(recordsInput) {
  const records = (recordsInput || appState.records.map(calculateRecord)).slice().reverse();

  const dates = records.map(r => r.date);
  const revenues = records.map(r => r.totalRevenue);
  const expenses = records.map(r => r.totalExpenses);
  const profits = records.map(r => r.netProfit);

  const canvasFin = document.getElementById('chartFinancials');
  if (!canvasFin) return;
  const ctxFin = canvasFin.getContext('2d');
  if (chartFinancials) chartFinancials.destroy();

  chartFinancials = new Chart(ctxFin, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Revenue (Rs.)',
          data: revenues,
          backgroundColor: '#14b8a6',
          borderRadius: 4
        },
        {
          label: 'Expenses (Rs.)',
          data: expenses,
          backgroundColor: '#f43f5e',
          borderRadius: 4
        },
        {
          label: 'Net Profit (Rs.)',
          data: profits,
          type: 'line',
          borderColor: '#10b981',
          borderWidth: 3,
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8' } }
      },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
      }
    }
  });

  let cattleRev = 0, goatRev = 0;
  records.forEach(r => {
    cattleRev += r.cattleRev;
    goatRev += r.goatRev;
  });

  const canvasCust = document.getElementById('chartCustomerBreakdown');
  if (!canvasCust) return;
  const ctxCust = canvasCust.getContext('2d');
  if (chartCustomerBreakdown) chartCustomerBreakdown.destroy();

  chartCustomerBreakdown = new Chart(ctxCust, {
    type: 'doughnut',
    data: {
      labels: ['Cow Milk Revenue (Rs.)', 'Goat Milk Revenue (Rs.)'],
      datasets: [{
        data: [cattleRev, goatRev],
        backgroundColor: ['#14b8a6', '#818cf8'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8' } }
      }
    }
  });
}

// Export to Excel using SheetJS
function exportToExcel() {
  const processedRecords = appState.records.map(calculateRecord);

  const expHeaders = ["Expense ID", "Expense Date", "Expense Category", "Supplier / Worker", "Amount Paid (Rs.)", "Remarks / Notes"];
  const expRows = (appState.expenses || []).map(e => [
    e.id, e.date, e.category, e.name || '', e.amount, e.remarks || ''
  ]);
  const expenseDirectoryData = [expHeaders, ...expRows];

  const custHeaders = ["Customer ID", "Customer Name", "Milk Preference", "Customer Category", "Phone Number", "Delivery Address / Route", "Cow Defaults (175/475/500/750/1L)", "Goat Defaults (175/475/500/750/1L)", "Status"];
  const custRows = appState.customers.map(c => [
    c.id, c.name, c.milkType || 'Both (Cow & Goat)', c.type, c.phone, c.address,
    `${c.regCattle175||0}/${c.regCattle475||0}/${c.regCattle500||0}/${c.regCattle750||0}/${c.regCattle1000||0}`,
    `${c.regGoat175||0}/${c.regGoat475||0}/${c.regGoat500||0}/${c.regGoat750||0}/${c.regGoat1000||0}`,
    c.status
  ]);
  const registeredCustData = [custHeaders, ...custRows];

  const cattleRates = (appState.rates && appState.rates.cattle) ? appState.rates.cattle : DEFAULT_RATES.cattle;
  const goatRates = (appState.rates && appState.rates.goat) ? appState.rates.goat : DEFAULT_RATES.goat;

  const settingsData = [
    ["Milk Category", "175ml Rate (Rs.)", "475ml Rate (Rs.)", "500ml Rate (Rs.)", "750ml Rate (Rs.)", "1000ml Rate (Rs.)"],
    ["Cow Milk", cattleRates.rate175, cattleRates.rate475, cattleRates.rate500, cattleRates.rate750, cattleRates.rate1000],
    ["Goat Milk", goatRates.rate175, goatRates.rate475, goatRates.rate500, goatRates.rate750, goatRates.rate1000]
  ];

  const trackerHeader = [
    "Date", "Customer Type", "Customer / Note",
    "Cow 175ml", "Cow 475ml", "Cow 500ml", "Cow 750ml", "Cow 1L", "Cow Litres", "Cow Rev (Rs.)",
    "Goat 175ml", "Goat 475ml", "Goat 500ml", "Goat 750ml", "Goat 1L", "Goat Litres", "Goat Rev (Rs.)",
    "Total Litres", "Total Revenue (Rs.)",
    "Silage Cost (Rs.)", "Grass Wage (Rs.)", "Feed/Punnaku (Rs.)", "Other Expense (Rs.)", "Total Expenses (Rs.)",
    "Net Profit (Rs.)", "Remarks"
  ];

  const trackerRows = processedRecords.map(r => [
    r.date, r.custType, r.custName || '',
    r.cattle_q175, r.cattle_q475, r.cattle_q500, r.cattle_q750, r.cattle_q1000, r.cattleLitres, r.cattleRev,
    r.goat_q175, r.goat_q475, r.goat_q500, r.goat_q750, r.goat_q1000, r.goatLitres, r.goatRev,
    r.totalLitres, r.totalRevenue,
    r.silage, r.wage, r.feed, r.other, r.totalExpenses,
    r.netProfit, r.remarks || ''
  ]);

  const trackerData = [trackerHeader, ...trackerRows];

  let cattleRev = 0, cattleLitres = 0;
  let goatRev = 0, goatLitres = 0;

  processedRecords.forEach(r => {
    cattleRev += r.cattleRev; cattleLitres += r.cattleLitres;
    goatRev += r.goatRev; goatLitres += r.goatLitres;
  });

  const totRevAll = cattleRev + goatRev;

  const categorySummaryData = [
    ["Milk Category Performance Summary"],
    ["Milk Category", "Total Litres Sold", "Total Revenue Generated (Rs.)", "Revenue Share %"],
    ["Cow Milk", cattleLitres, cattleRev, totRevAll > 0 ? (cattleRev/totRevAll) : 0],
    ["Goat Milk", goatLitres, goatRev, totRevAll > 0 ? (goatRev/totRevAll) : 0]
  ];

  const wb = XLSX.utils.book_new();

  const wsExpenses = XLSX.utils.aoa_to_sheet(expenseDirectoryData);
  const wsCustomers = XLSX.utils.aoa_to_sheet(registeredCustData);
  const wsRates = XLSX.utils.aoa_to_sheet(settingsData);
  const wsTracker = XLSX.utils.aoa_to_sheet(trackerData);
  const wsSummary = XLSX.utils.aoa_to_sheet(categorySummaryData);

  XLSX.utils.book_append_sheet(wb, wsExpenses, "Expense Directory");
  XLSX.utils.book_append_sheet(wb, wsCustomers, "Registered Customers");
  XLSX.utils.book_append_sheet(wb, wsTracker, "Daily Tracker");
  XLSX.utils.book_append_sheet(wb, wsSummary, "Milk Category Summary");
  XLSX.utils.book_append_sheet(wb, wsRates, "Rates & Settings");

  XLSX.writeFile(wb, "Happy_Family_Farms_Expense_And_Revenue_Tracker.xlsx");
}
