import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { ClientProvider } from '../utils/Db';
import { RecentTransactions } from '../components/RecentTransactions';

const Transactions = () => {
  useEffect(() => {
    document.title = 'My Transactions - Ulver Bank';
  })
  ClientProvider()
  const client = useSelector((state) => state.authReducer.user )
  const getTransactions = () => {
    if (!client.transactions || client.transactions.length === 0) {
      return <div>Loading...</div>
    }
    return client.transactions.map(transaction => {
      const { id, type, description, dateTime, amount, accountId } = transaction;
      const account = client.accounts.find(account => account.id === accountId);
      const accountNumber = account ? account.number : 'N/A';
      return <RecentTransactions key={id} id={id} type={type} description={description} dateTime={dateTime} amount={amount} accountNumber={accountNumber} />
    })
  }
  return (
<div id="MyTransactions" className='bg-[#15151d] movil:w-screen laptop:w-[85%] min-h-[85vh] order-2 pb-20 flex movil:flex-col content-start flex-wrap'>
    <div className='flex w-full text-white py-4 h-20'>
      <h1 className='text-center text-3xl mb-8 w-full'>My Transactions</h1> 
    </div>
    <div className='w-full movil:p-0 laptop:px-20'>
    <div className='w-full flex flex-col bg-[#8383b5] py-5 px-2 rounded-xl'>
    <table className='w-full text-white gap-1 pb-3'>
                    <thead>
                      <tr className='border rounded-2xl'>
                        <th className='border'>Account</th>
                        <th className='border'>Type</th>
                        <th className='border'>Concept</th>
                        <th className='border'>Date</th>
                        <th className='border'>Ammount</th>
                      </tr>
                    </thead>
                    <tbody className='border rounded-2xl'>
                      {getTransactions()}
                    </tbody>
                  </table>
      </div>
    </div>
    </div>
  )
}

export default Transactions
