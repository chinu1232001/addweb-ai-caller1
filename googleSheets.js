const { google } = require('googleapis');
const keys = require('../service-account.json');

const SHEET_ID = '1xQT5iN7O099ykvLLzdsKEzlLgg-TdmV_CLQFNJNBFOE';
const RANGE = 'Sheet1';

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth: client });

async function readSheetLeads() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  const leads = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][2]) {
      leads.push({ name: rows[i][0], phone: rows[i][1], row: i + 1 });
    }
  }
  return leads;
}

async function markLeadAsCalled(row) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `C${row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['Called']] },
  });
}

module.exports = { readSheetLeads, markLeadAsCalled };
