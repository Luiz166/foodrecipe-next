'use client'
import axios from "axios"
import { useState, useEffect } from "react";
import Image from "next/image";

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
            <main className="mt-24 flex flex-col px-3">
                <div>
                    <h1 className="font-bold text-3xl">Trending</h1>
                </div>
            </main>
        </div>
    )
}