import React, { useEffect} from 'react';
import { useDbClient } from '../utils/Db';
import { Link } from 'react-router-dom';
import Account from '../components/Accounts';
import { RecentTransactions } from '../components/RecentTransactions';

const Accounts = () => {
  useEffect(() => {
    document.title = 'My Accounts - Ulver Bank';
  })
  const client = useDbClient(1);
  console.log(client)
  const getAccounts = () => {
    if (!client.accounts || client.accounts.length === 0) {
      return <div>Loading...</div>
    }
    return client.accounts.map(account => {
      const { id, number, balance, creationDate } = account;
      const transactions = client.transactions.filter(transaction => transaction.accountId === id);
      return (
        <article id={id} className=' w-full flex flex-col gap-2 bg-[#8383b5] py-5 px-2 rounded-xl' key={id}>
          <Account id={id} number={number} balance={balance} creationDate={creationDate} />
          {transactions.map(transaction => (
            <div className='w-full px-6'>
            <RecentTransactions key={transaction.id} id={transaction.id} type={transaction.type} description={transaction.description} dateTime={transaction.dateTime} amount={transaction.amount} />
           </div>
          ))}
        </article>
      );
    });
  }

  return (
    <>
      <div id="Accounts" className='tableData bg-[#15151d] w-[85%] pb-20 flex content-start flex-wrap'>
    <div className='flex w-full text-white py-4 h-20'>
      <h1 className='text-center text-3xl mb-8 w-4/5'>My Accounts</h1> 
      <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
    </div>
        <div className='w-full flex flex-wrap gap-12 text-white py-4 px-10'>
          {getAccounts()}
        </div>
      </div>
    </>
  );
};

export default Accounts;

