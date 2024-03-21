import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Account from '../components/Accounts';
import { RecentTransactions } from '../components/RecentTransactions';
import { useSelector } from "react-redux";
import { ClientProvider } from '../utils/Db';

const Accounts = () => {
  useEffect(() => {
    document.title = 'My Accounts - Ulver Bank';
  })
  ClientProvider()
  const client  = useSelector((state) => state.authReducer.user )


  const getTransactions = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return <div>Loading...</div>
    }
    return transactions.map(transaction => {
      const { id, type, description, dateTime, amount } = transaction;
      return <RecentTransactions key={id} id={id} type={type} description={description} dateTime={dateTime} amount={amount} />
    })
  }
  
  const getAccounts = () => {
    if (!client.accounts || client.accounts.length === 0) {
      return <div>Loading...</div>
    }
    return client.accounts.map(account => {
      const { id, number, balance, creationDate } = account;
      const transactions = client.transactions.filter(transaction => transaction.accountId === id);
      return (
        <article key={id} className=' w-full flex flex-col gap-2 bg-[#8383b5] py-5 px-2 rounded-xl'>
          <Account id={id} number={number} balance={balance} creationDate={creationDate} />
          <table className='w-full text-white gap-1 pb-3'>
            <thead>
              <tr className='border rounded-2xl text-center'>
                <th className='border rounded-2xl'>Type</th>
                <th className='border rounded-2xl'>Concept</th>
                <th className='border rounded-2xl'>Date</th>
                <th className='border rounded-2xl'>Ammount</th>
              </tr>
            </thead>
            <tbody className='border rounded-2xl'>
              {getTransactions(transactions)}
            </tbody>
          </table>
        </article>
      );
    });
  }

  return (
    <>
      <div id="Accounts" className='tableData bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap min-h-screen'>
        <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
          <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>My Accounts</h1>
          { client.accounts && client.accounts.length < 3  ? (
          <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white laptop:h-full hover:scale-105'>Apply for a new</Link>
          ) : (<div></div>)}
        </div>
        <div className='w-full flex flex-wrap gap-12 text-white py-4 px-10'>
          {getAccounts()}
        </div>
      </div>
    </>
  );
};

export default Accounts;

