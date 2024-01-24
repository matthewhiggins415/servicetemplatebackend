const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const color = require('colors');
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors({
  origin: true
}))
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
app.get('/', (req, res) => {
  res.json({ message: `here's process.env.NODE_ENV: ${process.env.NODE_ENV}` });
})

app.post('/contactFormSubmit', async (req, res, next) => {
  const ontraportUrl = `${process.env.ONTRAPORT_URL}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Api-Key': `${process.env.ONTRAPORT_API_KEY}`,
    'Api-Appid': `${process.env.ONTRAPORT_API_ID}`
  };

  const urlSearchParams = new URLSearchParams(req.body);
  const formDataString = urlSearchParams.toString();
  const payload = formDataString

  try {
      const apiResponse = await axios.post(ontraportUrl, payload, {headers: headers})

      if (apiResponse.status === 200) {
        console.log(apiResponse)
        res.json({ status: 200 })
      }
  } catch (error) {
      res.json({ errMsg: "something went wrong" })
  }
})


const port = process.env.PORT || 5000

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold))