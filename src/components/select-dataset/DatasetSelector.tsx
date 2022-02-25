import { useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi";
import ModelType from "../../types/ModelType";
import { DatasetCard } from "./DatasetCard";

export const DatasetSelector = () => {
    const [models, setModels] = useState<ModelType[]>([]);
    const {
        isLoading,
        isError
    } = useQuery("getModels", () => getModels);

    const getModels = async () => {
        const data = await documentApi.getModels();
        setModels(data);
    };


    return (
        <>
            {models.map(m => {
                return (<DatasetCard key={m._id} name={m.collectionName} description={"2M+ datapoints collected from the New York Times. Browse through documents in a 3D space and explore different clusters. "} />)
            })}
        </>
    )
};