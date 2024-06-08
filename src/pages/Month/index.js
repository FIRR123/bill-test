import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useMemo, useState } from 'react'
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import _ from "lodash"

const Month = () => {
  // 账单数据
  const billList = useSelector(state => state.bill.billList );

  // 将账单按月分组
  let monthGroups = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"))
  }, [billList])

  // 控制弹窗是否出现
  const [dateVisible, setDateVisible] = useState(false);

  // 选择的时间
  const [chooseDate, setChooseDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })

  // 根据选择时间筛选出的当前月的账单
  const [currentList, setCurrentList] = useState([]);

  // 计算选择月的支出收入和结余
  let currentResult = useMemo(()=> {
    if(currentList) {
      let pay = currentList.filter(item => item.type === "pay").reduce((a,c) => a + c.money, 0)
      let income = currentList.filter(item => item.type === "income").reduce((a,c) => a + c.money, 0)
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
  }, [currentList]);

  // 确认选择时间
  const confirmDate = (date) => {
    setDateVisible(false);

    const formatDate = dayjs(date).format('YYYY-MM');
    setChooseDate(formatDate)

    setCurrentList(monthGroups[formatDate]);
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {chooseDate}月账单
            </span>
            {/* 根据弹窗判断箭头朝向 */}
            <span onClick={() => setDateVisible(true)} className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{currentResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{currentResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{currentResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onConfirm={confirmDate}
            onCancel={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month;