import React, { useState } from 'react';
import { useAction, createTransaction } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const TransactionPage = () => {
  const createTransactionFn = useAction(createTransaction);
  const [transactionData, setTransactionData] = useState({ userId: 1, type: '', amount: 0, status: '' });

  const handleTransaction = () => {
    createTransactionFn(transactionData);
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Type'
        className='px-1 py-2 border rounded text-lg'
        value={transactionData.type}
        onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })}
      />
      <input
        type='number'
        placeholder='Amount'
        className='px-1 py-2 border rounded text-lg'
        value={transactionData.amount}
        onChange={(e) => setTransactionData({ ...transactionData, amount: parseFloat(e.target.value) })}
      />
      <input
        type='text'
        placeholder='Status'
        className='px-1 py-2 border rounded text-lg'
        value={transactionData.status}
        onChange={(e) => setTransactionData({ ...transactionData, status: e.target.value })}
      />
      <button
        onClick={handleTransaction}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Make Transaction
      </button>
      <Link to='/report' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>View Reports</Link>
    </div>
  );
}

export default TransactionPage;