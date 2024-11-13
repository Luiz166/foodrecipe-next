'use client'
import Image from "next/image";
import HomeNavbar from "./components/HomeNavbar";

export default function Home() {
  return (
    <div className="2xl:container mx-auto">
      <HomeNavbar/>
      <main className="mt-20 sm:mt-36 flex flex-col sm:flex-row items-center justify-center sm:space-x-5 space-y-5">
        <div className="flex flex-col items-center justify-center w-96 space-y-5">
          <span className="text-[#a7cd3a] font-bold text-2xl sm:text-4xl">
            Cooking 
            <span className="text-black"> with fun made easy and accessible</span>
          </span>
          <span className="text-sm text-gray-600">
            It's easy to use and offers a variety of irresistable recipes that
            appeal to beginners and experts alike. Ready to get cooking?
          </span>
          <div className="flex space-x-5">
            <a href="/recipes"
            className="bg-[#b1f8f2] text-white rounded-lg p-2 font-bold sm:text-2xl">Get started</a>
            <button type="button"
            className="bg-[#d5bbb1] text-white rounded-lg p-2 font-bold sm:text-2xl">Learn more</button>
           </div>
        </div>
        <div className="overflow-hidden flex items-center justify-center sm:block sm:rounded-r-2xl">
          <Image
            src="/food-pexelsimg.jpg"
            width={600}
            height={600}
            alt="food-pic"
          />
        </div>
      </main>
    </div>
  );
}
