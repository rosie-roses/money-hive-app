import HeaderBox from "@/components/HeaderBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import TransactionHistoryClient from "@/components/TransactionHistoryClient";

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
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
  const selectedAccountId = id || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId: selectedAccountId });

  const rowsPerPage = 10;
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
      <TransactionHistoryClient
        accounts={accountsData}
        initialSelectedAccountId={selectedAccountId}
        initialTransactions={currentTransactions}
      />
    </div>
  );
};

export default TransactionHistory;
