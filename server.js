const express = require('express');
const bodyParser = require('body-parser');
const { readSheetLeads, markLeadAsCalled } = require('./utils/googleSheets');
const { makeCall } = require('./utils/twilioCaller');

const app = express();
app.use(bodyParser.json());

app.get('/start-calls', async (req, res) => {
  try {
    const leads = await readSheetLeads();
    for (const lead of leads) {
      await makeCall(lead.phone);
      await markLeadAsCalled(lead.row);
    }
    res.send('All calls initiated!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error calling leads');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
