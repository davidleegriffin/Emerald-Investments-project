const GET_PORTFOLIO = 'portfolio/getPortfolio';

export const getPortfolio = (portfolio) => {
    return {
        type: GET_PORTFOLIO,
        payload: portfolio,
    };
};


const portfolioReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case GET_PORTFOLIO:
        newState = Object.assign({}, state);
        newState.portfolio = action.payload;
        return newState;
      default:
        return state;
    }
  };

  export default portfolioReducer;
