import { useDispatch } from "react-redux";

import { Button } from "antd-mobile";

import { useEffect } from "react";
import { fetchBillList } from "@/store/billStore";

const Month = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBillList())
  }, [dispatch])

  return (
    <div>
      我是Month
      <Button color="primary"> 你好 </ Button>
    </div>
  )
}

export default Month;