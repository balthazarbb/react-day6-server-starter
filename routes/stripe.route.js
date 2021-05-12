const router = require("express").Router();

const stripe = require("stripe")("sk_test_51IpuK9IeCP9sflTKn89B5sQhGPohPUSx9eq0UMBej11pQVbj8d9ZAuxdSeFC3OLYUSN7Z4a5zrzElUHgDmenk2CD00wNPJet2h");

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});


module.exports = router;