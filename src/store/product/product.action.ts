import { createAsyncThunk } from '@reduxjs/toolkit';
import products from './product.api';

const getAllProductsAction = createAsyncThunk(
  'products/getAllProductsAction',
  async (params, thunkAPI) => {
    try {
      const res: any = await products.getAllProducts();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.message,
      });
    }
  }
);

export { getAllProductsAction };
