const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');
const FinancialTransactionService = require('../../services/FinancialTransactionService');

const generateStatementPDF = async (req, res) => {
  const { userId } = req.params;

  // Fetch user's transactions from the database
  const transactions = await FinancialTransactionService.getTransactionsByUserId(userId);

  // Create a new PDF document
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `statement_${userId}.pdf`);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Add title
  doc.fontSize(25).text('Statement', { align: 'center' });
  doc.moveDown();

  // Add table headers
  const tableTop = 100;
  const itemCodeX = 50;
  const descriptionX = 150;
  const amountX = 250;
  const categoryX = 350;
  const dateX = 450;

  doc.fontSize(10).text('Date', dateX, tableTop);
  doc.fontSize(10).text('Type', itemCodeX, tableTop);
  doc.fontSize(10).text('Amount', amountX, tableTop);
  doc.fontSize(10).text('Category', categoryX, tableTop);
  doc.fontSize(10).text('Description', descriptionX, tableTop);

  // Draw table rows
  const rowHeight = 20;
  let y = tableTop + rowHeight;

  transactions.forEach(transaction => {
    doc.fontSize(10).text(new Date(transaction.transactionDate).toISOString().split('T')[0], dateX, y);
    doc.fontSize(10).text(transaction.type, itemCodeX, y);
    doc.fontSize(10).text(transaction.amount, amountX, y);
    doc.fontSize(10).text(transaction.category, categoryX, y);
    doc.fontSize(10).text(transaction.description, descriptionX, y);
    y += rowHeight;
  });

  doc.end();

  // Wait for the file to be fully written before sending the response
  writeStream.on('finish', () => {
    res.status(200).json({ filePath });
  });

  writeStream.on('error', (err) => {
    res.status(500).json({ error: 'Error generating PDF' });
  });
};

const generateStatementExcel = async (req, res) => {
  const { userId } = req.params;

  // Fetch user's transactions from the database
  const transactions = await FinancialTransactionService.getTransactionsByUserId(userId);

  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Statement');

  // Add columns
  worksheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Type', key: 'type', width: 10 },
    { header: 'Amount', key: 'amount', width: 10 },
    { header: 'Category', key: 'category', width: 15 },
    { header: 'Description', key: 'description', width: 30 },
  ];

  // Add rows
  transactions.forEach(transaction => {
    worksheet.addRow({
      date: new Date(transaction.transactionDate).toISOString().split('T')[0],
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
    });
  });

  const filePath = path.join(__dirname, `statement_${userId}.xlsx`);
  await workbook.xlsx.writeFile(filePath);

  // Send the file path to the frontend
  res.status(200).json({ filePath });
};


const sendStatementEmail = async (req, res) => {
  const { userId, email, format } = req.body;

  // Generate the statement file based on the format (PDF or Excel)
  let filePath;
  const mockRes = {
    status: (code) => ({
      json: (data) => { filePath = data.filePath; }
    })
  };

  if (format === 'pdf') {
    await generateStatementPDF({ params: { userId } }, mockRes);
  } else {
    await generateStatementExcel({ params: { userId } }, mockRes);
  }

  // Ensure the file path was generated correctly
  if (!filePath) {
    return res.status(500).json({ error: 'Error generating file' });
  }

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cs35lproject.fruit17@gmail.com',
      pass: 'oqhi bsdw tnrp rbpd', // Use the App Password here
    },
  });

  let extension = "";
  if (format === "excel")
    extension = "xlsx"
  else
    extension = "pdf"

  // Setup email data
  const mailOptions = {
    from: 'cs35lproject.fruit17@gmail.com',
    to: email,
    subject: 'Your Statement from Budget Buddy',
    text: 'Please find your statement attached.',
    attachments: [
      {
        filename: `statement_${userId}.${extension}`,
        path: filePath,
      },
    ],
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
};

module.exports = {
  generateStatementPDF,
  generateStatementExcel,
  sendStatementEmail
};
