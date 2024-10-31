import Image from "next/image";
import { IoIosSearch } from "react-icons/io"

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between px-5">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
          />
          <span className="font-bold text-4xl">Recify</span>
        </div>
        <div className="flex space-x-10">
          <a className="text-gray-600" href="#">Recipes</a>
          <a className="text-gray-600" href="#">About</a>
          <a className="text-gray-600" href="#">Contact</a>
        </div>
        <div className="flex items-center">
          <button type="button" className="rounded-full bg-gray-300 p-2">
            <IoIosSearch size={25}/>
          </button>
        </div>
      </nav>
      <main className="mt-10 flex items-center justify-center space-x-5">
        <div className="flex flex-col items-center justify-center w-96 space-y-5">
          <span className="text-[#a7cd3a] font-bold text-3xl">
            Cooking 
            <span className="text-black"> with fun made easy and accessible</span>
          </span>
          <span className="text-sm text-gray-600">
            It's easy to use and offers a variety of irresistable recipes that
            appeal to beginners and experts alike. Ready to get cooking?
          </span>
          <div className="flex space-x-5">
            <button type="button" 
            className="bg-[#b1f8f2] text-white rounded-lg p-2 font-bold text-2xl">Get started</button>
            <button type="button"
            className="bg-[#d5bbb1] text-white rounded-lg p-2 font-bold text-2xl">Learn more</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-r-2xl">
          <Image
            src="/food-pexelsimg.jpg"
            width={500}
            height={500}
            alt="food-pic"
          />
        </div>
      </main>
    </div>
  );
}
