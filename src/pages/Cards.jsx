import React, {useEffect} from 'react';
import { useDbClient } from '../utils/Db';
import { Link } from 'react-router-dom';
import Card from '../components/Cards';

const Cards = () => {
  useEffect(() => {
    document.title = 'My Cards - Ulver Bank';
  })
  const client = useDbClient(1);
  const getCards = () => {
    if (!client || !client.card || client.card.length === 0) {
      return <div>Loading...</div>;
    }
    return client.card.map(card => {
      return <div  key={card.id} className='w-1/3 '>
        <Card number={card.number} expiryDate={card.thruDate} name={card.cardHolder} color={card.color} cvv={card.cvv} />
      </div> 
    });
  }
  console.log(getCards())
  return (
    <div id="MyCard" className='bg-[#15151d] w-[85%] pb-20 flex content-start flex-wrap px-5'>
      <div className='flex w-full text-white py-4 h-20'>
        <h1 className='text-center text-3xl mb-8 w-4/5'>My Cards</h1> 
        <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105'>Apply for a new</Link>
      </div>
      <div className='w-full px-5 flex flex-wrap  max-h-full min-h-1/2 h-2/5 mt-7'>
        {getCards()}
      </div>
    </div>
  );
};

export default Cards;