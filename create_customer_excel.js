const ExcelJS = require('exceljs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const CUSTOMERS_DATA = [
  { id: 'CUST-101', name: 'Helabojun', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales / Spot', status: 'Active' },
  { id: 'CUST-102', name: 'Goat Milk Sales', type: 'Daily Customer', milkType: 'Goat Milk Only', phone: 'N/A', address: 'Goat Milk Route', status: 'Active' },
  { id: 'CUST-103', name: 'Ayurveda', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Ayurveda Center', status: 'Active' },
  { id: 'CUST-104', name: 'Gamini', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' },
  { id: 'CUST-105', name: 'Lakeside', type: 'Weekly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Lakeside Area', status: 'Active' },
  { id: 'CUST-106', name: 'Mahaiyyawa', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Mahaiyyawa Route', status: 'Active' },
  { id: 'CUST-107', name: 'Arupola Hotel', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Arupola Route', status: 'Active' },
  { id: 'CUST-108', name: 'Karthik', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Town Route', status: 'Active' },
  { id: 'CUST-109', name: 'Logeshwaran', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-110', name: 'Praveen', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-111', name: 'Lekraj', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-112', name: 'Nursery', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-113', name: 'Mahendran', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-114', name: 'Ravi Ranjan Pandit', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-115', name: 'Wijesoriya', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-116', name: 'Vinayagamoorthy', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-117', name: 'Aadithya', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-118', name: 'Selvanayagi', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-119', name: 'Jeyachandrika', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-120', name: 'Safras', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-121', name: 'Yogesh', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-122', name: 'Uthpala Wickramasinghe', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-123', name: 'Sundar', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' },
  { id: 'CUST-124', name: 'Asgiriya', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Asgiriya Route', status: 'Active' },
  { id: 'CUST-125', name: 'Periya Samy (Dada)', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-126', name: 'Hardware', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-127', name: 'Ranga', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-128', name: 'Nithya', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-129', name: 'Pramod Sharma', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-130', name: 'Sathosa Thenna', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-131', name: 'Keerthana', type: 'Monthly Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Monthly Account', status: 'Active' },
  { id: 'CUST-132', name: 'Eb Ayya', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' },
  { id: 'CUST-133', name: 'Eb Akka', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' },
  { id: 'CUST-134', name: 'Pichamalwatta', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Pichamalwatta Route', status: 'Active' },
  { id: 'CUST-135', name: 'Vidhu', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' },
  { id: 'CUST-136', name: 'Ahiran', type: 'Daily Customer', milkType: 'Cow Milk Only', phone: 'N/A', address: 'Route Sales', status: 'Active' }
];

async function generateCustomerExcel() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Happy Family Farms';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Customer Master Directory', { views: [{ showGridLines: true }] });

  // Title Banner
  sheet.mergeCells('A1:G1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'HAPPY FAMILY FARMS - CUSTOMER MASTER DIRECTORY';
  titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet.getRow(1).height = 36;

  // Header Row
  const headerRow = sheet.addRow([
    'Customer ID',
    'Customer Name',
    'Payment Type',
    'Milk Type',
    'Phone Number',
    'Delivery Address / Notes',
    'Account Status'
  ]);
  headerRow.height = 28;

  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };
  const headerFont = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };

  headerRow.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = thinBorder;
  });

  // Populate Customer Data
  CUSTOMERS_DATA.forEach((c) => {
    const r = sheet.addRow([
      c.id,
      c.name,
      c.type,
      c.milkType,
      c.phone,
      c.address,
      c.status
    ]);
    r.height = 22;

    r.eachCell((cell, colIndex) => {
      cell.font = { name: 'Calibri', size: 11 };
      cell.border = thinBorder;
      if (colIndex === 1 || colIndex === 3 || colIndex === 4 || colIndex === 5 || colIndex === 7) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      }

      // Highlight Payment Type
      if (colIndex === 3) {
        if (c.type === 'Daily Customer') cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0D9488' } };
        else if (c.type === 'Weekly Customer') cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF4338CA' } };
        else if (c.type === 'Monthly Customer') cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFD97706' } };
      }
    });
  });

  sheet.columns = [
    { width: 16 }, // ID
    { width: 28 }, // Name
    { width: 20 }, // Payment Type
    { width: 22 }, // Milk Type
    { width: 18 }, // Phone
    { width: 30 }, // Address
    { width: 16 }  // Status
  ];

  const excelPath = path.join(__dirname, 'Customer_Master_List.xlsx');
  await workbook.xlsx.writeFile(excelPath);
  console.log(`Excel file created successfully: ${excelPath}`);

  // Populate SQLite database with these 36 customers
  const DB_FILE = path.join(__dirname, 'farm_data.db');
  const db = new sqlite3.Database(DB_FILE);

  db.serialize(() => {
    db.run(`DELETE FROM customers`, (err) => {
      if (err) console.error('Error clearing old customers:', err);
      const stmt = db.prepare(`INSERT INTO customers (id, name, type, milkType, phone, address, regCattle175, regCattle475, regCattle500, regCattle750, regCattle1000, regGoat175, regGoat475, regGoat500, regGoat750, regGoat1000, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
      CUSTOMERS_DATA.forEach(c => {
        stmt.run([c.id, c.name, c.type, c.milkType, c.phone, c.address, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, c.status]);
      });
      stmt.finalize(() => {
        console.log(`Inserted ${CUSTOMERS_DATA.length} clean customers into SQLite database.`);
      });
    });
  });
}

generateCustomerExcel().catch(console.error);
