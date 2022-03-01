import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi";
import ModelType from "../../types/ModelType";
import { DatasetCard } from "./DatasetCard";

export const DatasetSelector = () => {
    const [models, setModels] = useState<ModelType[]>([]);

    const {
        isLoading,
        refetch
    } = useQuery("getModels", () => getModels);

    /* usequery wasnt triggering refresh when you press go back button in browser so added this useeffect */
    useEffect(() => {
        refetch();
    }, [])

    const getModels = async () => {
        let data = await documentApi.getModels();
        console.log(data);

        /* mock data */

        data = [...data, { id: "999", collectionName: "The Bible", meta: [] } as ModelType];
        setModels(data);
    };

    const showSkeleton = () => {
        return (
            <div className="dark:bg-red h-96 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto ">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-6">
                        <div className="h-6 bg-slate-700 rounded col-span-1"></div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-3 bg-slate-700 rounded"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                            </div>
                            <div className="h-3 bg-slate-700 rounded"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-3 bg-slate-700 rounded"></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)

    }

    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <p className="dark:text-white text-2xl p-4 text-zinc-800 font-bold">Choose a dataset</p>
            {isLoading ? showSkeleton() :
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {models.map((m) => {
                        return (
                            <DatasetCard key={m.id} id={m.id} name={m.collectionName} description={"2M+ datapoints collected from the New York Times. Browse through documents in a 3D space and explore different clusters.".substring(0, 150).concat("...")} />
                        )
                    })}
                </div>}
        </div>
    )
};