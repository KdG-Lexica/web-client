import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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
    // const [models, setModels] = useState<ModelType[]>([]);
    const navigate = useNavigate();

    /* Mocked model for testing UI*/

    const [models, setModels] = useState<ModelType[]>([{
        center: {
            x: 6.573844437735377,
            y: 3.3766249573716065,
            z: 2.64193414412726
        }, collectionName: "Test collection", createdAt: new Date(), description: "test collection to test UI", documentCount: 0, id: "9999", meta: [], requiresPassword: true, title: "Test collection", unlocked: false, updatedAt: new Date()
    } as ModelType]);

    /* health check returns auth cookie required to get datasets*/
    // const { isLoading } = useQuery("getHealth", () => getHealth());

    // const getHealth = async () => {
    //     try {
    //         await documentApi.getHealth();
    //     } catch {
    //         navigate("/server-error")
    //     }
    // }

    // const {
    //     refetch
    // } = useQuery("getModels", () => getModels, {
    //     refetchOnWindowFocus: false,
    //     enabled: false
    // });

    // const getModels = async () => {
    //     let data = await documentApi.getModels();
    //     setModels(data);
    // };
    // useEffect(() => {
    //     if (!isLoading) {
    //         refetch();
    //     }
    // }, [isLoading])


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