import CreditCard from '@/components/CreditCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  
  const accounts = await getAccounts({ 
    userId: loggedIn?.$id
  });

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
          title="My Bank Accounts"
          subtext='Effortlessly manage your banking activities.'
        />
        <div key={accounts?.id} className='space-y-4'>
          <h2 className='header-two'>Your cards</h2>
          <div key={accounts?.id} className='flex flex-wrap gap-6 w-full max-h-[230px] h-[230px]'>
            {accounts && accounts.data.map((a: Account) => (
              <div key={a.id}>
                <CreditCard key={a.id} account={a} showBalance={true}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyBanks;
