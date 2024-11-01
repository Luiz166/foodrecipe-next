export default function Card(data){
    return(
        <div className="card border p-2 rounded-lg shadow-md items-center flex flex-col">
            <div className="w-[300px] h-[300px]">
                <img className="h-full w-full object-cover" src={data.data.recipe.images.REGULAR.url} alt={data.data.recipe.label}/>
            </div>
            <span className="text-nowrap text-lg font-semibold">
                {data.data.recipe.label}
            </span>
            <div className="flex justify-between w-full">
                <span>
                    Calories:
                </span>
                <span className="text-[#a7cd3a]">
                    {Math.round(data.data.recipe.calories)}
                </span>
            </div>
        </div>
    )
}