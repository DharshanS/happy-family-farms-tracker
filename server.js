const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// USER ACCOUNTS
const USER_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: 'Dharshan (Admin)', role: 'Admin', icon: '👑', color: '#10b981', allowedTabs: ['dashboard', 'customers', 'expenses', 'daily-entry', 'records', 'settings'] },
  { username: 'sales', password: 'sales123', name: 'Sales Representative', role: 'Sales', icon: '💼', color: '#f59e0b', allowedTabs: ['dashboard', 'customers', 'daily-entry', 'records'] },
  { username: 'operator', password: 'op123', name: 'Farm Operator', role: 'Operator', icon: '🚜', color: '#6366f1', allowedTabs: ['daily-entry', 'expenses'] }
];

// AUTH API
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const found = USER_ACCOUNTS.find(u => u.username === username && u.password === password);
  if (found) {
    const { password, ...userObj } = found;
    res.json({ success: true, user: userObj });
  } else {
    res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
});

// GET FULL STATE (Customers, Records, Expenses, Rates)
app.get('/api/state', (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM customers`, [], (err, customers) => {
      if (err) return res.status(500).json({ error: err.message });
      db.all(`SELECT * FROM daily_records ORDER BY date DESC`, [], (err, records) => {
        if (err) return res.status(500).json({ error: err.message });
        db.all(`SELECT * FROM expenses ORDER BY date DESC`, [], (err, expenses) => {
          if (err) return res.status(500).json({ error: err.message });
          db.all(`SELECT * FROM rates`, [], (err, ratesRows) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const rates = { cattle: {}, goat: {} };
            ratesRows.forEach(r => {
              rates[r.category] = {
                rate175: r.rate175, rate475: r.rate475, rate500: r.rate500, rate750: r.rate750, rate1000: r.rate1000
              };
            });

            res.json({ customers, records, expenses, rates });
          });
        });
      });
    });
  });
});

// CUSTOMERS API
app.get('/api/customers', (req, res) => {
  db.all(`SELECT * FROM customers`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/customers', (req, res) => {
  const c = req.body;
  const query = `INSERT INTO customers (
    id, name, type, milkType, phone, address,
    regCattle175, regCattle475, regCattle500, regCattle750, regCattle1000,
    regGoat175, regGoat475, regGoat500, regGoat750, regGoat1000,
    customCattle175, customCattle475, customCattle500, customCattle750, customCattle1000,
    customGoat175, customGoat475, customGoat500, customGoat750, customGoat1000,
    status
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [
    c.id, c.name, c.type, c.milkType, c.phone, c.address,
    c.regCattle175||0, c.regCattle475||0, c.regCattle500||0, c.regCattle750||0, c.regCattle1000||0,
    c.regGoat175||0, c.regGoat475||0, c.regGoat500||0, c.regGoat750||0, c.regGoat1000||0,
    c.customCattle175||0, c.customCattle475||0, c.customCattle500||0, c.customCattle750||0, c.customCattle1000||0,
    c.customGoat175||0, c.customGoat475||0, c.customGoat500||0, c.customGoat750||0, c.customGoat1000||0,
    c.status || 'Active'
  ];
  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, customer: c });
  });
});

app.put('/api/customers/:id', (req, res) => {
  const c = req.body;
  const query = `UPDATE customers SET name=?, type=?, milkType=?, phone=?, address=?,
    regCattle175=?, regCattle475=?, regCattle500=?, regCattle750=?, regCattle1000=?,
    regGoat175=?, regGoat475=?, regGoat500=?, regGoat750=?, regGoat1000=?,
    customCattle175=?, customCattle475=?, customCattle500=?, customCattle750=?, customCattle1000=?,
    customGoat175=?, customGoat475=?, customGoat500=?, customGoat750=?, customGoat1000=? WHERE id=?`;
  const params = [
    c.name, c.type, c.milkType, c.phone, c.address,
    c.regCattle175||0, c.regCattle475||0, c.regCattle500||0, c.regCattle750||0, c.regCattle1000||0,
    c.regGoat175||0, c.regGoat475||0, c.regGoat500||0, c.regGoat750||0, c.regGoat1000||0,
    c.customCattle175||0, c.customCattle475||0, c.customCattle500||0, c.customCattle750||0, c.customCattle1000||0,
    c.customGoat175||0, c.customGoat475||0, c.customGoat500||0, c.customGoat750||0, c.customGoat1000||0,
    req.params.id
  ];
  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/customers/:id', (req, res) => {
  db.run(`DELETE FROM customers WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// DAILY RECORDS API
app.get('/api/records', (req, res) => {
  db.all(`SELECT * FROM daily_records ORDER BY date DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/records', (req, res) => {
  const r = req.body;
  const query = `INSERT OR REPLACE INTO daily_records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [
    r.id, r.date, r.custType, r.custName, r.paymentStatus || 'Paid', r.amountPaid || 0,
    r.cattle_q175||0, r.cattle_q475||0, r.cattle_q500||0, r.cattle_q750||0, r.cattle_q1000||0,
    r.goat_q175||0, r.goat_q475||0, r.goat_q500||0, r.goat_q750||0, r.goat_q1000||0,
    r.silage||0, r.wage||0, r.feed||0, r.other||0, r.remarks || ''
  ];
  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, record: r });
  });
});

app.delete('/api/records/:id', (req, res) => {
  db.run(`DELETE FROM daily_records WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// EXPENSES API
app.get('/api/expenses', (req, res) => {
  db.all(`SELECT * FROM expenses ORDER BY date DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/expenses', (req, res) => {
  const e = req.body;
  const query = `INSERT INTO expenses VALUES (?,?,?,?,?,?)`;
  const params = [e.id, e.date, e.category, e.name, e.amount, e.remarks];
  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, expense: e });
  });
});

app.delete('/api/expenses/:id', (req, res) => {
  db.run(`DELETE FROM expenses WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// RATES API
app.put('/api/rates', (req, res) => {
  const { cattle, goat } = req.body;
  db.serialize(() => {
    if (cattle) {
      db.run(`UPDATE rates SET rate175=?, rate475=?, rate500=?, rate750=?, rate1000=? WHERE category='cattle'`,
        [cattle.rate175, cattle.rate475, cattle.rate500, cattle.rate750, cattle.rate1000]);
    }
    if (goat) {
      db.run(`UPDATE rates SET rate175=?, rate475=?, rate500=?, rate750=?, rate1000=? WHERE category='goat'`,
        [goat.rate175, goat.rate475, goat.rate500, goat.rate750, goat.rate1000]);
    }
    res.json({ success: true });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Happy Family Farms Server running on http://localhost:${PORT}`);
});
