import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi";

interface CosineDocumentsProps {
    modelId: string;
    range: number;
    documentId: string;
}

interface DataRow {
    cosine: number;
    doc: {
        id: string;
        name: string;
        date: string;
        vector$x: number;
        vector$y: number;
        vector$z: number;
    }
}


export const CosineDocuments = (props: CosineDocumentsProps) => {
    const { data, isLoading } = useQuery("getCosineDocuments", () => documentApi.getCosineDistanceDocuments(props.modelId, props.range, props.documentId));

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
            {data.rows.slice(1, 6).map((r: DataRow) => {
                return (
                    <div className="m-2 mx-1 md:mx-0 block p-6 max-w-sm max-h-fit  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="d-inline dark:text-white font-semibold">{r.doc.name}</p>
                        <p className="d-inline dark:text-white">value: {r.cosine.toPrecision(2)}</p>
                    </div>
                )
            })}
        </>
    )
}
