"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo-b.png";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const navItems = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Bamjiye", href: "#why" },
    { name: "For Keke Drivers", href: "#keke-drivers" },
  ];

  const handleScroll = (e: any, href: string) => {
    e.preventDefault();
    setNav(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="max-w-7xl md:px-6 px-3 m-auto my-5 py-2 relative z-50">
      <div className="flex items-center justify-between h-10">
        <Link href={"/"} className="flex h-20 items-center gap-2">
          <Image className="h-12 md:w-28 w-24" src={logo} alt="logo" />
        </Link>

        <div className="hidden lg:flex items-center lg:gap-12 gap-5 font-sans">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="px-2 font-medium text-gray-800 transition hover:text-primary"
              onClick={(e) => handleScroll(e, item.href)}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href={"/auth/rider"}
            className="bg-primary py-3 shadow-xl text-sm cursor-pointer hover:scale-95 transition px-7 rounded-full text-white"
          >
            Sign Up as Rider
          </Link>
        </div>

        <button
          onClick={() => setNav(true)}
          className="md:block lg:hidden sm:hidden border p-2 rounded-xl border-gray-300 cursor-pointer hover:scale-95 transition"
        >
          <MenuIcon className="text-gray-700" />
        </button>

        <AnimatePresence>
          {nav && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setNav(false)}
                className="fixed inset-0 bg-black/40 md:block sm:h-hidden lg:hidden"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-screen w-[80%] backdrop-blur-2xl bg-white/70 shadow-2xl lg:hidden  flex flex-col items-center justify-center gap-10 z-50"
              >
                <button
                  onClick={() => setNav(false)}
                  className="absolute top-6 right-6 cursor-pointer font-bold text-2xl"
                >
                  ×
                </button>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-lg font-medium text-gray-800"
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href={"/auth/rider"}
                  className="bg-primary py-3 px-7 rounded-full text-white shadow-xl"
                >
                  Sign Up as Rider
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
