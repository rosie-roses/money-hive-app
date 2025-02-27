import Image from "next/image";
import React from "react";
import Copy from "./Copy";
import Link from "next/link";

const CreditCard = ({ account, showBalance = true }: CreditCardProps) => {
  return (
    <div
      key={account.id}
      className="relative w-full h-full max-h-[230px] max-w-[360px]"
    >
      <Link
        href={`transaction-history/?id=${account.appwriteItemId}`}
        className="block w-full h-full"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#111111] to-[#333333] rounded-lg p-4 text-white shadow-lg overflow-hidden">
          <div className="flex justify-between items-center w-full absolute top-4 left-0 right-0 px-4">
            <div className="flex-shrink-0">
              <Image
                src="/assets/paywave.svg"
                width={15}
                height={15}
                alt="PayWave"
              />
            </div>

            <div className="flex-shrink-0">
              <Image src="/assets/visa.svg" width={48} height={32} alt="Visa" />
            </div>
          </div>

          <div className="flex flex-col items-start w-full absolute top-[32%] left-0 right-0 px-4 font-roboto-mono">
            <div className="text-xl font-bold mb-2 truncate w-full">
              {account.name}
            </div>
            <div className="text-xl font-mono tracking-wide">
              **** **** **** {account.mask}
            </div>
          </div>

          <div className="flex justify-between items-center w-full absolute bottom-4 left-0 right-0 px-4 font-roboto-mono">
            <div className="flex flex-col">
              <span className="text-xs text-[#c5c5c5] mb-1 truncate">
                Available balance
              </span>
              <p>${account.availableBalance} USD</p>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-[#c5c5c5] mb-1 truncate">
                Expiry date
              </span>
              <p>●● / ●●</p>
            </div>

            <div className="flex flex-col">
              <Image src="/assets/chip.svg" width={48} height={32} alt="Chip" />
            </div>
          </div>
        </div>
      </Link>
      {showBalance && <Copy title={account?.sharableId} />}
    </div>
  );
};

export default CreditCard;
