import React from 'react'


export const Loans = ({ id, loanName, amount, payments }) => {
    return (

        <tr key={id} className='border rounded-2xl text-center'>
            <td className='border rounded-2xl'>{loanName}</td>
            <td className='border rounded-2xl'>{parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td className='border rounded-2xl'>{payments} Months</td>
        </tr>

    )
}
export default Loans