import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  
  return (
    <div>Home</div>
  );
}

export default Home;