import React, { useEffect, useState } from 'react';
import { deleteCard, ClientProvider } from '../utils/Db';
import { Link } from 'react-router-dom';
import Card from '../components/Cards';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const [currentExpiryDate, setCurrentExpiryDate] = useState('');
  const token = useSelector((state) => state.authReducer.token.token);
  ClientProvider()
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'My Cards - Ulver Bank';

  })

  const client = useSelector((state) => state.authReducer.user)

  useEffect(() => {
    const getCurrentExpiryDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().slice(2);
      const month = currentDate.getMonth() + 1;
      const formattedMonth = month < 10 ? '0' + month : month;
      return `${formattedMonth}/${year}`;
    };

    setCurrentExpiryDate(getCurrentExpiryDate());
  }, []);
  const getCards = () => {


    if (!client || !client.card || client.card.length === 0) {
      return <div>Loading...</div>;
    }
    return client.card.map(card => {
      const isExpired = currentExpiryDate > card.thruDate ? "isExpired " : "";
      return <div key={card.id} className='movil:w-full laptop:w-1/3'>
        <Card number={card.number} expiryDate={card.thruDate} name={card.cardHolder} color={card.color} cvv={card.cvv} isExpired={isExpired} />
        {card.type === 'DEBIT' ? <button className='relative z-50 bg-red-800 border-2 px-4 py-2 rounded-xl text-white hover:scale-105' key={card.id} onClick={() => handleDelete(card.id)}>Delete</button> : <div key={card.id}></div>}

      </div>
    });
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      const response = await deleteCard(id, token);
      console.log(response)
      if (response.success) {
        Swal.fire('The card has been removed', '', 'success');
      }
    } else {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  };


  return (
    <div id="MyCard" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap movil:h-[120vh] laptop:h-[100vh]'>
      <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
        <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>My Cards</h1>
        {client.card && client.card.length < 2 ? (
          <Link to="./new" className='border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white laptop:h-full hover:scale-105'>Apply for a new</Link>
        ) : (<div></div>)}
      </div>
      <div className='w-full px-5 flex flex-wrap  max-h-full min-h-1/2 h-2/5 mt-7 justify-center'>
        {getCards()}
      </div>
    </div>
  );
};

export default Cards;