import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react';
import { billTypeToName } from '@/constants';
import Icon from '@/components/Icon';

const DailyBill = ({ date, dayBillList }) => {

  // 计算支出收入和结余
  let currentResult = useMemo(() => {
    if (dayBillList) {
      let pay = dayBillList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0)
      let income = dayBillList.filter(item => item.type === "income").reduce((a, c) => a + c.money, 0)
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

  // 控制日列表显示隐藏
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible && "expand")} onClick={() => setVisible(!visible)} ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{currentResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{currentResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{currentResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{"display":visible?"block":"none"}}>
        {dayBillList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/* 图标 */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill