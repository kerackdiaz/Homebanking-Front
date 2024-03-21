import React,{useState} from 'react'
import Cards from '../components/Cards'
import { cardApply } from '../utils/Db';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


 const NewCard = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token.token);
  const [cardType, setCardType] = useState('');
  const [cardColor, setCardColor] = useState('');
  const [card, setCard] = useState({
    number: '**** **** **** 0666',
    expiryDate: 'MM/YY',
    name: 'CARD HOLDER',
    color: 'gray',
    cvv: '***',
    type: 'DEBIT'
  });
  const [isColorSelected, setIsColorSelected] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'cardType') {
      setCardType(value);
      setCard(prevState => ({ ...prevState, type: value }));
    } else if (name === 'cardColor') {
      setCardColor(value);
      setCard(prevState => ({ ...prevState, color: value.toLowerCase() }));
      setIsColorSelected(true);
    }
  }


  const handleRequest = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Do you accept all terms and conditions?",
      text: "Al apply you accept all terms and conditions",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    });
    if (result.isConfirmed) {
      console.log(cardColor)
      console.log(cardType)
    const response = await cardApply({ cardColor, cardType }, token);
    if (response.success) {
      Swal.fire('Card application successful', '', 'success');
    }else{
      Swal.fire(response.message, '', 'error');
    }
  }
};


  return (
<div id="NewLoan" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap h-[100vh]'>
    <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
      <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>Apply for a card</h1>
      </div>
   <div className='movil:w-full laptop:w-1/2 flex flex-col justify-center '>
      <ol className='text-white list-decimal px-20 flex flex-col gap-5 mb-10' >
        <li>Choose the type of card that fits your financial needs. Each type of card has different conditions and advantages.</li>
        <li>Select the type of card. each one will give you benefits for using it.</li>
      </ol>
      <form className='flex flex-col px-10 gap-5' onChange={handleInputChange} onSubmit={handleRequest}>
      <select name="cardType" defaultValue="defaul"  className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
    <option value="defaul" disabled>Select a card type...</option>
    <option value="DEBIT">DEBIT</option>
    <option value="CREDIT">CREDIT</option>
  </select>
  <select name="cardColor" defaultValue="defaul" className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
    <option value="defaul" disabled>Select a card color...</option>
    <option value="GOLD">GOLD</option>
    <option value="SILVER">SILVER</option>
    <option value="TITANIUM">TITANIUM</option>
  </select>
        
        <button type="submit"  className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150'>Apply</button>
      </form>

    </div>
    <div className='movil:w-full laptop:w-1/3 movil:mt-5'>
    {isColorSelected && <Cards number={card.number} expiryDate={card.expiryDate} name={card.name} color={card.color} cvv={card.cvv}/>}
    </div>
    </div>
  )
}
export default NewCard
