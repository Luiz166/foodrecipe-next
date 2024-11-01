'use client'
import axios from "axios"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Card from "../components/Card";
import "./style.css"

export default function Recipes(){

    const [recipes, setRecipes] = useState([])

    const trendingRecipes = recipes.slice(0, 5);
    const recentRecipes = recipes.slice(5, 10);
    
    
    const apiFetch = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiId = process.env.NEXT_PUBLIC_API_ID;

        await axios
        .get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}&q=food&to=20`)
        .then(res => {
            const data = res.data.hits            
            setRecipes(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        apiFetch();
    }, []);

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if(scrollRef.current){
            scrollRef.current.scrollBy({left: -300, behavior: 'smooth'});
        }
    }

    const scrollRight = () => {
        if(scrollRef.current){
            scrollRef.current.scrollBy({left: 300, behavior: 'smooth'});
        }
    }

    return(
        <div className="2xl:container mx-auto">
            <header className="flex items-center">
                <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                />
                <input placeholder="Search for a recipe..." type="text" 
                className="outline-none border rounded-lg py-1 px-2 border-[#a7cd3a] w-full" />
            </header>
            <main className="mt-24 flex flex-col space-y-32 px-3">
                <div>
                    <h1 className="font-bold text-3xl">Trending</h1>
                    <div className="flex items-center mt-5">
                        <button onClick={scrollLeft} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        ←
                        </button>
                        <div className="flex flex-row space-x-5 overflow-x-auto px-5 carousel items-center" ref={scrollRef}>
                            {trendingRecipes.map((item, index) => {
                                return <Card data={item} key={index}/>
                            })}
                        </div>
                        <button onClick={scrollRight} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        →
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-3xl">Recent</h1>
                    <div className="flex items-center mt-5">
                        <button onClick={scrollLeft} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        ←
                        </button>
                        <div className="flex flex-row space-x-5 overflow-x-auto px-5 carousel items-center" ref={scrollRef}>
                            {recentRecipes.map((item, index) => {
                                return <Card data={item} key={index}/>
                            })}
                        </div>
                        <button onClick={scrollRight} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        →
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}