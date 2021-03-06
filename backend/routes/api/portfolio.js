const express = require("express");
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const { Portfolio } = require("../../db/models");
const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { stockSymbol, shares, userId } = req.body;
    const stock = await Portfolio.portfolioAdd({ stockSymbol, shares, userId });
    // console.log(stock);
    return res.json({
      stock,
    });
  }),
);



router.get(
  '/',
  asyncHandler(async (req, res) => {
    const stocks = await Portfolio.findAll({
      where: {
        userId: 1,
      }
    });
    // console.log("++++++++++++++++++++++", stocks);
    res.send(stocks);
  }),
);

module.exports = router;
