import React, { useEffect, useContext } from 'react';
import { ClientProvider } from '../utils/Db';
import { Link } from 'react-router-dom';
import Loans from '../components/Loans';
import { useSelector } from "react-redux";


const MyLoans = () => {
  useEffect(() => {
    document.title = 'My Loans - Ulver Bank';
  })
  ClientProvider()
  const client = useSelector((state) => state.authReducer.user)
  const getLoans = () => {
    if (!client.loans || client.loans.length === 0) {
      return <div>Loading...</div>
    }
    return client.loans.map(loan => {
      const { id, loanName, amount, payments } = loan;
      return <Loans key={id} id={id} loanName={loanName} amount={amount} payments={payments} />
    })
  }
  return (
    <div id="MyLoans" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap min-h-[85vh] order-2'>
    <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
      <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>My Loans</h1>
        <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white laptop:h-full hover:scale-105'>Apply for a new</Link>
      </div>
      <div className='w-full flex gap-4 px-5 movil:mt-8 laptop:m-0 '>
        <table className='w-full text-white gap-1  pb-3'>
          <thead className='border rounded-2xl'>
            <tr>
              <th className='border rounded-2xl'>Loan type</th>
              <th className='border rounded-2xl'>Approved amount</th>
              <th className='border rounded-2xl'>Installments</th>
            </tr>
          </thead>
          <tbody className='border rounded-2xl'>
            {getLoans()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoans;
