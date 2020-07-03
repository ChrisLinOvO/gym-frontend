import { navBarActionTypes } from "./navBar-action-type";

const INITIAL_STATE = {
  navLink: {
    shop: [
      { linkRoute: "/shop/men", name: "男士系列" },
      { linkRoute: "/shop/women", name: "女士系列" },
      { linkRoute: "/shop/food", name: "食品系列" },
    ],
  },
  navChoose: [],
};

const navBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case navBarActionTypes.NAV_BAR_SELECT:
      return {
        ...state,
        navChoose: [...state.navLink[action.payload]],
      };
    default:
      return state;
  }
};

export default navBarReducer;
