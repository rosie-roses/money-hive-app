import CreditCard from "@/components/CreditCard";
import HeaderBox from "@/components/HeaderBox";
import { CardContent } from "@/components/ui/card";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Card } from "@radix-ui/themes";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });

  return (
    <section className="my-banks">
      <div className="flex flex-col">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />
        <div key={accounts?.id} className="space-y-4">
          <h2 className="header-two mt-5">Your cards</h2>
          <div key={accounts?.id} className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <Card
                  key={a.id}
                  className="max-w-[325px] h-full border-none shadow-none p-0 m-0 overflow-hidden"
                >
                  <CardContent className="flex items-center justify-center p-0 m-0 w-full h-full">
                    <CreditCard key={a.id} account={a} showBalance={true} />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
