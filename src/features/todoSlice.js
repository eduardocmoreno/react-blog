import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: []
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      state.list = state.list.filter(i => i.id !== action.payload.id)
    },
    done: (state, action) => {
      state.list = state.list.map(i => {
        if(i.id === action.payload.id){
          return {
            ...i,
            isDone: true
          }
        }
        return i;
      })
    }
  }
})

export const { add, remove, done } = todoSlice.actions;
export default todoSlice.reducer;