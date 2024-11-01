import Card from "./Card"
import { useRef } from "react"

export default function Carousel({ title, recipes }){
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
        <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <div className="flex items-center mt-5">
                <button onClick={scrollLeft} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    ←
                </button>
                <div className="flex flex-row space-x-5 overflow-x-auto px-5 carousel items-center" ref={scrollRef}>
                    {recipes.map((item, index) => {
                        return <Card data={item} key={index}/>
                    })}
                </div>
                <button onClick={scrollRight} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    →
                </button>
            </div>
        </div>
    )
}