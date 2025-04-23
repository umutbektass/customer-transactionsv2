
import React from 'react'
import DateInput from './date-input'
const Index = () => {
  return (
    <div className='flex gap-3 mt-12'>
        <DateInput labelText={'Başlangıç Tarihi'} query={'startDate'}/>
        <DateInput labelText={'Bitiş Tarihi'}  query={'endDate'}/>
    </div>
  )
}

export default Index