const express = require("express");
const asyncHandler = require("express-async-handler");

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

module.exports = router;
