import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image 
            src="/assets/auth-image.svg"
            alt="Auth image"
            width={580}
            height={700}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
}