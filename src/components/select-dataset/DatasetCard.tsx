import { useState } from "react";

export interface DatasetCardPropsType {
    name: string;
    description: string;
}

export const DatasetCard = (props: DatasetCardPropsType) => {
    const [dataPercentage, setDataPercentage] = useState<number>(0.5);

    const toInitCap = (input: string): string => {
        return input[0].toUpperCase() + input.substring(1, input.length).toLowerCase();
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{toInitCap(props.name)}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>

                <div className="text-center py-4">
                    <div className="p-2 bg-gray-200 dark:bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-yellow-400 dark:bg-yellow-400 text-gray-900 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                        <span className="font-semibold mr-2 text-left text-gray-900 dark:text-gray-100 flex-auto">Lower the data size if you have performance issues</span>
                        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 p-2 w-80 mb-2">
                    <input value={dataPercentage}
                        onChange={(e) => setDataPercentage(parseInt(e.target.value))}
                        type="range" className="w-full" min="0.25" max="1" step="0.25" />
                    <ul className="flex justify-between w-full px-[10px] pb-6">
                        <li className="flex justify-center relative dark:text-gray-400"><span className="absolute">25%</span></li>
                        <li className="flex justify-center relative dark:text-gray-400"><span className="absolute">50%</span></li>
                        <li className="flex justify-center relative dark:text-gray-400"><span className="absolute">75% </span></li>
                        <li className="flex justify-center relative dark:text-gray-400"><span className="absolute">100%</span></li>
                    </ul>
                </div>

                <a className="inline-flex items-center py-2  px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    Browse data
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
        </div>)
}
