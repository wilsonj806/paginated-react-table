import React, { useState, useEffect } from 'react'

const FilterableTable = require('react-filterable-table')

const Button = ({page, onClick, currPage}) => <button onClick={onClick} type='button' disabled={page === currPage}>{page}</button>
const fields = [
  {
    name: "login"
  },
  {
    name: "id"
  }
];
const Table = () => {
  const [page, setPage] = useState('1')
  const [data, setData] = useState([])

  useEffect(() => {
    const asyncFetch = async () => {
      if (page) {
        const data = await fetch('https://api.github.com/repos/microsoft/typescript/contributors?per_page=10&page='+page)
        .then(data => {
          return data.json()
        })
        setData(data)
      } else {}
    }
    asyncFetch()
  }, [page])
  const handleClick = (val) => {
    setPage(val)
  }

  return (
    <div>
      <FilterableTable
      pageSizes={10}
      // bottomPagerVisible={null}
      pagersVisible={false}
      fields={fields}
      data={data}
    />
      <div>
        <Button type='button' onClick={() => handleClick('1')} currPage={page} page='1'/>
        <Button type='button' onClick={() => handleClick('2')} currPage={page} page='2'/>
        <Button type='button'onClick={() => handleClick('3')} currPage={page} page='3'/>
        <Button type='button'onClick={() => handleClick('4')} currPage={page} page='4'/>
        <Button type='button'onClick={() => handleClick('5')} currPage={page} page='5'/>
      </div>
    </div>
  )
}

export default Table;