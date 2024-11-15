'use client'
import Image from "next/image"
import { IoIosSearch } from "react-icons/io"
import { use, useState, useEffect } from "react"
import axios from "axios"
import HomeNavbar from "@/app/components/HomeNavbar"

export default function Page({ params }){
    params = use(params)
    const recipeId = params.recipeId

    const [data, setData] = useState([])
    const [ytbData, setYtbData] = useState({});
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
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

        apiFetch()
    }, [])

    useEffect(() => {
        if(!Object.keys(data).length > 0) return;

        const youtubeFetch = async () => {
            const apiKey = process.env.NEXT_PUBLIC_YTB_API_KEY
            const query = data.label
            await axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&relevanceLanguage=en&key=${apiKey}`)
            .then((res) => {
                const items = res.data
                setYtbData(items)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        youtubeFetch()
    }, [data])

    const totalNutrients = data.totalNutrients

    return(
        <div className="2xl:container mx-auto px-2">
            <HomeNavbar/>
            {Object.keys(data).length > 0 &&
            <main className="flex flex-col items-center mt-14 space-y-4">
                <div className="sm:w-[800px] sm:h-[600px] overflow-hidden rounded-lg">
                    <img className="w-full h-full object-fill" src={data.image} alt={data.label} />                        
                </div>
                <h2 className="text-2xl sm:text-3xl text-center font-bold">{data.label}</h2>
                <div>
                    <span className="text-sm text-slate-700">Labels: {data.healthLabels}</span>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-semibold">What you'll need</h3>
                    {data.ingredients.map((item, index) => {
                        return <span className="text-sm" key={index}>{item.text}</span>
                    })}
                </div>
                <div className="w-full flex flex-col">
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

                    {ytbData.items && Array.isArray(ytbData.items) && ytbData.items.length > 0 ? ( // Check if items exists and is an array
        ytbData.items.map((video, index) => (
          <div className="mt-5 flex flex-col items-center justify-center w-full h-[20rem]" key={index}>
            <h3 className="text-center text-2xl font-semibold">Video Instructions</h3>
            <iframe
              className="w-full h-[80%]"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              ></iframe>
          </div>
        ))
    ) : (
        <p>No YouTube videos found.</p>
      )}
            </main>
            }
        </div>
    )
}