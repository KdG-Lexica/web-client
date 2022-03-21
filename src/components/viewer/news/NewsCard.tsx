import { useNavigate } from "react-router-dom";

export interface NewsCardProps {
    title: string;
    description: string;
    id: number;
    fullText: string;
}

/**
 * Newscard that previews articles to read.
 * 
 * @component
 * @example
 * return (
    <NewsCard {...n} key={n.id} />
 * )
 */
export const NewsCard = (props: NewsCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ flexBasis: "30%" }}>
            <a href="#">
                <img className="rounded-t-lg" src="/news_photos/march11update.png" alt="update photo" />
            </a>
            <div className="p-5">
                <div className="div flex flex-row">
                    <div className="py-1.5 px-5 mr-2 mb-2 text-sm w-fit font-medium text-gray-900 bg-gray-200 border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">#Sprint2</div>
                    <div className="py-1.5 px-5 mr-2 mb-2 text-sm w-fit font-medium text-gray-900 bg-gray-200 border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">#March11th</div>
                </div>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
                <div onClick={() => navigate("/news/1")} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>
            </div>
        </div>
    )
}
