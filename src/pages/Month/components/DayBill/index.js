import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react';

const DailyBill = ({ date, dayBillList }) => {

  // 计算支出收入和结余
  let currentResult = useMemo(()=> {
    if(dayBillList) {
      let pay = dayBillList.filter(item => item.type === "pay").reduce((a,c) => a + c.money, 0)
      let income = dayBillList.filter(item => item.type === "income").reduce((a,c) => a + c.money, 0)
      let total = pay + income
      return {
        pay, income, total
      }
    } else {
      let pay = -1
      let income = -1
      let total = -1
      return {
        pay, income, total
      }
    }
  }, [dayBillList]);

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{currentResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{currentResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{currentResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill