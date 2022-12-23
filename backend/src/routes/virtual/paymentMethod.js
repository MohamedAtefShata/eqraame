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
  const { card_number, cvv, card_expired, card_brand, amount } = req.body;

  virtual_cards.forEach((card) => {
    if (
      card_number === card.number &&
      card_expired === card.expired &&
      card_brand === card.brand &&
      cvv == card.cvv &&
      amount <= card.balance
    ) {
      return res.json({ msg: "succcuful added balance" });
    }
  });

  return res.status(406).json({ msg: "Error in charge" });
});

module.exports = router;
