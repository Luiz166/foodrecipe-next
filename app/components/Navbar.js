import Image from "next/image"
import { IoIosSearch } from "react-icons/io"
import { useState } from "react"

export default function Navbar(){
    const [search, setSearch] = useState("")
    const searchOnChange = (e) => {
        setSearch(e.target.value)
    }
    return(
        <div className="2xl:container mx-auto px-2">
            <header className="flex items-center">
                <a href="/">
                    <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        alt="Logo"
                        />
                </a>
                <form className="flex w-full" action={`/recipes/search/${search}`}>
                    <input onChange={searchOnChange} value={search} required placeholder="Search for a recipe..." type="text" 
                    className="outline-none border rounded-l-lg py-1 px-2 border-[#a7cd3a] w-full" />
                    <button type="submit" className="rounded-r-lg w-10 flex items-center justify-center text-white text-2xl bg-[#a7cd3a]">
                        <IoIosSearch/>
                    </button>
                </form>
            </header>
        </div>
    )
}