import { createSlice } from '@reduxjs/toolkit';
import { getAllProductsAction } from './product.action';

const initialState = {
  getAllProducts: {
    data: {} as any,
    error: '',
    loading: false,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAction.pending, (state) => ({
        ...state,
        getAllProducts: {
          data: {},
          error: '',
          loading: true,
        },
      }))
      .addCase(getAllProductsAction.fulfilled, (state, action: any) => ({
        ...state,
        getAllProducts: {
          data: action.payload,
          error: '',
          loading: false,
        },
      }))
      .addCase(getAllProductsAction.rejected, (state, action: any) => {
        const { error } = action.payload || { error: 'error' };
        return {
          ...state,
          getAllProducts: {
            data: {},
            error,
            loading: false,
          },
        };
      });
  },
});

export default productSlice.reducer;
