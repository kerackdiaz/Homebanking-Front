import React, {useEffect} from 'react';
import { useDbClient } from '../utils/Db';
import { Link } from 'react-router-dom';
import { RecentTransactions } from '../components/RecentTransactions';

const Transactions = () => {
  useEffect(() => {
    document.title = 'My Transactions - Ulver Bank';
  })
  const client = useDbClient(1);
  const getTransactions = () => {
    if (!client.transactions || client.transactions.length === 0) {
      return <div>Loanding...</div>
    }
    return client.transactions.map(transaction => {
      const { id, type, description, dateTime, amount } = transaction;
      console.log(id, type, description, dateTime, amount)
      return <RecentTransactions key={id} id={id} type={type} description={description} dateTime={dateTime} amount={amount} />
    })

  }
  return (
<div id="MyTransactions" className='bg-[#15151d] w-[85%] pb-20 flex content-start flex-wrap'>
    <div className='flex w-full text-white py-4 h-20'>
      <h1 className='text-center text-3xl mb-8 w-full'>My Transactions</h1> 
    </div>
    <div className='w-full px-20'>
    <div className='w-full flex flex-col bg-[#8383b5] py-5 px-2 rounded-xl'>
        {getTransactions()}
      </div>
    </div>
    </div>
  )
}

export default Transactions
