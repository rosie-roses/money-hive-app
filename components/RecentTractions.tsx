"use client";

import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";
import { useRouter } from "next/navigation";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const router = useRouter();

  const handleAccountSelect = async (id: string) => {
    router.push(`/?id=${id}&page=1`, { scroll: false });
  };
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <section className="recent-transactions">
      <header className="flex justify-between gap-4 sm:gap-0">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="bg-[#f9fafb] flex overflow-x-auto">
          {accounts.map((account: Account) => (
            <TabsTrigger
              key={account.id}
              value={account.appwriteItemId}
              onClick={() => handleAccountSelect(account.appwriteItemId)}
              className="flex-shrink-0 min-w-[150px] sm:min-w-[200px]"
            >
              <BankTabItem account={account} appwriteItemId={appwriteItemId} />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />
            <TransactionsTable transactions={currentTransactions} />

            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}

            <div className="py-4 max-lg:pb-6">
              <div className="header-two">Top Categories</div>
              <div className="flex flex-col mt-5 space-y-5">
                {categories.map((category, index) => (
                  <Category key={category.name} category={category} />
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
