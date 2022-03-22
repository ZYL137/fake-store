const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KJv1gGy4ZQV36EXkDISFDhCWcnjrNKalnBUqEgwDwtvTVQYfiiXckvlRfKZ5OI4ielzdnl8PjTDHi0d3Lm4Euga00OT0AA12r"
);

// 1) App config
const app = express();

// 2) Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// 3) Routes
app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log(`Payment RECEIVED!! The total is ${total}`);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// 4) Listening
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-76cf8/us-central1/api
