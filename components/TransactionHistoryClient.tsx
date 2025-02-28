"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { formatAmount } from "@/lib/utils";
import { getAccount } from "@/lib/actions/bank.actions";
import { useSearchParams, useRouter } from "next/navigation";

interface TransactionHistoryProps {
  accounts: Account[];
  initialSelectedAccountId: string;
  initialTransactions: any[];
}

const TransactionHistoryClient: React.FC<TransactionHistoryProps> = ({
  accounts,
  initialSelectedAccountId,
  initialTransactions,
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    initialSelectedAccountId
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") as string) || 1;
  const rowsPerPage = 10;

  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [totalTransactions, setTotalTransactions] = useState<any[]>(initialTransactions);

  // Fetch transactions for the current account and page
  const fetchTransactionsForAccount = async (
    accountId: string,
    page: number
  ) => {
    const account = await getAccount({ appwriteItemId: accountId });
    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    setTotalTransactions(account?.transactions);
    return account?.transactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );
  };

  // Update the current page whenever the URL page query changes
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page") as string) || 1;
    setCurrentPageState(pageFromUrl);
  }, [searchParams]);

  // Update transactions when account or page changes
  useEffect(() => {
    const loadTransactions = async () => {
      const newTransactions = await fetchTransactionsForAccount(
        selectedAccountId,
        currentPageState
      );
      setTransactions(newTransactions);
    };
    loadTransactions();
  }, [selectedAccountId, currentPageState]);

  const totalPages = Math.ceil(totalTransactions?.length / rowsPerPage);

  // Handle account selection change
  const handleAccountSelect = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const accountId = event.target.value;
    // Update the URL to reflect the selected account without resetting the page
    router.push(
      `/transaction-history?id=${accountId}&page=1`,
      { scroll: false }
    );
    setSelectedAccountId(accountId);
    setCurrentPageState(1); 
  };

  const account = accounts.find(
    (acc) => acc.appwriteItemId === selectedAccountId
  );

  return (
    <div>
      <div>
        <label htmlFor="accountSelect" className="text-white">
          Select Account
        </label>
        <select
          id="accountSelect"
          value={selectedAccountId}
          onChange={handleAccountSelect}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          {accounts.map((account: Account) => (
            <option key={account.appwriteItemId} value={account.appwriteItemId}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      <div className="transactions-account my-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-18 font-bold text-white">{account?.name}</h2>
          <p className="text-14 text-blue-25">{account?.officialName}</p>
          <p className="text-16 font-semibold tracking-[1.1px] text-white">
            **** **** **** <span className="text-16">{account?.mask}</span>
          </p>
        </div>
        <div className="transactions-account-balance">
          <p className="text-14">Current balance</p>
          <p className="text-24 text-center font-bold">
            {formatAmount(account?.currentBalance ?? 0)}
          </p>
        </div>
      </div>

      <section className="flex w-full flex-col gap-6">
        <TransactionsTable transactions={transactions} />

        {totalPages > 1 && (
          <div className="my-4 w-full">
            <Pagination totalPages={totalPages} page={currentPageState} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TransactionHistoryClient;
