const twilio = require('twilio');

const accountSid = 'US4cfdd89ffd6c84e0e4ea14c5557937a8';
const authToken = '37e58153e3e269ce97d05a9117eb3d3d';
const client = twilio(accountSid, authToken);

const FROM_NUMBER = '+12722228850';

async function makeCall(toNumber) {
  return await client.calls.create({
    url: 'https://addweb-ai-caller.onrender.com/voice',
    to: toNumber,
    from: FROM_NUMBER,
  });
}

module.exports = { makeCall };
