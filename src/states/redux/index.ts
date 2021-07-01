import { configureStore, createSlice } from '@reduxjs/toolkit';
/**
 *
 */
export interface IEXBlockState {
  symbol: string,
  blockType: string
}

/**
 *
 */
export interface IEXBlockSliceInitalState {
  blocks: IEXBlockState[]
}

const initialState: IEXBlockSliceInitalState = {
  blocks: [
    {
      blockType: 'ticker',
      symbol: 'twtr'
    },
    {
      blockType: 'book',
      symbol: 'twtr'
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    },
    {
      blockType: 'empty',
      symbol: ''
    }
  ]
};

const IEXBlockSlice = createSlice({
  name: 'iexBlocks',
  initialState: initialState,
  reducers: {
    removeBlock: (state, {payload}: {payload: {location: number}}) => {
      state.blocks[payload.location] = {
        blockType: 'empty',
        symbol: ''
      };
    },
    addBlock: (state, {payload}: {payload: {location: number, blockType: string, symbol: string}}) => {
      state.blocks[payload.location] = {
        blockType: payload.blockType,
        symbol: payload.symbol.toLowerCase()
      };
    }
  }
});


export const {removeBlock, addBlock} = IEXBlockSlice.actions;

/**
 * Gets the current root state for the global redux state
 */
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: IEXBlockSlice.reducer
});
