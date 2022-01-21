const admin = require('firebase-admin');
require('dotenv').config();
// const serviceAccount = require('./serviceAccount.json');
const serviceAccount = JSON.parse(process.env.CLIENT_SECRET);
// console.log(serviceAccount.private_key.replace(/\\n/g, '\n'));
// console.log(serviceAccount);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;