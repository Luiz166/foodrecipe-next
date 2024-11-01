'use client'
import axios from 'axios'
import {useState, useEffect, use} from "react"

export default function Page({params}){
    params = use(params)
    const search = params.q

    const searchAPI = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiId = process.env.NEXT_PUBLIC_API_ID;

        await axios
        .get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}&q=${search}`)
    }

    useEffect(() => {
        searchAPI()
    }, [])
    return(
        <div>

        </div>
    )
}