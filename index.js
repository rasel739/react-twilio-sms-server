const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

//Single Message Post Part

app.post("/singleMessage", (req, res) => {
  const singleMessageBody = req.body;

  twilio.messages
    .create({
      body: singleMessageBody.message,
      from: singleMessageBody.fromNumber,
      to: singleMessageBody.phoneNumber,
    })
    .then((messages) => res.send("Single Message Sent"))
    .catch((error) => res.send(error));
});

//Bulk Message Post Part

app.post("/bulkMessage", (req, res) => {
  const bulkMessageBody = req.body;
  const numbers = [bulkMessageBody.phoneNumber.split(",")];

  Promise.all(
    numbers.map((number) => {
      return twilio.messages.create({
        from: bulkMessageBody.fromMessageSid,
        to: number,
        body: bulkMessageBody.message,
      });
    })
  )
    .then((messages) => {
      res.send("Bulk Message Sent");
    })
    .catch((error) => res.send(error));
});

app.get("/", (req, res) => {
  res.send("Welcome to React Twilio SMS Sender app");
});

app.listen(port, () => {
  console.log("Start Twilio SMS Sender Project", port);
});
