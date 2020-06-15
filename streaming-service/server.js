'use strict';

/**
 * CONFIGURATION SETTINGS
 **/
let FETCH_INTERVAL = 5000;
let PRETTY_PRINT_JSON = true;

/**
 * START
 **/
let express = require('express');
let http = require('http');
let io = require('socket.io');
let cors = require('cors');
/*** init **/
let app = express();
app.use(cors());

let server = http.createServer(app);

let run = io.listen(server);// x
run.set('origins', '*:*');
// io.listen(server).set('origins', '*:*');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

run.sockets.on('connection', function(socket) {
  socket.on('ticker', function(ticker, delay) {
    trackTicker(socket, ticker, delay);
  });
});

server.listen(process.env.PORT || 4000);

function getRandomValBetween(min, max, precision) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 9007199254740992 : max;
  precision = precision === undefined ? 0 : precision;
  return (Math.random() * (max - min) + min).toFixed(precision);
}

function getUTCDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuote(socket, ticker) {
  // let dataObj;
  let quote = {
    'ticker': ticker,
    'exchange': 'NASDAQ',
    'price': getRandomValBetween(100, 300, 2),
    'change': getRandomValBetween(0, 200, 2),
    'change_percent': getRandomValBetween(0, 1, 2),
    'last_trade_time': getUTCDate(),
    'dividend': getRandomValBetween(0, 1, 2),
    'yield': getRandomValBetween(0, 2, 2)
  };

  socket.emit(ticker, PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
}

function trackTicker(socket, ticker) {
  console.log('track Ticker');
  // run the first time immediately
  getQuote(socket, ticker);
  // every N seconds
  const timer = setInterval(function() {
    getQuote(socket, ticker);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}



