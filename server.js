
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8101;
const server = http.createServer(app);
server.listen(port);