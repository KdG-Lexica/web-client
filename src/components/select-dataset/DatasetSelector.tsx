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
        setModels(data);
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center">
            <p className="dark:text-white text-2xl p-4 text-zinc-800 font-bold">Choose a dataset</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {models.map((m) => {
                    return (
                        <DatasetCard key={m.id} id={m.id} name={m.collectionName} description={"2M+ datapoints collected from the New York Times. Browse through documents in a 3D space and explore different clusters.".substring(0, 150).concat("...")} />
                    )
                })}
            </div>
        </div>
    )
};