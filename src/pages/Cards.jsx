import React, {useEffect, useContext} from 'react';
import { ClientProvider } from '../utils/Db';
import { Link } from 'react-router-dom';
import Card from '../components/Cards';
import { useSelector } from "react-redux";

const Cards = () => {
  useEffect(() => {
    document.title = 'My Cards - Ulver Bank';
  })
  ClientProvider()
  const client  = useSelector((state) => state.authReducer.user )
  const getCards = () => {
    if (!client || !client.card || client.card.length === 0) {
      return <div>Loading...</div>;
    }
    return client.card.map(card => {
      return <div  key={card.id} className='movil:w-full laptop:w-1/3 '>
        <Card number={card.number} expiryDate={card.thruDate} name={card.cardHolder} color={card.color} cvv={card.cvv} />
      </div> 
    });
  }
  return (
    <div id="MyCard" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap movil:h-[120vh] laptop:h-[100vh]'>
    <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
      <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>My Cards</h1> 
        { client.card && client.card.length < 2  ? (
          <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
          ) : (<div></div>)}
      </div>
      <div className='w-full px-5 flex flex-wrap  max-h-full min-h-1/2 h-2/5 mt-7'>
        {getCards()}
      </div>
    </div>
  );
};

export default Cards;