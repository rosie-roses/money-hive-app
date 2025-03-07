"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Copy from "./Copy";
import Link from "next/link";

const CreditCard = ({ account, showBalance = true }: CreditCardProps) => {
  const gradientImages = [
    "/assets/gradients/gradient-1.svg",
    "/assets/gradients/gradient-2.svg",
    "/assets/gradients/gradient-3.svg",
    "/assets/gradients/gradient-4.svg",
    "/assets/gradients/gradient-5.svg",
  ];

  const [randomGradient, setRandomGradient] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gradientImages.length);
    setRandomGradient(gradientImages[randomIndex]);
  }, [gradientImages]);

  return (
    <div key={account.id} className="flex flex-col w-full h-full items-start">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="relative flex w-full min-h-[200px] h-full max-h-[230px] max-w-[360px] rounded-lg p-4 text-white shadow-lg"
        style={{
          backgroundImage: `url(${randomGradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
          <div className="text-xl font-roboto-mono">
            **** **** **** {account.mask}
          </div>
        </div>

        <div className="flex justify-between items-center w-full absolute bottom-4 left-0 right-0 px-4 font-roboto-mono">
          <div className="flex flex-col">
            <span className="text-xs text-[#f8f8f8] mb-1 truncate">
              Balance
            </span>
            <p>${account.availableBalance} USD</p>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-[#f8f8f8] mb-1 truncate">
              Expiry Date
            </span>
            <p>●● / ●●</p>
          </div>

          <div className="flex flex-col">
            <Image src="/assets/chip.svg" width={48} height={32} alt="Chip" />
          </div>
        </div>
      </Link>

      {/* Show Copy component below the card */}
      {showBalance && (
        <div className="w-full h-full">
          <Copy title={account?.sharableId} />
        </div>
      )}
    </div>
  );
};

export default CreditCard;
