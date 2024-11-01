'use client'
import axios from "axios"
import { useState, useEffect } from "react";
import Image from "next/image";
import "./style.css"
import Carousel from "../components/Carousel";

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
                <input placeholder="Search for a recipe..." type="text" 
                className="outline-none border rounded-lg py-1 px-2 border-[#a7cd3a] w-full" />
            </header>
            <main className="mt-10 flex flex-col space-y-32 px-3">
                {trendingRecipes.length > 0 && <Carousel title="Trending" recipes={trendingRecipes} />}
                {recentRecipes.length > 0 && <Carousel title="Recent" recipes={recentRecipes} />}
            </main>
        </div>
    )
}