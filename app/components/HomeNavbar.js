import { IoIosSearch } from "react-icons/io"
import Image from "next/image";
import { React, useState} from "react";
import { useRouter } from "next/navigation";

export default function HomeNavbar(){
    
    const [isShown, setIsShown] = useState(false)
    const [search, setSearch] = useState("")

    const searchOnChange = (e) => {
        setSearch(e.target.value)
    }
    
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
        "justify": isShown ? ''  : 'justify-between',
        "button" : isShown && search != "" ? 'submit' : 'button'
    }
    const router = useRouter()

    const buttonSubmit = async (e) => {
        e.preventDefault()
        await router.push(`/recipes/search/${search}`)
        console.log('submited')
    }
    
    return(
        <nav className={`flex items-center ${inputStyle.justify} sm:justify-between px-1 sm:px-5`}>
                <div className="flex items-center w-20">
                <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                />
                <span className={`${inputStyle.name} sm:block font-bold text-3xl`}>Recify</span>
                </div>
                <div className="flex space-x-10">
                <a className="text-gray-600 hidden sm:block" href="/recipes">Recipes</a>
                <a className="text-gray-600 hidden sm:block" href="#">About</a>
                <a className="text-gray-600 hidden sm:block" href="#">Contact</a>
                </div>
                <form onSubmit={buttonSubmit} className="flex items-center ">
                <input onChange={searchOnChange} value={search} className={`${inputStyle.display} w-full outline-none border border-t-0 border-x-0 border-b-slate-[1]`} type="text" placeholder="Search..." />
                <button type={inputStyle.button} onClick={searchBtn} className="rounded-full bg-gray-300 p-2">
                    <IoIosSearch size={25}/>
                </button>
                </form>
        </nav>
    )
}