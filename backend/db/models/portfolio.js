'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async portfolioAdd({ stockSymbol, shares, userId }) {
      const stock = await Portfolio.create({
        stockSymbol,
        shares,
        userId,
      });
      return stock;
      // return await Portfolio.scope('userId').findbyPk(userId);
    }
    
    
    static associate(models) {
      Portfolio.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Portfolio.init({
    stockSymbol: DataTypes.STRING,
    shares: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};