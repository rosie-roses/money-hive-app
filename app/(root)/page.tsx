import CardsCarousel from "@/components/CardsCarousel";
import HeaderBox from "@/components/HeaderBox";
import RecentTractions from "@/components/RecentTractions";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { id, page } = await searchParams;

  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });

  if (!accounts) {
    return;
  }

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId: appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName + " " + loggedIn?.lastName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <div className="flex flex-col items-start mt-4">
          <div className="flex flex-row justify-between gap-x-4 items-center mb-8">
            <h2 className="text-24 font-semibold">My banks</h2>
          </div>
          <CardsCarousel />
        </div>

        <RecentTractions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
    </section>
  );
};

export default Home;
