import React, { useState } from 'react';
import { useQuery, useAction, getUser, updateUser } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { data: user, isLoading, error } = useQuery(getUser);
  const updateUserFn = useAction(updateUser);
  const [newProfileInfo, setNewProfileInfo] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateProfile = () => {
    updateUserFn({ userId: user.id, profileInfo: newProfileInfo });
    setNewProfileInfo('');
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Profile Information</h2>
      <div className='mb-4'>
        <p><span className='font-bold'>Username:</span> {user.username}</p>
        <p><span className='font-bold'>Email:</span> {user.email}</p>
        <p><span className='font-bold'>Role:</span> {user.role}</p>
        <p><span className='font-bold'>Status:</span> {user.status}</p>
      </div>
      <div className='mb-4'>
        <textarea
          value={newProfileInfo}
          onChange={(e) => setNewProfileInfo(e.target.value)}
          placeholder='Enter new profile information'
          className='w-full p-2 border rounded'
        ></textarea>
      </div>
      <button
        onClick={handleUpdateProfile}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Update Profile
      </button>
      <Link to='/dashboard' className='block mt-4 text-blue-500 hover:underline'>Go to Dashboard</Link>
    </div>
  );
};

export default ProfilePage;