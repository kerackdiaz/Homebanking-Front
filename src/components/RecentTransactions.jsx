import React from 'react'


export const RecentTransactions = ({ id, type, description, dateTime, amount, accountNumber }) => {
    const isPositive = amount < 0 ? "text-red-800 " : "text-green-700 " ;
    const isDebit = type === "DEBIT" ? "text-red-800 " : "text-green-700 " ;
    return (
        <tr key={id} className='border rounded-2xl text-center'>
            {accountNumber && <td className='border rounded-2xl'>{accountNumber}</td>}
            <td className={isDebit + 'border rounded-2xl font-bold'}>{type}</td>
            <td className='border rounded-2xl'>{description}</td>
            <td className='border rounded-2xl'>{dateTime}</td>
            <td className={isPositive + 'border rounded-2xl font-extrabold text-right pr-4'}>$ {amount}</td>
        </tr>
    )
}
