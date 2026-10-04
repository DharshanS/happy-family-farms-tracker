-- SQL Schema for Happy Family Farms Dairy Management Tracker

-- 1. USERS & RBAC TABLE
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    color VARCHAR(20),
    allowed_tabs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REGISTERED CUSTOMERS DIRECTORY
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    milk_type VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    reg_cattle_175 INT DEFAULT 0,
    reg_cattle_475 INT DEFAULT 0,
    reg_cattle_500 INT DEFAULT 0,
    reg_cattle_750 INT DEFAULT 0,
    reg_cattle_1000 INT DEFAULT 0,
    reg_goat_175 INT DEFAULT 0,
    reg_goat_475 INT DEFAULT 0,
    reg_goat_500 INT DEFAULT 0,
    reg_goat_750 INT DEFAULT 0,
    reg_goat_1000 INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. DAILY MILK REVENUE & TRANSACTION RECORDS
CREATE TABLE IF NOT EXISTS daily_records (
    id VARCHAR(50) PRIMARY KEY,
    entry_date DATE NOT NULL,
    cust_type VARCHAR(50) NOT NULL,
    cust_name VARCHAR(100),
    payment_status VARCHAR(20) DEFAULT 'Paid',
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    cattle_q175 INT DEFAULT 0,
    cattle_q475 INT DEFAULT 0,
    cattle_q500 INT DEFAULT 0,
    cattle_q750 INT DEFAULT 0,
    cattle_q1000 INT DEFAULT 0,
    goat_q175 INT DEFAULT 0,
    goat_q475 INT DEFAULT 0,
    goat_q500 INT DEFAULT 0,
    goat_q750 INT DEFAULT 0,
    goat_q1000 INT DEFAULT 0,
    silage_cost DECIMAL(10,2) DEFAULT 0.00,
    wage_cost DECIMAL(10,2) DEFAULT 0.00,
    feed_cost DECIMAL(10,2) DEFAULT 0.00,
    other_cost DECIMAL(10,2) DEFAULT 0.00,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. STANDALONE FARM EXPENSES
CREATE TABLE IF NOT EXISTS expenses (
    id VARCHAR(20) PRIMARY KEY,
    expense_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    supplier_name VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. BOTTLE SELLING RATES MATRIX
CREATE TABLE IF NOT EXISTS rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category VARCHAR(20) NOT NULL,
    rate_175 DECIMAL(6,2) NOT NULL,
    rate_475 DECIMAL(6,2) NOT NULL,
    rate_500 DECIMAL(6,2) NOT NULL,
    rate_750 DECIMAL(6,2) NOT NULL,
    rate_1000 DECIMAL(6,2) NOT NULL
);
