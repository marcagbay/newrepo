import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getUser, getWallet } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser);
  const { data: wallet, isLoading: walletLoading, error: walletError } = useQuery(getWallet);

  if (userLoading || walletLoading) return 'Loading...';
  if (userError || walletError) return 'Error: ' + (userError ? userError : walletError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>User Profile</h1>
      <div className='bg-gray-200 p-4 mb-4 rounded-lg'>
        <p><span className='font-bold'>Username:</span> {user.username}</p>
        <p><span className='font-bold'>Email:</span> {user.email}</p>
        <p><span className='font-bold'>Role:</span> {user.role}</p>
        <p><span className='font-bold'>Status:</span> {user.status}</p>
        <p><span className='font-bold'>Profile Info:</span> {user.profile.info}</p>
      </div>
      <h1 className='text-2xl font-bold mb-4'>Wallet Information</h1>
      <div className='bg-gray-200 p-4 rounded-lg'>
        <p><span className='font-bold'>Balance:</span> {wallet.balance}</p>
        <p><span className='font-bold'>Last Updated:</span> {wallet.lastUpdated}</p>
      </div>
    </div>
  );
}

export default DashboardPage;