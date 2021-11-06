const Excel = require('exceljs');

// Create workbook & add worksheet
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('ExampleSheet');

// add column headers
worksheet.columns = [
  { header: 'Package', key: 'package_name' },
  { header: 'Author', key: 'author_name' },
];

// Add row using key mapping to columns
worksheet.addRow(
  { package_name: 'ABC', author_name: 'Author 1' },
  { package_name: 'XYZ', author_name: 'Author 2' }
);

// Add rows as Array values
worksheet.addRow(['BCD', 'Author Name 3']);

// Add rows using both the above of rows
const rows = [
  ['FGH', 'Author Name 4'],
  { package_name: 'PQR', author_name: 'Author 5' },
];

worksheet.addRows(rows);

// save workbook to disk
workbook.xlsx
  .writeFile('sample.xls')
  .then(() => {
    console.log('saved');
  })
  .catch((err) => {
    console.log('err', err);
  });
