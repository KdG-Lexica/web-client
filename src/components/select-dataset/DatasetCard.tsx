import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"

export interface DatasetCardPropsType {
    id: string
    name: string;
    description: string;
    unLocked: boolean;
}
/** 
 * Datasetcard 
 * Renders a card component for all available models / datasets.
 * It appears on the home page and you can select the initial datasize to improve performance on low end devices.
 * @component
 * @example
 * <DatasetCard key={m.id} id={m.id} name={m.collectionName} description={"2M+ datapoints collected from the New York Times. Browse through documents in a 3D space and explore different clusters.".substring(0, 150).concat("...")} />
*/
export const DatasetCard = (props: DatasetCardPropsType) => {
    const navigate = useNavigate();
    const [dataPercentage, setDataPercentage] = useState<number>(0.5);
    const [unLocked, setUnLocked] = useState(props.unLocked);
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState(false);

    const toInitCap = (input: string): string => {
        return input[0].toUpperCase() + input.substring(1, input.length);
    };

    const updateDataPercentage = (e: any) => {
        setDataPercentage(e.target.value);
    }

    const navigateToViewer = () => {
        navigate(`/viewer?size=${dataPercentage}&set=${props.id}`);
    }

    const { mutate } = useMutation(documentApi.unlockSet, {
        onSuccess: (data) => {
            setUnLocked(true);
        },
        onError: (error: any) => {
            setShowError(true)
        }
    });

    function unlock() {
        mutate({ model: props.id, password: password })
    }

    const handleKeyDown = (e: any) => {
        setShowError(false)
        if (e.key === 'Enter') {
            unlock();
        }
    }

    return (
        <div className="mx-3.5 md:mx-0 block p-6 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-800 dark:text-white">{toInitCap(props.name)}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
            {!unLocked ?
                <>
                    <label className="py-2.5" htmlFor="password">This dataset is locked. Enter the correct password and press enter.</label>
                    <div className="relative mt-4 transition-all">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input type="password" id="password" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => { setPassword(e.target.value) }} className={`${showError ? "bg-red-50 border focus:ring-red-500 focus:border-red-500 border-red-500 text-red-900 placeholder-red-700 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"} text-sm rounded-lg  block w-80 pl-10 p-2.5 `} placeholder="Enter password" autoComplete="off" />
                    </div>
                    {showError && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> This password is incorrect!</p>}
                </>
                :
                <>
                    <div className="hidden md:block text-center py-4 transition-all">
                        <div className="p-2 bg-gray-200 dark:bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                            <span className="flex rounded-full bg-yellow-400 dark:bg-yellow-400 text-gray-900 uppercase px-2 py-1 text-xs font-bold mr-3">Warning</span>
                            <span className="font-semibold mr-2 text-left text-gray-900 dark:text-gray-100 flex-auto">Lower the data size if you have performance issues</span>
                        </div>
                    </div>
                    <div className="hidden md:block flex flex-col space-y-2 p-2 w-80 mb-2">
                        <input value={dataPercentage}
                            onChange={(e) => updateDataPercentage(e)}
                            type="range" className="w-full" min="0.25" max="1" step="0.25" />
                        <ul className="flex justify-between w-full px-[10px] pb-6">
                            <li className="flex justify-center relative dark:text-gray-400" value={0.25}><span className="absolute">25%</span></li>
                            <li className="flex justify-center relative dark:text-gray-400" value={0.50}><span className="absolute">50%</span></li>
                            <li className="flex justify-center relative dark:text-gray-400" value={0.75}><span className="absolute">75% </span></li>
                            <li className="flex justify-center relative dark:text-gray-400" value={1}><span className="absolute">100%</span></li>
                        </ul>
                    </div>
                    <button onClick={() => navigateToViewer()} className="inline-flex items-center py-2  px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Browse data
                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </>

            }
        </div>
    )
}
