import React, { useEffect} from 'react';
import Slider from '../components/Slider';
import Accounts from '../components/Accounts';
import { Link } from 'react-router-dom';
import QuickTransaction from '../components/QuickTransaction';
import { useDbClient } from '../utils/Db';
import { Loans } from '../components/Loans';
import { RecentTransactions } from '../components/RecentTransactions';

const Client = () => {
  const client = useDbClient(1);
  useEffect(() => {
    document.title = 'Welcome, ' + client.firstName + '!';
  })
  if (!client || !client.accounts || client.accounts.length === 0) {
    return <div>Loading...</div>;
  }

  const getAccounts = () => {
    if (!client.accounts || client.accounts.length === 0) {
      return <div>Loading...</div>
    }
    return client.accounts.map(account => {
      const { id, number, balance, creationDate } = account;
      return <Accounts key={id} id={id} number={number} balance={balance} creationDate={creationDate} />
    })
  }

  const getLoans = () => {
    if (!client.loans || client.loans.length === 0) {
      return <div>Loading...</div>
    }
    return client.loans.map(loan => {
      const { id, loanName, amount, payments } = loan;
      return <Loans key={id} id={id} loanName={loanName} amount={amount} payments={payments} />
    })


  }
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

console.log(getAccounts())
  return (
    <>
      <div id="Client" className='bg-[#15151d] w-[85%] pb-20 flex content-start flex-wrap'>
        <div className='f w-full text-white py-4 h-20'>
          <h1 className='text-center text-3xl mb-8'> Welcome, {client.firstName}</h1>
        </div>
        <div className='w-full mb-10'>
          <Slider />
        </div>
        
        <div className='w-1/3 flex flex-col gap-10 items-center '>

          <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Accounts</h2>
              {getAccounts()}
          </section>

          <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Cards</h2>
            <div className='flex gap-10'>
              <Link to="./cards" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View my cards</Link>
              <Link to="./cards/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
             </div>
          </section>

        </div>
        <div className='w-1/3 flex flex-col gap-10 items-center'>

            <section className=' flex w-full flex-col gap-3 justify-center items-center'>
              <h2 className='text-white font-bold text-2xl'>Recent Transactions</h2>
              {getTransactions()}
              <Link to="./transactions" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View More</Link>
            </section>

        </div>
        <div className='w-1/3 flex flex-col gap-10 items-center'>

          <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Loans</h2>
              {getLoans()}
              <div className='flex gap-10'>
                <Link to="./loans" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View More</Link>
                <Link to="./loans/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
              </div>
          </section>

          <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>Quick Transaction</h2>
            <QuickTransaction />
          </section>
        </div>
      </div>
    </>
  );
};

export default Client;
