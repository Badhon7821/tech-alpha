import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //check if the item is already in the cart

      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //if exist
      if (existedItemIndex >= 0) {
        //increase quantity
        state.cartItems[existedItemIndex].cartQuantity += 1;
      } else {
        // add to cart
        const assembleItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(assembleItem);
      }
      //add to locale storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const updateCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = updateCartItem;

      //update data add to locale storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];
      //add to locale storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const decreaseItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[decreaseItemIndex].cartQuantity > 1) {
        state.cartItems[decreaseItemIndex].cartQuantity -= 1;
      } else if (state.cartItems[decreaseItemIndex].cartQuantity === 1) {
        const updatedCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = updatedCartItem;
      }

      //update data add to locale storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    getSubtotal(state, action) {
      const subtotal = state.cartItems.reduce((acc, item) => {
        const { price, cartQuantity } = item;

        const itemTotal = price * cartQuantity;

        acc += itemTotal;

        return acc;
      }, 0);

      state.cartTotalAmount = subtotal;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  getSubtotal,
} = cartSlice.actions;
export default cartSlice.reducer;
