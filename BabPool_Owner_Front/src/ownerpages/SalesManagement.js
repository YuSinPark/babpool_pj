import React, { useEffect, useState } from 'react'
import SideBarElements from '../components/Sidebar/SideBarElements';
import ParentContainerWrapper from '../components/Main/ParentContainerWrapper';
import styled from 'styled-components';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, eachYearOfInterval } from 'date-fns';

const MyStoreChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  flex-basis: 0;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const ChartContainerRow = styled.div`
  background-color: #ffffff;
  margin: 10px;
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 20px;

  .chart-container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
  
  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: xx-small;
  }
`;

const SalesManagement = () => {
  const { restaurantId } = useParams();
  const [ monthStatistics, setMonthStatistics] = useState([]);
  const token = localStorage.getItem('token');
  const [errorMessage, setErrorMessage] = useState("");
  const months = Array.from(Array(12), (_, i) => String(i + 1));
  const [selectedYear, setSelectedYear] = useState(2023); // 선택된 년도 상태
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 2;
  

  const yearOptions = eachYearOfInterval({
    start: new Date(startYear, 0),
    end: new Date(endYear, 11),
  }).map((date) => format(date, 'yyyy'));

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    if (token === null) {
      return;
    }
    axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/v1/statistics/${restaurantId}`,{
        selectedYear: selectedYear
      }, {
        headers: {Authorization: `Bearer ${token}`}
      })
    .then((response) => {
      const transformedData = response.data.data.map(item => ({
        monthName: item.monthName,
        monthlyCount: item.monthlyCount,
        monthlyMoney: item.monthlyMoney
      }));
      setMonthStatistics(transformedData)
    })
    .catch((error) => {
      setErrorMessage(error.response.data.msg);
      alert(error.response.data.msg)
      window.location.href="/";
    });
  }, [token,selectedYear]);

  return (
    <div>
      <div className='side-bar'>
        <SideBarElements />
      </div>
      <ParentContainerWrapper>
        <div className='Announce-Bar'>
          <div className="AnnounceBarWrapper" style={{ fontWeight: 'bold'}}>매출 관리</div>
        </div>
        <MyStoreChartContainer>
          <ChartContainerRow>
            <div className="content-header">
              <select value={selectedYear} onChange={handleYearChange} style={{ border: 'none', outline: 'none', fontWeight: 'bold'}}>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              년 월별 매출액
            </div>
            <div className="content">
            <ResponsiveContainer width="100%" height="100%" aspect={2}>
              <ComposedChart
                data={monthStatistics}
                margin={{
                  top: 50,
                  right: 50,
                  left: 50,
                  bottom: 10,
                }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="monthName"
                  label={{ value: '월', position: 'insideBottomRight', offset: -10}}
                  tickFormatter={month => months[Number(month) - 1]} />
                <YAxis yAxisId="count"
                  label={{ value: '판매 수량', position: 'insideTopLeft', offset: -30}}
                  />
                <YAxis yAxisId="money" orientation="right"
                  label={{ value: '판매 금액', position: 'insideTopRight', offset: -30}}
                />
                <Tooltip labelFormatter={(value) => `${months[Number(value) - 1]}월`} />
                <Legend payload={[
                  { value: '판매 수량', type: 'bar', color: '#8884d8' },
                  { value: '판매 금액', type: 'line', color: '#82ca9d' },
                ]} />
                <Bar dataKey="monthlyCount" name="판매량" yAxisId="count" fill="#8884d8" />
                <Line dataKey="monthlyMoney" name='판매 금액' yAxisId="money" stroke="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
            </div>
          </ChartContainerRow>
        </MyStoreChartContainer>
      </ParentContainerWrapper>
    </div>
  )
}

export default SalesManagement;