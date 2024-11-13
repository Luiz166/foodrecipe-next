import { IoIosSearch } from "react-icons/io"
import Image from "next/image";
import { React, useState} from "react";

export default function HomeNavbar(){
    
    const [isShown, setIsShown] = useState(false)

    const searchBtn = () => {
        if(isShown){
            setIsShown(false)
        }else{
            setIsShown(true)
        }
    }

    const inputStyle = {
        "display": isShown ? 'block' : 'hidden',
        "name": isShown ? 'hidden' : 'block',
        "justify": isShown ? ''  : 'justify-between'
    }
    
    return(
        <nav className={`flex items-center ${inputStyle.justify} px-1 sm:px-5`}>
                <div className="flex items-center w-20">
                <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                />
                <span className={`${inputStyle.name} font-bold text-3xl`}>Recify</span>
                </div>
                <div className="flex space-x-10">
                <a className="text-gray-600 hidden sm:block" href="/recipes">Recipes</a>
                <a className="text-gray-600 hidden sm:block" href="#">About</a>
                <a className="text-gray-600 hidden sm:block" href="#">Contact</a>
                </div>
                <div className="flex items-center ">
                <input className={`${inputStyle.display} w-full outline-none border border-t-0 border-x-0 border-b-slate-[1]`} type="text" placeholder="Search..." />
                <button type="button" onClick={searchBtn} className="rounded-full bg-gray-300 p-2">
                    <IoIosSearch size={25}/>
                </button>
                </div>
        </nav>
    )
}