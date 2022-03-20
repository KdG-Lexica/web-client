import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi";
import CosineDocumentType from "../../types/CosineDocumentType";

interface CosineDocumentsProps {
    modelId: string;
    range: number;
    documentId: string;
    cosineDocuments: CosineDocumentType[];
    setCosineDocuments : React.Dispatch<React.SetStateAction<CosineDocumentType[]>>;
}

export const CosineDocuments = (props: CosineDocumentsProps) => {
    const [maxCosDocs, setMaxCosDocs] = useState(3);
    const { data, isLoading, refetch} = useQuery("getCosineDocuments", () => documentApi.getCosineDistanceDocuments(props.modelId, props.range, props.documentId));
    
    useEffect(() => {
        refetch();
    }, [props.documentId])

    useEffect(() => {
        if(data !== undefined && data !== null) {
            props.setCosineDocuments(data.rows);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <>
            <p className="font-sans text-slate-400 font-medium text-lg p-2">
                Cosine similar documents
            </p>
            {props.cosineDocuments.slice(1, maxCosDocs).map((document, index) => {
                return (
                    <div key={index} className="m-2 mx-1 md:mx-0 block p-6 max-w-sm max-h-fit  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="d-inline dark:text-white font-semibold">{document.doc.name}</p>
                        <p className="d-inline dark:text-white">value: {document.cosine.toPrecision(2)}</p>
                    </div>
                )
            })}
            <p className={`underline underline-offset-1 dark:text-white text-black cursor-pointer ${maxCosDocs >= 5 ? "hidden" : "block"}`} onClick={() => setMaxCosDocs(maxCosDocs + 3)}>View more</p>
            <p className={`underline underline-offset-1 dark:text-white text-black cursor-pointer ${maxCosDocs >= 5 ? "block" : "hidden"}`} onClick={() => setMaxCosDocs(maxCosDocs - 3)}>View less</p>

        </>
    )
}
