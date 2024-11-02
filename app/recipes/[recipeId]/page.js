'use client'
import Image from "next/image"
import { IoIosSearch } from "react-icons/io"
import { use, useState, useEffect } from "react"
import axios from "axios"

export default function Page({ params }){
    params = use(params)
    const recipeId = params.recipeId

    const [data, setData] = useState([])

    const apiFetch = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiId = process.env.NEXT_PUBLIC_API_ID;
        await axios
        .get(`https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${apiId}&app_key=${apiKey}`)
        .then(res => {
            const items = res.data.recipe
            setData(items)
        })
        .catch(err => {
            console.log(err)
        }) 
    }
    useEffect(() => {
        apiFetch()
    }, [])

    const totalNutrients = data.totalNutrients

    return(
        <div className="2xl:container mx-auto px-2">
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
                <a className="text-gray-600" href="/recipes">Recipes</a>
                <a className="text-gray-600" href="#">About</a>
                <a className="text-gray-600" href="#">Contact</a>
                </div>
                <div className="flex items-center">
                <button type="button" className="rounded-full bg-gray-300 p-2">
                    <IoIosSearch size={25}/>
                </button>
                </div>
            </nav>
            {Object.keys(data).length > 0 &&
            <main className="flex flex-col items-center mt-14 space-y-4">
                <div className="w-[800px] h-[600px] overflow-hidden rounded-lg">
                    <img className="w-full h-full object-fill" src={data.image} alt={data.label} />                        
                </div>
                <h2 className="text-3xl font-bold">{data.label}</h2>
                <div>
                    <span className="text-sm text-slate-700">Labels: {data.healthLabels}</span>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-2xl font-semibold">What you'll need</h3>
                    {data.ingredients.map((item, index) => {
                        return <span key={index}>{item.text}</span>
                    })}
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">Nutritional values</h3>
                    <span>Serving size: {Math.round(data.totalWeight)}g</span>
                    <table className="border">
                        <tbody>
                            <tr>
                                <td className="border border-slate-700">{totalNutrients.ENERC_KCAL.label}</td>
                                <td className="border border-slate-700">{Math.round(totalNutrients.ENERC_KCAL.quantity)}{totalNutrients.ENERC_KCAL.unit}</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-700">{totalNutrients.FAT.label}</td>
                                <td className="border border-slate-700">{Math.round(totalNutrients.FAT.quantity)}{totalNutrients.FAT.unit}</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-700">{totalNutrients.CHOCDF.label}</td>
                                <td className="border border-slate-700">{Math.round(totalNutrients.CHOCDF.quantity)}{totalNutrients.CHOCDF.unit}</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-700">{totalNutrients.PROCNT.label}</td>
                                <td className="border border-slate-700">{Math.round(totalNutrients.PROCNT.quantity)}{totalNutrients.PROCNT.unit}</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-700">{totalNutrients.NA.label}</td>
                                <td className="border border-slate-700">{Math.round(totalNutrients.NA.quantity)}{totalNutrients.NA.unit}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            }
        </div>
    )
}