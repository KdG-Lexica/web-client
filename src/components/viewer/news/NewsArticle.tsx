import useQueryParams from "../../../hooks/useQueryParams"

export const NewsArticle = () => {
    const id = useQueryParams();
    console.log(id);

    return (
        <div className="flex items-center h-full justify-center font-medium text-black dark:text-white">
            <p className="dark:text-white text-2xl p-4 text-zinc-800 font-bold">Article not written yet!</p>
        </div>
    )
}
