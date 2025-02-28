"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { formatAmount } from "@/lib/utils";
import { getAccount } from "@/lib/actions/bank.actions";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";
import Image from "next/image";

const TransactionHistoryClient = ({
  accounts,
  initialSelectedAccountId,
  initialTransactions,
}: TransactionHistoryProps) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    initialSelectedAccountId
  );
  const [selected, setSeclected] = useState(accounts[0]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") as string) || 1;
  const rowsPerPage = 10;

  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [totalTransactions, setTotalTransactions] =
    useState<any[]>(initialTransactions);

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
  const handleAccountSelect = async (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;
    setSeclected(account);
    router.push(`/transaction-history?id=${id}&page=1`, { scroll: false });
    setSelectedAccountId(account.appwriteItemId);
    setCurrentPageState(1);
  };

  return (
    <div>
      <div>
        <Select
          defaultValue={selected.id}
          onValueChange={(value) => handleAccountSelect(value)}
        >
          <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px]`}>
            <Image
              src="/assets/credit-card.svg"
              width={20}
              height={20}
              alt="account"
            />
            <p className="line-clamp-1 w-full text-left">{selected.name}</p>
          </SelectTrigger>
          <SelectContent className={`w-full bg-white md:w-[300px]`} align="end">
            <SelectGroup>
              <SelectLabel className="py-2 font-normal text-gray-500">
                Select a bank to display
              </SelectLabel>
              {accounts.map((account: Account) => (
                <SelectItem
                  key={account.id}
                  value={account.appwriteItemId}
                  className="cursor-pointer border-t"
                >
                  <div className="flex flex-col ">
                    <p className="text-16 font-medium">{account.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="transactions-account my-6 font-roboto-mono">
        <div className="flex flex-col gap-2">
          <h2 className="text-18 font-bold text-white">{selected?.name}</h2>
          <p className="text-14 text-blue-25">{selected?.officialName}</p>
          <div className="flex items-center gap-2">
            <p className="text-20 font-semibold tracking-[1.1px] text-white">
              **** **** ****
            </p>
            <span className="text-16 text-white">{selected?.mask}</span>
          </div>
        </div>
        <div className="transactions-account-balance">
          <p className="text-14">Current balance</p>
          <p className="text-24 text-center font-bold">
            {formatAmount(selected?.currentBalance ?? 0)}
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
