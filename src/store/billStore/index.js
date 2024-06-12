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
    },

    addBill(state, action){
      state.billList.push(action.payload)
    }
  }
})

const { setBillList, addBill } = billStore.actions


// 异步
const fetchBillList = () => {
  return async (dispatch) => {
    let result = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(result.data))
  }
}

// 添加账单
const addBillList = (data) => {
  return async (dispatch) => {
    let result = await axios.post("http://localhost:8888/ka", data)
    dispatch(addBill(result.data))
  }
}

export { fetchBillList, addBillList }

const reducer = billStore.reducer

export default reducer;