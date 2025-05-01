'use client'
import React from 'react'

const Index = ({date,setDateValue,handleGenerateReport}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg"> {/* Consistent card style */}
    <h2 className="text-xl font-semibold mb-5 text-gray-700">Tarih Aralığı Seçin</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
      <div>
        <label htmlFor="startDate" className="block text-gray-600 text-sm font-medium mb-1">
          Başlangıç Tarihi
        </label>
        <input
          type="date"
          id="startDate"
          defaultValue={date.startDate || undefined}
          onChange={(e) => setDateValue("startDate",e.target.value)}
          className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-gray-600 text-sm font-medium mb-1"> 
          Bitiş Tarihi
        </label>
        <input
          type="date"
          id="endDate"
          defaultValue={date.endDate || undefined}
          onChange={(e) => setDateValue("endDate",e.target.value)}
          className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
        />
      </div>
      <button
        onClick={handleGenerateReport}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center justify-center gap-2" // Added flex for icon
      >
        <span>Raporu Oluştur</span>
      </button>
    </div>
  </div>
  )
}

export default Index