const router = require("express").Router();

const virtual_cards = [
  {
    number: "4609-6995-4527-7762",
    cvv: 560,
    brand: "Visa",
    expired: "02/23",
    balance: 0,
  },
  {
    number: "1234-5678-9012-3456",
    cvv: 123,
    card_brand: "Visa",
    expired: "12/34",
    balance: 99999,
  },
  {
    number: "1234-5678-9012-3456",
    cvv: 123,
    brand: "MasterCard",
    expired: "12/34",
    balance: 99999,
  },
];

router.post("/creditcard", (req, res) => {
  card_number = req.body.card.number;
  cvv = req.body.card.cvv;
  card_expired = req.body.card.expired;
  card_brand = req.body.card.brand;
  amount = req.body.card.amount;

  let valid = false;
  virtual_cards.forEach((card) => {
    if (
      card_number === card.number &&
      card_expired === card.expired &&
      card_brand === card.brand &&
      cvv == card.cvv &&
      amount <= card.balance
    ) {
      valid = true;
    }
  });
  if (valid) return res.status(200).json({ msg: "succcuful added balance" });
  else return res.status(406).json({ msg: "Error in charge" });
});

module.exports = router;
