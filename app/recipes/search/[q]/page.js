'use client'
import Card from '@/app/components/Card'
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import {useState, useEffect, use} from "react"

export default function Page({params}){
    params = use(params)
    const search = params.q

    const [searchItems, setSearchItems] = useState([])
    const searchAPI = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiId = process.env.NEXT_PUBLIC_API_ID;

        await axios
        .get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}&q=${search}`)
        .then(res => {
            setSearchItems(res.data.hits)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        searchAPI()
    }, [])
    return(
        <div className="2xl:container mx-auto px-2">
            <Navbar/>
            <main className="mt-14">
                <h1 className="text-xl font-semibold">
                    Results for '{search}'
                </h1>
                <div className="flex flex-wrap items-center justify-center">
                    {searchItems.map((data, index) => {
                        return <Card data={data} key={index}/>
                    })}
                </div>
            </main>
        </div>
    )
}