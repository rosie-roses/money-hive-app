import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import CreditCard from "./CreditCard"; // Import the CreditCard component

const CardsCarousel = ({ accountsData }: any) => {
  return (
    <section className="w-full flex items-center justify-center">
      <Carousel className="w-full max-w-[90%]">
        <CarouselContent className="-ml-1">
          {accountsData.map((account: any) => (
            <CarouselItem
              key={account.id}
              className="pl-1 lg:basis-1/2 xl:basis-1/3"
            >
              <div className="p-1">
                <Card className="w-full shadow-none p-0 m-0 border-none overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0 m-0 w-full h-full">
                    <CreditCard account={account} />
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
