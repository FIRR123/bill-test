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
  console.log(monthGroups)

  // 控制弹窗是否出现
  const [dateVisible, setDateVisible] = useState(false);

  // 选择的时间
  const [chooseDate, setChooseDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })

  // 确认选择时间
  const confirmDate = (date) => {
    setDateVisible(false);

    setChooseDate(dayjs(date).format('YYYY-MM'))
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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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