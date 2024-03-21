import React from 'react'


export const RecentTransactions = ({ id, type, description, dateTime, amount, accountNumber }) => {
    return (
        <tr key={id} className='border rounded-2xl text-center'>
            {accountNumber && <td className='border rounded-2xl'>{accountNumber}</td>}
            <td className='border rounded-2xl'>{type}</td>
            <td className='border rounded-2xl'>{description}</td>
            <td className='border rounded-2xl'>{dateTime}</td>
            <td className='border rounded-2xl'>$ {amount}</td>
        </tr>
    )
}
