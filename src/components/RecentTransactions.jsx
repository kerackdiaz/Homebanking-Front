import React from 'react'


export const RecentTransactions =  ({ id, type, description, dateTime, amount }) => {
  return (
      <div key={id} className='w-full'>
          <div className='bg-[#8383b5] w-full gap-8 py-2 px-4 bg-no-repeat bg-center border-gray-500 border-2 rounded-xl flex flex-col items-center justify-end pb-1'>
              <table className='w-full text-white gap-1 pb-3'>
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Concept</th>
                          <th>Date</th>
                          <th>Ammount</th>
                      </tr>
                  </thead>
                  <tbody key={id} className=''>
                      <tr className='text-center'>
                          <td>{type}</td>
                          <td>{description}</td>
                          <td>{dateTime}</td>
                          <td>{parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  )
}
