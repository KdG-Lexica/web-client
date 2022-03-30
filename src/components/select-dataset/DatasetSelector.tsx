import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi";
import ModelType from "../../types/ModelType";
import { DatasetCard } from "./DatasetCard";

/** 
 * DatasetSelector
 * Renders all datasetcards inside the home page.
 * @component
 * @example
 * <Route path="/" element={<DatasetSelector />} />
*/
export const DatasetSelector = () => {
    const [models, setModels] = useState<ModelType[]>([]);

    /* health check returns auth cookie required to get datasets*/
    const { isLoading } = useQuery("getHealth", () => getHealth());

    const getHealth = async () => {
        const data = await documentApi.getHealth();
    }

    const {
        refetch
    } = useQuery("getModels", () => getModels, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    useEffect(() => {
        if (!isLoading) {
            refetch();
        }
    }, [isLoading])

    const getModels = async () => {
        let data = await documentApi.getModels();
        setModels(data);
    };

    return (
        <div className="flex flex-col items-center h-full justify-center">
            <p className="dark:text-white text-2xl p-4 text-zinc-800 font-bold">Choose a dataset</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
                {models.map((m) => {
                    return (
                        <DatasetCard key={m.id} unLocked={m.unlocked} id={m.id} name={m.title} description={m.description === null ? "No description available..." : m.description.substring(0, 150).concat("...")} />
                    )
                })}
            </div>
        </div>
    )
};