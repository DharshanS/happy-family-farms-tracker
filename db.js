const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'farm_data.db');
const db = new sqlite3.Database(DB_FILE);

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
  { id: 'EXP-104', date: '2026-09-01', category: 'Other Expense', name: 'Veterinary Doctor', amount: 100.00, remarks: 'Cow health checkup' },
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
  }
];

function initDB() {
  db.serialize(() => {
    // 1. Tables
    db.run(`CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      milkType TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      regCattle175 INTEGER DEFAULT 0,
      regCattle475 INTEGER DEFAULT 0,
      regCattle500 INTEGER DEFAULT 0,
      regCattle750 INTEGER DEFAULT 0,
      regCattle1000 INTEGER DEFAULT 0,
      regGoat175 INTEGER DEFAULT 0,
      regGoat475 INTEGER DEFAULT 0,
      regGoat500 INTEGER DEFAULT 0,
      regGoat750 INTEGER DEFAULT 0,
      regGoat1000 INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Active'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS daily_records (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      custType TEXT NOT NULL,
      custName TEXT,
      paymentStatus TEXT DEFAULT 'Paid',
      amountPaid REAL DEFAULT 0.0,
      cattle_q175 INTEGER DEFAULT 0,
      cattle_q475 INTEGER DEFAULT 0,
      cattle_q500 INTEGER DEFAULT 0,
      cattle_q750 INTEGER DEFAULT 0,
      cattle_q1000 INTEGER DEFAULT 0,
      goat_q175 INTEGER DEFAULT 0,
      goat_q475 INTEGER DEFAULT 0,
      goat_q500 INTEGER DEFAULT 0,
      goat_q750 INTEGER DEFAULT 0,
      goat_q1000 INTEGER DEFAULT 0,
      silage REAL DEFAULT 0.0,
      wage REAL DEFAULT 0.0,
      feed REAL DEFAULT 0.0,
      other REAL DEFAULT 0.0,
      remarks TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      name TEXT,
      amount REAL NOT NULL,
      remarks TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rates (
      category TEXT PRIMARY KEY,
      rate175 REAL,
      rate475 REAL,
      rate500 REAL,
      rate750 REAL,
      rate1000 REAL
    )`);

    // 2. Seed Default Rates if empty
    db.get(`SELECT COUNT(*) AS count FROM rates`, (err, row) => {
      if (!err && row.count === 0) {
        db.run(`INSERT INTO rates (category, rate175, rate475, rate500, rate750, rate1000) VALUES ('cattle', ?, ?, ?, ?, ?)`, 
          [DEFAULT_RATES.cattle.rate175, DEFAULT_RATES.cattle.rate475, DEFAULT_RATES.cattle.rate500, DEFAULT_RATES.cattle.rate750, DEFAULT_RATES.cattle.rate1000]);
        db.run(`INSERT INTO rates (category, rate175, rate475, rate500, rate750, rate1000) VALUES ('goat', ?, ?, ?, ?, ?)`, 
          [DEFAULT_RATES.goat.rate175, DEFAULT_RATES.goat.rate475, DEFAULT_RATES.goat.rate500, DEFAULT_RATES.goat.rate750, DEFAULT_RATES.goat.rate1000]);
      }
    });

    // 3. Seed Default Customers if empty
    db.get(`SELECT COUNT(*) AS count FROM customers`, (err, row) => {
      if (!err && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO customers VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
        SAMPLE_CUSTOMERS.forEach(c => {
          stmt.run([c.id, c.name, c.type, c.milkType, c.phone, c.address, c.regCattle175, c.regCattle475, c.regCattle500, c.regCattle750, c.regCattle1000, c.regGoat175, c.regGoat475, c.regGoat500, c.regGoat750, c.regGoat1000, c.status]);
        });
        stmt.finalize();
      }
    });

    // 4. Seed Default Expenses if empty
    db.get(`SELECT COUNT(*) AS count FROM expenses`, (err, row) => {
      if (!err && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO expenses VALUES (?,?,?,?,?,?)`);
        SAMPLE_EXPENSES.forEach(e => {
          stmt.run([e.id, e.date, e.category, e.name, e.amount, e.remarks]);
        });
        stmt.finalize();
      }
    });

    // 5. Seed Default Daily Records if empty
    db.get(`SELECT COUNT(*) AS count FROM daily_records`, (err, row) => {
      if (!err && row.count === 0) {
        const stmt = db.prepare(`INSERT INTO daily_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
        SAMPLE_RECORDS.forEach(r => {
          stmt.run([r.id, r.date, r.custType, r.custName, r.paymentStatus, r.amountPaid, r.cattle_q175, r.cattle_q475, r.cattle_q500, r.cattle_q750, r.cattle_q1000, r.goat_q175, r.goat_q475, r.goat_q500, r.goat_q750, r.goat_q1000, r.silage, r.wage, r.feed, r.other, r.remarks]);
        });
        stmt.finalize();
      }
    });
  });
}

initDB();

module.exports = db;
