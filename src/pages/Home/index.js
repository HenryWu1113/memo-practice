import { useState, useEffect, useRef } from 'react'
import { API_GET_DATA } from '../../global/constants'

import Edit from './components/Edit'
import List from './components/List'
import './index.css'

const Home = () => {
  // console.log(888);
  const [data, setData] = useState([])
  // 為了不要一載入就去更新資料
  const submittingStatus = useRef(false)

  // 取資料
  async function fetchData() {
    const res = await fetch(API_GET_DATA)
    const { data } = await res.json()
    setData(data)
  }

  // 更新資料
  async function fetchSetData(data) {
    console.log(data); // [{...},{...},{...}]
    console.log({ data }); // {data:Array(3)} => {data:[{...},{...},{...}]}
    await fetch(API_GET_DATA, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ data })
    })
  }

  // 一新增刪除就更新資料(但是一載入會執行一次)
  useEffect(() => {
    // 如果可更新狀態是 false 就 return 不給更新
    if (!submittingStatus.current) return
    fetchSetData(data).then(data => submittingStatus.current = false)
  }, [data])

  // 只有第一次載入會執行
  useEffect(() => {
    console.log('[][][][]');
    fetchData()
  }, [])

  return <div className='app'>
    <Edit add={setData} submittingStatus={submittingStatus} />
    <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
  </div>
}

export default Home