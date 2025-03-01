import Image from "next/image";
import Link from "next/link";
import React from "react";

const Badge = () => {
  return (
    <Link
      href="https://github.com/yourusername/yourrepository"
      target="_blank"
      className="github-badge"
    >
      <Image src="/assets/github.svg" alt="GitHub" width={18} height={18} />
      made by rosie-roses 🌹
    </Link>
  );
};

export default Badge;
