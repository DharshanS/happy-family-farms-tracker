const ExcelJS = require('exceljs');
const path = require('path');

async function buildFarmExcelWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Happy Family Farms';
  workbook.lastModifiedBy = 'Happy Family Farms';
  workbook.created = new Date();
  workbook.modified = new Date();

  const primaryHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  const revenueHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D9488' } };
  const expenseHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBE123C' } };
  const summaryHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4338CA' } };
  const customerHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const headerFont = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };

  const currencyFmt = '"Rs. "#,##0.00;("Rs. "#,##0.00);"-"';

  // ----------------------------------------------------
  // SHEET 1: Separate Daily Farm Expense Directory
  // ----------------------------------------------------
  const expenseSheet = workbook.addWorksheet('Expense Directory', { views: [{ showGridLines: true }] });
  expenseSheet.columns = [
    { header: 'Expense ID', key: 'id', width: 15 },
    { header: 'Date', key: 'date', width: 14 },
    { header: 'Expense Category', key: 'category', width: 22 },
    { header: 'Supplier / Worker / Note', key: 'name', width: 28 },
    { header: 'Amount Paid (Rs.)', key: 'amount', width: 20 },
    { header: 'Remarks / Notes', key: 'remarks', width: 32 }
  ];

  expenseSheet.getRow(1).height = 28;
  expenseSheet.getRow(1).eachCell(cell => {
    cell.fill = expenseHeaderFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const sampleExpenses = [
    ['EXP-101', '2026-09-01', 'Silage', 'Green Fodder Supplier', 1200.00, 'Silage tractor load'],
    ['EXP-102', '2026-09-01', 'Grass Cutter Wage', 'Murugan (Worker)', 600.00, 'Daily grass cutting wage'],
    ['EXP-103', '2026-09-01', 'Feed / Punnaku', 'Lakshmi Feed Store', 450.00, '50kg Oil cake bag'],
    ['EXP-104', '2026-09-01', 'Other Expense', 'Veterinary Doctor', 100.00, 'Cow health checkup'],
    ['EXP-105', '2026-09-02', 'Grass Cutter Wage', 'Murugan (Worker)', 600.00, 'Daily wage'],
    ['EXP-106', '2026-09-02', 'Feed / Punnaku', 'Lakshmi Feed Store', 450.00, '50kg Oil cake bag'],
    ['EXP-107', '2026-09-03', 'Grass Cutter Wage', 'Murugan (Worker)', 600.00, 'Daily wage'],
    ['EXP-108', '2026-09-03', 'Feed / Punnaku', 'Cow Store', 500.00, 'Punnaku bag'],
    ['EXP-109', '2026-09-04', 'Silage', 'Fodder Supplier', 1200.00, 'New silage batch']
  ];

  sampleExpenses.forEach((exp) => {
    const r = expenseSheet.addRow({
      id: exp[0],
      date: exp[1],
      category: exp[2],
      name: exp[3],
      amount: exp[4],
      remarks: exp[5]
    });
    r.height = 20;
    r.getCell(1).alignment = { horizontal: 'center' };
    r.getCell(2).alignment = { horizontal: 'center' };
    r.getCell(5).numFmt = currencyFmt;
    r.eachCell(cell => cell.border = thinBorder);
  });

  // ----------------------------------------------------
  // SHEET 2: Registered Customers
  // ----------------------------------------------------
  const customerSheet = workbook.addWorksheet('Registered Customers', { views: [{ showGridLines: true }] });
  customerSheet.columns = [
    { header: 'Customer ID', key: 'id', width: 15 },
    { header: 'Customer Name', key: 'name', width: 25 },
    { header: 'Milk Category', key: 'milk_type', width: 16 },
    { header: 'Customer Type', key: 'type', width: 18 },
    { header: 'Phone Number', key: 'phone', width: 16 },
    { header: 'Delivery Route / Address', key: 'address', width: 30 },
    { header: 'Def 175ml', key: 'def175', width: 12 },
    { header: 'Def 475ml', key: 'def475', width: 12 },
    { header: 'Def 500ml', key: 'def500', width: 12 },
    { header: 'Def 750ml', key: 'def750', width: 12 },
    { header: 'Def 1L', key: 'def1000', width: 12 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Total Litres Bought', key: 'tot_litres', width: 20 },
    { header: 'Total Revenue (Rs.)', key: 'tot_rev', width: 22 }
  ];

  customerSheet.getRow(1).height = 28;
  customerSheet.getRow(1).eachCell(cell => {
    cell.fill = customerHeaderFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const registeredCustomers = [
    ['CUST-101', 'Dharshan', 'Cow Milk', 'Daily Customer', '0764805061', 'Route 1 - Green Valley', 0, 1, 0, 2, 1, 'Active'],
    ['CUST-102', 'Hotel Royal Milk Account', 'Cow Milk', 'Monthly Customer', '9845012345', 'Main Street Market #45', 10, 10, 5, 20, 15, 'Active'],
    ['CUST-103', 'Sita Lakshmi', 'Goat Milk', 'Daily Customer', '9988776655', 'Route 2 - Lakeview Homes', 2, 1, 0, 1, 0, 'Active'],
    ['CUST-104', 'City Sweets & Bakery', 'Cow Milk', 'Monthly Customer', '9776655443', 'Bypass Road #12', 0, 0, 20, 30, 25, 'Active'],
    ['CUST-105', 'Spot Walk-in Buyers', 'Goat Milk', 'Time-Being', 'N/A', 'Farm Gate Direct', 0, 0, 0, 0, 0, 'Active']
  ];

  registeredCustomers.forEach((c, idx) => {
    const rowIdx = idx + 2;
    const r = customerSheet.addRow({
      id: c[0],
      name: c[1],
      milk_type: c[2],
      type: c[3],
      phone: c[4],
      address: c[5],
      def175: c[6],
      def475: c[7],
      def500: c[8],
      def750: c[9],
      def1000: c[10],
      status: c[11],
      tot_litres: { formula: `SUMIF('Daily Tracker'!D2:D100, B${rowIdx}, 'Daily Tracker'!J2:J100)` },
      tot_rev: { formula: `SUMIF('Daily Tracker'!D2:D100, B${rowIdx}, 'Daily Tracker'!P2:P100)` }
    });
    r.height = 20;
    r.getCell(1).alignment = { horizontal: 'center' };
    r.getCell(3).alignment = { horizontal: 'center' };
    r.getCell(4).alignment = { horizontal: 'center' };
    r.getCell(5).alignment = { horizontal: 'center' };
    r.getCell(12).alignment = { horizontal: 'center' };
    r.getCell(13).numFmt = '#,##0.00 "L"';
    r.getCell(14).numFmt = currencyFmt;
    r.eachCell(cell => cell.border = thinBorder);
  });

  // ----------------------------------------------------
  // SHEET 3: Master Daily Financial Tracker
  // ----------------------------------------------------
  const trackerSheet = workbook.addWorksheet('Daily Tracker', { views: [{ showGridLines: true }] });
  const columnsDef = [
    { header: 'Date', key: 'date', width: 13 },
    { header: 'Milk Category', key: 'milk_type', width: 16 },
    { header: 'Customer Type', key: 'cust_type', width: 18 },
    { header: 'Registered Customer', key: 'cust_name', width: 25 },
    { header: '175ml (Qty)', key: 'q175', width: 12 },
    { header: '475ml (Qty)', key: 'q475', width: 12 },
    { header: '500ml (Qty)', key: 'q500', width: 12 },
    { header: '750ml (Qty)', key: 'q750', width: 12 },
    { header: '1000ml (Qty)', key: 'q1000', width: 12 },
    { header: 'Total Litres', key: 'tot_litres', width: 14 },
    { header: 'Rev 175ml (Rs.)', key: 'rev175', width: 15 },
    { header: 'Rev 475ml (Rs.)', key: 'rev475', width: 15 },
    { header: 'Rev 500ml (Rs.)', key: 'rev500', width: 15 },
    { header: 'Rev 750ml (Rs.)', key: 'rev750', width: 15 },
    { header: 'Rev 1000ml (Rs.)', key: 'rev1000', width: 15 },
    { header: 'Total Revenue (Rs.)', key: 'tot_rev', width: 18 },
    { header: 'Silage Cost (Rs.)', key: 'exp_silage', width: 16 },
    { header: 'Grass Cutter Wage (Rs.)', key: 'exp_wage', width: 20 },
    { header: 'Feed / Punnaku (Rs.)', key: 'exp_feed', width: 18 },
    { header: 'Other Expense (Rs.)', key: 'exp_other', width: 18 },
    { header: 'Total Expenses (Rs.)', key: 'tot_exp', width: 18 },
    { header: 'Net Profit / Loss (Rs.)', key: 'net_profit', width: 20 },
    { header: 'Remarks', key: 'remarks', width: 25 }
  ];

  trackerSheet.columns = columnsDef;
  const headerRow = trackerSheet.getRow(1);
  headerRow.height = 28;

  headerRow.eachCell((cell, colNum) => {
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    if (colNum === 1 || colNum === 23) cell.fill = primaryHeaderFill;
    else if (colNum >= 2 && colNum <= 4) cell.fill = customerHeaderFill;
    else if (colNum >= 5 && colNum <= 16) cell.fill = revenueHeaderFill;
    else if (colNum >= 17 && colNum <= 21) cell.fill = expenseHeaderFill;
    else if (colNum === 22) cell.fill = summaryHeaderFill;
  });

  const sampleData = [
    { date: '2026-09-07', milkType: 'Cow Milk', custType: 'Daily Customer', custName: 'Route 1 & Spot Sales', q175: 10, q475: 20, q500: 15, q750: 44, q1000: 34, silage: 0, wage: 600, feed: 460, other: 0, remarks: 'Today total farm record' },
    { date: '2026-09-06', milkType: 'Goat Milk', custType: 'Daily Customer', custName: 'Sita Lakshmi & Goat Milk Clients', q175: 12, q475: 10, q500: 8, q750: 15, q1000: 5, silage: 0, wage: 600, feed: 450, other: 0, remarks: 'Weekend sales spurt' },
    { date: '2026-09-05', milkType: 'Cow Milk', custType: 'Time-Being', custName: 'Event & Walk-ins', q175: 5, q475: 32, q500: 10, q750: 42, q1000: 30, silage: 0, wage: 650, feed: 480, other: 120, remarks: 'Cutter overtime wage' },
    { date: '2026-09-04', milkType: 'Cow Milk', custType: 'Daily Customer', custName: 'Route 1 & City Sweets', q175: 8, q475: 28, q500: 12, q750: 38, q1000: 28, silage: 1200, wage: 600, feed: 450, other: 0, remarks: 'New silage batch bought' },
    { date: '2026-09-03', milkType: 'Goat Milk', custType: 'Monthly Customer', custName: 'City Sweets & Bakery', q175: 15, q475: 20, q500: 10, q750: 25, q1000: 10, silage: 0, wage: 600, feed: 500, other: 50, remarks: 'High 1L demand' }
  ];

  sampleData.forEach((item, index) => {
    const rowIdx = index + 2;
    const isGoat = item.milkType === 'Goat Milk';
    const rowCell = isGoat ? 'B' : 'B'; // Reference rate sheet

    const row = trackerSheet.addRow({
      date: item.date,
      milk_type: item.milkType,
      cust_type: item.custType,
      cust_name: item.custName,
      q175: item.q175,
      q475: item.q475,
      q500: item.q500,
      q750: item.q750,
      q1000: item.q1000,
      tot_litres: { formula: `(E${rowIdx}*0.175)+(F${rowIdx}*0.475)+(G${rowIdx}*0.5)+(H${rowIdx}*0.75)+(I${rowIdx}*1)` },
      rev175: { formula: `E${rowIdx}*IF(B${rowIdx}="Goat Milk",'Rates & Settings'!$C$3,'Rates & Settings'!$B$3)` },
      rev475: { formula: `F${rowIdx}*IF(B${rowIdx}="Goat Milk",'Rates & Settings'!$C$4,'Rates & Settings'!$B$4)` },
      rev500: { formula: `G${rowIdx}*IF(B${rowIdx}="Goat Milk",'Rates & Settings'!$C$5,'Rates & Settings'!$B$5)` },
      rev750: { formula: `H${rowIdx}*IF(B${rowIdx}="Goat Milk",'Rates & Settings'!$C$6,'Rates & Settings'!$B$6)` },
      rev1000: { formula: `I${rowIdx}*IF(B${rowIdx}="Goat Milk",'Rates & Settings'!$C$7,'Rates & Settings'!$B$7)` },
      tot_rev: { formula: `SUM(K${rowIdx}:O${rowIdx})` },
      exp_silage: item.silage,
      exp_wage: item.wage,
      exp_feed: item.feed,
      exp_other: item.other,
      tot_exp: { formula: `SUM(Q${rowIdx}:T${rowIdx})` },
      net_profit: { formula: `P${rowIdx}-U${rowIdx}` },
      remarks: item.remarks
    });

    row.height = 20;
    row.getCell(1).alignment = { horizontal: 'center' };
    row.getCell(2).alignment = { horizontal: 'center' };
    row.getCell(3).alignment = { horizontal: 'center' };
    row.getCell(5).numFmt = '#,##0';
    row.getCell(6).numFmt = '#,##0';
    row.getCell(7).numFmt = '#,##0';
    row.getCell(8).numFmt = '#,##0';
    row.getCell(9).numFmt = '#,##0';
    row.getCell(10).numFmt = '#,##0.00 "L"';
    
    for (let c = 11; c <= 22; c++) row.getCell(c).numFmt = currencyFmt;

    row.eachCell((cell) => cell.border = thinBorder);
  });

  // Total Summary Row
  const totalRowIdx = trackerSheet.rowCount + 1;
  const totalRow = trackerSheet.addRow({
    date: 'TOTAL',
    milk_type: '',
    cust_type: '',
    cust_name: 'All Categories',
    q175: { formula: `SUM(E2:E${totalRowIdx-1})` },
    q475: { formula: `SUM(F2:F${totalRowIdx-1})` },
    q500: { formula: `SUM(G2:G${totalRowIdx-1})` },
    q750: { formula: `SUM(H2:H${totalRowIdx-1})` },
    q1000: { formula: `SUM(I2:I${totalRowIdx-1})` },
    tot_litres: { formula: `SUM(J2:J${totalRowIdx-1})` },
    rev175: { formula: `SUM(K2:K${totalRowIdx-1})` },
    rev475: { formula: `SUM(L2:L${totalRowIdx-1})` },
    rev500: { formula: `SUM(M2:M${totalRowIdx-1})` },
    rev750: { formula: `SUM(N2:N${totalRowIdx-1})` },
    rev1000: { formula: `SUM(O2:O${totalRowIdx-1})` },
    tot_rev: { formula: `SUM(P2:P${totalRowIdx-1})` },
    exp_silage: { formula: `SUM(Q2:Q${totalRowIdx-1})` },
    exp_wage: { formula: `SUM(R2:R${totalRowIdx-1})` },
    exp_feed: { formula: `SUM(S2:S${totalRowIdx-1})` },
    exp_other: { formula: `SUM(T2:T${totalRowIdx-1})` },
    tot_exp: { formula: `SUM(U2:U${totalRowIdx-1})` },
    net_profit: { formula: `SUM(V2:V${totalRowIdx-1})` },
    remarks: 'Grand Total'
  });

  totalRow.height = 24;
  totalRow.eachCell((cell, colIndex) => {
    cell.font = { name: 'Calibri', size: 11, bold: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
    cell.border = {
      top: { style: 'double', color: { argb: 'FF334155' } },
      bottom: { style: 'double', color: { argb: 'FF334155' } }
    };
    if (colIndex === 10) cell.numFmt = '#,##0.00 "L"';
    else if (colIndex >= 11 && colIndex <= 22) cell.numFmt = currencyFmt;
  });

  // ----------------------------------------------------
  // SHEET 4: Milk Category & Monthly Summary
  // ----------------------------------------------------
  const summarySheet = workbook.addWorksheet('Milk Category Summary', { views: [{ showGridLines: true }] });

  summarySheet.mergeCells('A1:D1');
  const catTitleCell = summarySheet.getCell('A1');
  catTitleCell.value = 'Milk Category Performance Summary';
  catTitleCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  catTitleCell.fill = summaryHeaderFill;
  catTitleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  summarySheet.getRow(1).height = 28;

  const catHeaders = summarySheet.addRow(['Milk Category', 'Total Litres Sold', 'Total Revenue Generated (Rs.)', 'Revenue Share %']);
  catHeaders.font = headerFont;
  catHeaders.eachCell(c => c.fill = primaryHeaderFill);

  const milkCategories = [
    { name: 'Cow Milk', rangeFormulaLitres: `SUMIF('Daily Tracker'!B2:B${totalRowIdx-1}, "Cow Milk", 'Daily Tracker'!J2:J${totalRowIdx-1})`, rangeFormulaRev: `SUMIF('Daily Tracker'!B2:B${totalRowIdx-1}, "Cow Milk", 'Daily Tracker'!P2:P${totalRowIdx-1})` },
    { name: 'Goat Milk', rangeFormulaLitres: `SUMIF('Daily Tracker'!B2:B${totalRowIdx-1}, "Goat Milk", 'Daily Tracker'!J2:J${totalRowIdx-1})`, rangeFormulaRev: `SUMIF('Daily Tracker'!B2:B${totalRowIdx-1}, "Goat Milk", 'Daily Tracker'!P2:P${totalRowIdx-1})` }
  ];

  milkCategories.forEach((cat, idx) => {
    const rowNum = idx + 3;
    const r = summarySheet.addRow([
      cat.name,
      { formula: cat.rangeFormulaLitres },
      { formula: cat.rangeFormulaRev },
      { formula: `IF(C${rowNum}>0, C${rowNum}/SUM($C$3:$C$4), 0)` }
    ]);
    r.getCell(2).numFmt = '#,##0.00 "L"';
    r.getCell(3).numFmt = currencyFmt;
    r.getCell(4).numFmt = '0.0%';
    r.eachCell(c => c.border = thinBorder);
  });

  summarySheet.columns = [
    { width: 24 }, { width: 18 }, { width: 25 }, { width: 16 }
  ];

  // ----------------------------------------------------
  // SHEET 5: Rates & Settings
  // ----------------------------------------------------
  const settingsSheet = workbook.addWorksheet('Rates & Settings', { views: [{ showGridLines: true }] });
  settingsSheet.columns = [
    { header: 'Bottle Size / Item', key: 'size', width: 25 },
    { header: 'Cow Milk Rate (Rs.)', key: 'cattle', width: 25 },
    { header: 'Goat Milk Rate (Rs.)', key: 'goat', width: 25 },
    { header: 'Unit / Measure', key: 'unit', width: 20 },
    { header: 'Notes & Instructions', key: 'notes', width: 40 }
  ];

  settingsSheet.getRow(1).eachCell((cell) => {
    cell.fill = primaryHeaderFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const ratesData = [
    ['175ml Bottle Selling Price', 15.00, 25.00, 'Per Bottle (0.175 L)', 'Editable: Unit price for 175ml bottle'],
    ['475ml Bottle Selling Price', 35.00, 60.00, 'Per Bottle (0.475 L)', 'Editable: Unit price for 475ml bottle'],
    ['500ml Bottle Selling Price', 38.00, 65.00, 'Per Bottle (0.500 L)', 'Editable: Unit price for 500ml bottle'],
    ['750ml Bottle Selling Price', 50.00, 90.00, 'Per Bottle (0.750 L)', 'Editable: Unit price for 750ml bottle'],
    ['1000ml (1L) Bottle Selling Price', 65.00, 120.00, 'Per Bottle (1.000 L)', 'Editable: Unit price for 1000ml (1L) bottle']
  ];

  ratesData.forEach((row) => {
    const addedRow = settingsSheet.addRow(row);
    addedRow.getCell(2).numFmt = currencyFmt;
    addedRow.getCell(3).numFmt = currencyFmt;
    addedRow.eachCell((cell) => cell.border = thinBorder);
  });

  const filePath1 = path.join('/home/dharshan/.gemini/antigravity/scratch/farm_expense_tracker', 'Happy_Family_Farms_Expense_And_Revenue_Tracker.xlsx');
  const filePath2 = path.join('/home/dharshan/.gemini/antigravity/scratch/farm_expense_tracker', 'Farm_Expenses_And_Revenue_Tracker.xlsx');
  await workbook.xlsx.writeFile(filePath1);
  await workbook.xlsx.writeFile(filePath2);
  console.log(`Excel file re-generated for Happy Family Farms (Cow & Goat Milk) at: ${filePath1}`);
}

buildFarmExcelWorkbook().catch(err => {
  console.error('Error generating excel:', err);
});
