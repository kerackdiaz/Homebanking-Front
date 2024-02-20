import React, {useEffect} from 'react';
import { useDbClient } from '../utils/Db';
import { Link } from 'react-router-dom';
import Loans from '../components/Loans';


const MyLoans = () => {
  useEffect(() => {
    document.title = 'My Loans - Ulver Bank';
  })
  const client = useDbClient(1);
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
    <div id="MyLoans" className='tableData bg-[#15151d] w-[85%] pb-20 flex content-start flex-wrap'>
    <div className='flex w-full text-white py-4 h-20'>
      <h1 className='text-center text-3xl mb-8 w-4/5'>My Loans</h1> 
      <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
    </div>
    <div className='w-full flex gap-4 px-5 '>
        {getLoans()}
      </div>
    </div>
  );
};

export default MyLoans;
