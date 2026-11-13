// Vercel Serverless Function entry point
process.env.VERCEL = '1';
const app = require('../server/server.js');

module.exports = app;
