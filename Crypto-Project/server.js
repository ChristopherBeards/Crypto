const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); //middleware
const request = require('request'); //middleware
const server = express();

server.use(bodyParser.json());
server.use(cors());

let PORT = 3030;

const STATUS_USER_ERROR = 422;


server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});


server.get('/compare', (req, res) => {
 let current = 0;
 let previous = 0;

 request('https://api.coindesk.com/v1/bpi/currentprice/USD.json', (error, response, body) => {
    let parseObject = JSON.parse(body);
    current = parseObject.bpi.USD.rate_float  
 
  });

  request('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday', (error, response, body) => {
    let parseObject = JSON.parse(body);
    previous = Object.values(parseObject.bpi); 
    previous = previous[0];
    let difference = current - previous;
    // console.log(previous - current)

    // const prices = {
    //   current: current,
    //   previous: previous[0]
    // }
    // result = null;
    // if (current > previous) {
    //   console.log(current, previous)
    //   result = 'The value has risen by $' + current - previous;
    // }
    // else {
    //   result = 'The value has fallen by $' + current - previous;
    // }
    // console.log(result)

    res.send({ current, previous, difference });
    // res.json({ current, previous: `${previous[0]}` });
  });
 
 
});
