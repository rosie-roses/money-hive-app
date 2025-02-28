import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import CreditCard from "./CreditCard";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccounts } from "@/lib/actions/bank.actions";

const CardsCarousel = async () => {
   const loggedIn = await getLoggedInUser();
  
    const accounts = await getAccounts({ 
      userId: loggedIn?.$id
    });
  
    if (!accounts) {
      return;
    };
  return (
    <section className="w-full flex items-start justify-center">
      <Carousel className="w-full max-w-[80%] md:max-w-[90%]">
        <CarouselContent className="-ml-1">
          {accounts?.data?.map((account: Account) => (
            <CarouselItem
              key={account.id}
              className="pl-1 lg:basis-1/2 xl:basis-1/3"
            >
              <div className="p-2">
                <Card className="max-w-[420px] h-[230px] shadow-none p-0 m-0 border-none overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0 m-0 w-full h-full">
                    <CreditCard key={account.id} account={account} showBalance={false} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CardsCarousel;
