import { configureStore } from "@reduxjs/toolkit";

import productReducer, {
  productsFetching,
} from "../features/products/productSlice";

const store = configureStore({
  reducer: {
    //multiple reducer goes here....
    products: productReducer,
  },
});

store.dispatch(productsFetching());
