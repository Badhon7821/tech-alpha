import { configureStore } from "@reduxjs/toolkit";

import productReducer, {
  productsFetching,
} from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    //multiple reducer goes here....
    products: productReducer,
  },
});

store.dispatch(productsFetching());
