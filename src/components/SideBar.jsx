import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/logo.svg'
import ProductoIcon from '../assets/icons/product.svg'
import CardIcon from '../assets/icons/card.svg'
import LoanIcon from '../assets/icons/loan.svg'
import TransactionIcon from '../assets/icons/transaction.svg'
import InvoiceIcon from '../assets/icons/invoice.svg'
import ClientContext from '../utils/ClientContext';
import { useSelector } from "react-redux";




const SideBar = ({ onLogin }) => {
  const client = useSelector((state) => state.authReducer.user )
  const [open, setOpen] = useState(false);



const handleOpen = (e) => {
  e.stopPropagation();
  setOpen(!open);
}


const handleLogout = () => {
  onLogin();
}

  if (!client) {
    return <div>Loading...</div>;
  }
  return (
    <>

      <div id="SideBar" className="movi:w-screen laptop:flex-col movil:flex-wrap movil:h-40 laptop:h-screen movil:flex-row laptop:w-[15%] transform movil:order-3 laptop:order-1 z-50  laptop:sticky laptop:top-0 xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start w-full bg-[#0e0f11] flex-col">
      <div className="mt-6 laptop:flex movil:hidden flex-row jusitfy-center items-center gap-4 text-white pl-4 movil:w-[0%] laptop:w-full border-gray-600 laptop:border-b movil:border-0 space-y-3 pb-5 ">
            <p className="movil:hidden laptop:block font-space-grotesk  leading-4  text-2xl">UlverBank</p>
            <img className="fill-stroke w-16 invert" src={Logo} alt="Logo" />
        </div>
        <div className="mt-6 flex movil:flex-row laptop:flex-col movil:justify-end laptop:pr-[43%] items-start pl-4 movil:w-[0%] laptop:w-full border-gray-600 laptop:border-b movil:border-0 space-y-3 pb-5 ">
          <Link to="/" className="flex movil:justify-end laptop:jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded ">
            <svg className="fill-stroke " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-base movil:hidden laptop:block  leading-4 ">Dashboard</p>
          </Link>
        </div>
        <div className="flex movil:flex-row movil:border-t-2 laptop:border-t-0 laptop:flex-col justify-start items-center pb-4  px-6 border-b border-gray-600 w-full  ">
          <span className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14 movil:hidden laptop:block ">
            <p className="movil:hidden laptop:block text-sm leading-5  uppercase">My Products</p>
          </span>
          <Link to="/account" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-4 invert' src={ProductoIcon} alt="" />
            <p className="text-base leading-4 movil:hidden laptop:block ">My Account</p>
          </Link>
          <Link to="/cards" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-5 invert' src={CardIcon} alt="" />
            <p className="text-base leading-4 movil:hidden laptop:block ">My Cards</p>
          </Link>
          <Link to="/loans" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
            <img className='w-6 invert' src={LoanIcon} alt="" />
            <p className="text-base leading-4 movil:hidden laptop:block ">My Loans</p>
          </Link>
          <Link to="/transfers" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-6 invert' src={TransactionIcon} alt="" />
            <p className="text-base leading-4 movil:hidden laptop:block ">Transfers</p>
          </Link>
          <Link to="/transactions" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-6 invert' src={InvoiceIcon} alt="" />
            <p className="text-base leading-4 movil:hidden laptop:block ">Transactions</p>
          </Link>
        </div>

        <div className="flexflex-col items-center pb-6 w-full  space-y-3 ">
          <div className='px-6 movil:hidden laptop:block'>

          <button className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  ">
            <p className="text-sm leading-5  uppercase">PROCEDURES</p>
          </button>

          <Link to="/loans/new" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-6 invert' src={LoanIcon} alt="" />
            <p className="text-base leading-4  ">New Loan</p>
          </Link>
          <Link to="/cards/new" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
            <img className='w-5 invert' src={CardIcon} alt="" />
            <p className="text-base leading-4  ">New Card</p>
          </Link>
          <Link to="/account/new" className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
            <img className='w-4 invert' src={ProductoIcon} alt="" />
            <p className="text-base leading-4  ">New Account</p>
          </Link>
          </div>
          <div className=" flex justify-between items-center w-full px-3 absolute bottom-3 ">
            <div className="flex justify-center items-center space-x-2 movil:relative movil:bottom-[11vh] laptop:bottom-3 movil:left-0">
              <div>
                <img className="rounded-full w-9 h-9 object-cover object-center" src={client.profilePictureUrl} alt="avatar" />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-sm leading-5 text-white">{client.firstName} {client.lastName}</p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">{client.email}</p>
              </div>
            </div>
            <div className='relative movil:bottom-[90px] laptop:bottom-0 movil:right-8 laptop:right-0'>
            <button onClick={handleOpen} className="group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center gap-2 ">
              <svg className="rotate-90 group-focus:rotate-180" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
              {open ? (<div className="bg-[#0e0f11] absolute bottom-10 right-0 w-48 h-24 flex flex-col justify-center items-center space-y-4 rounded-md border border-gray-600">
                <Link to="/profile" className="text-white cursor-pointer text-sm leading-5 flex gap-2 hover:bg-indigo-400 w-full justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width:'12px', fill:'white'}}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                Profile</Link>
                <Link to="/"  onClick={handleLogout} className="text-white cursor-pointer text-sm leading-5 flex gap-2 hover:bg-indigo-400 w-full justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{width:'12px', fill:'white'}}><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>Logout</Link>
              </div> ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default SideBar;
