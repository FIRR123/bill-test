import { configureStore } from "@reduxjs/toolkit"
// 导入子模块reducer
import billReducer from "./billStore"

const store = configureStore({
  reducer: {
    bill: billReducer,
  }
})

export default store;