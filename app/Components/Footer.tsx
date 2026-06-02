import img from "../../public/Logo White.png";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-primary px-10 py-20 text-white">
      <div className="w-[80%] flex lg:flex-row gap-10 sm:flex-col flex-col items-center justify-center lg:justify-between m-auto">
        <div className="lg:w-[40%] flex flex-col lg:flex-wrap md:items-start items-center">
          <Image src={img} alt="white-logo" />
          <p className="text-center text-sm md:text-left">
            Your short distance rides, sorted. Hail a Keke on WhatsApp no app
            required.
          </p>
        </div>
        <div className="text-center">
          <p className="font-medium text-white/60">RIDERS</p>
          <ul className="flex flex-col  gap-3 mt-1">
            <Link href={"/auth/rider"}>Sign Up</Link>
            <Link href={"/auth/rider"}>How it Works</Link>
            <Link href={"/auth/rider"}>Why Bamjiye</Link>
          </ul>
        </div>
        <div className="text-center">
          <p className="font-medium text-white/60">DRIVERS</p>
          <ul className="flex flex-col gap-3 mt-1">
            <Link href={"/auth/driver"}>Become a driver</Link>
            <Link href={"#"}>Driver Benefits</Link>
          </ul>
        </div>
        <div className="text-center">
          <p className="font-medium text-white/60">CONNECT</p>
          <ul className="flex flex-col gap-3 mt-1">
            <Link href={"https://instagram.com"}>Instagram</Link>
            <Link href={"www.x.com"}>Twitter / X</Link>
            <Link href={"https://tiktok.com"}>Tiktok</Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}
