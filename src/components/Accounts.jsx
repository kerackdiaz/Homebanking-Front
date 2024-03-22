import React, {useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';


export const Accounts = ({ id, number, balance, creationDate }) => {

  return (
    <article className='min-w-[48%] w-full'>
    <div className='bg-[#8383b5] w-full gap-8 py-2 px-4 bg-no-repeat bg-center border-gray-500 border-2 rounded-xl flex flex-col items-center justify-end pb-1'>
    <div key={id} className='flex flex-col w-full text-white gap-1 pb-3'>
            <h2 className='font-bold flex movil:flex-row movil:flex-wrap movil:justify-center tablet:justify-between movil:pb-5 w-full text-xl'>Account N°:  {number} <p className='creationDate movil:text-lg laptop:text-xl movil:text-center'>Creation date: {creationDate}</p></h2>
            <h3 className='font-bold self-end px-4 py-2 text-right border-b border-l text-lg movil:border-r laptop:border-r-0'>My Balance:  {parseFloat(balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
            <Link className='moreDetails border-2 font-semibold  min-w-1/3 max-w-36 text-center px-4 py-2 rounded-xl bg-[#1d2027]  text-white hover:scale-90 ease-linear transition-all duration-150' to={'/account#'+id}>More Details</Link>
          </div>
    </div>
  </article>
  )
}
export default Accounts