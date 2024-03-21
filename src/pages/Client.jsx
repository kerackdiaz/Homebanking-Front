import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import Accounts from '../components/Accounts';
import { Link } from 'react-router-dom';
import QuickTransaction from '../components/QuickTransaction';
import { Loans } from '../components/Loans';
import { RecentTransactions } from '../components/RecentTransactions';
import { useSelector } from "react-redux";
import { ClientProvider } from '../utils/Db';


const Client = () => {
ClientProvider()
  const client  = useSelector((state) => state.authReducer.user )

  useEffect(() => {
    if (client) {
      document.title = 'Welcome, ' + client.firstName + '!';
    }
  }, [client]);

  const getAccounts = () => {
    if (!client.accounts || client.accounts.length === 0) {
      return <div>Loading...</div>
    }
    return client.accounts.map(account => {
      const { id, number, balance, creationDate } = account;
      return <Accounts key={id} id={id} number={number} balance={balance} creationDate={creationDate} />
    })
  }

  const getCards = () => {
    if (!client.card || client.card.length === 0) {
      return <div className='flex gap-10'>
        <Link to="./cards/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
      </div>
    } else if (client.card.length > 2) {
      return <div className='flex gap-10'>
        <Link to="./cards" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View my cards</Link>
      </div>
    }
    return <div className='flex gap-10'>
      <Link to="./cards" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View my cards</Link>
      <Link to="./cards/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
    </div>
  }


  const getLoans = () => {
    if (!client.loans || client.loans.length === 0) {
      return <div className='text-white text-center'>There are no loans to show</div>
    }
    return client.loans.map(loan => {
      const { id, loanName, amount, payments } = loan;
      return <Loans key={id} id={id} loanName={loanName} amount={amount} payments={payments} />
    })


  }
  const getTransactions = () => {
    if (!client.transactions || client.transactions.length === 0) {
      return <div className='text-white'>There are no transactions to show</div>
    } else {
      const transactionsToShow = client.transactions.slice(Math.max(client.transactions.length - 10, 0));
      return transactionsToShow.map(transaction => {
        const { id, type, description, dateTime, amount } = transaction;
        return <RecentTransactions key={id} id={id} type={type} description={description} dateTime={dateTime} amount={amount} />
      })
    }
  }

  return (
    <>
      <div id="Client" className='bg-[#15151d] movil:w-screen movil:min-h-[120vh] laptop:w-[85%] pb-20 flex content-start flex-wrap'>
        <div className='f w-full text-white py-4 h-20'>
          <h1 className='text-center text-3xl mb-8'> Welcome, {client.firstName}</h1>
        </div>
        <div className='w-full movil:m-0 laptop:mb-10'>
          <Slider />
        </div>

        <div className='movil:w-full laptop:w-1/3 flex flex-col gap-10 items-center '>
{/*showing the accounts*/}
          <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Accounts</h2>
            {getAccounts()}
          </section>
{/*showing the cards*/}
          <section className='movil:hidden laptop:flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Cards</h2>
            {getCards()}
          </section>
        </div>

        <div className='w-1/3 movil:hidden laptop:flex flex-col gap-10 items-center'>
{ /*showing the transactions*/}
          {client.transactions && client.transactions.length > 0 ? (
            <section className=' flex w-full flex-col gap-3 justify-center items-center'>
              <h2 className='text-white font-bold text-2xl'>Recent Transactions</h2>
              <div className='w-full'>
                <div className='bg-[#8383b5] w-full gap-8 py-2 px-4 bg-no-repeat bg-center border-gray-500 border-2 rounded-xl flex flex-col items-center justify-end pb-1'>
                  <table className='w-full text-white gap-1 pb-3'>
                    <thead>
                      <tr className='border rounded-2xl'>
                        <th className='border'>Product</th>
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
              <Link to="./transactions" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View More</Link>
            </section>
          ) : (
            <section className=' movil:hidden laptop:flex w-full flex-col gap-3 justify-center items-center'>
              <h2 className='text-white font-bold text-2xl'>Recent Transactions</h2>
              <div className='w-full text-center'>
                {getTransactions()}
              </div>
            </section>
          )}
        </div>
{ /*showing the loans*/}
        <div className='w-1/3 movil:hidden laptop:flex flex-col gap-10 items-center'>
          {client.loans && client.loans.length > 0 ? (
            <section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
              <h2 className='text-white font-bold text-2xl'>My Loans</h2>
              <article className='w-full'>
                <div className='bg-[#8383b5] w-full gap-8 py-2 px-4 bg-no-repeat bg-center border-gray-500 border-2 rounded-xl flex flex-col items-center justify-end pb-1'>
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
              </article>
              <div className='flex gap-10'>
                <Link to="./loans" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View More</Link>
                <Link to="./loans/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
              </div>
            </section>
          ) : (<section className=' flex w-full flex-col gap-3 px-10 justify-center items-center'>
            <h2 className='text-white font-bold text-2xl'>My Loans</h2>
            <article  className='w-full'>
              
                {getLoans()}

            </article>
            <div className='flex gap-10'>
              <Link to="./loans" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>View More</Link>
              <Link to="./loans/new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
            </div>
          </section>)}

{ /*showing the quick transaction*/}
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
