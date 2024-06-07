import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name:"bill",

  initialState: {
    billList : []
  },

  reducers: {
    setBillList(state, action){
      state.billList = action.payload
      
    }
  }
})

const { setBillList } = billStore.actions


// 异步
const fetchBillList = () => {
  return async (dispatch) => {
    let result = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(result.data))
  }
}

export { fetchBillList }

const reducer = billStore.reducer

export default reducer;