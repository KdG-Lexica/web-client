import React, { useEffect, useState } from "react";
import BasicDocumentType from "../../types/BasicDocumentType";
import * as documentApi from "../../api/DocumentApi"
import { useMutation, useQuery } from "react-query";
import ModelType from "../../types/ModelType";
import DocumentLink from "./DocumentLink";
import { CosineDocuments } from "./CosineDocuments";
import CosineDocumentType from "../../types/CosineDocumentType";

interface DocumentViewerProps {
    model: ModelType;
    document: BasicDocumentType | null;
    duration: number;
    count: number;
    cosineDocuments: CosineDocumentType[];
    showingCosine: boolean;
    setClickedDocument: React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
    setCosineDocuments: React.Dispatch<React.SetStateAction<CosineDocumentType[]>>;
    setShowingCosine: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 
 * Component for bundling all document related information.
 * 
 * @component
 * @example
 * return(
        <DocumentViewer
            model={model}
            document={clickedDocument}
            duration={dataset.duration}
            count={dataset.count}
            setClickedDocument={setClickedDocument}
            setFocus={setFocus}
            cosineDocuments={cosineDocuments}
            setCosineDocuments={setCosineDocuments}
            showingCosine={showingCosine}
            setShowingCosine={setShowingCosine}
        />
 * 
*/

const DocumentViewer = (props: DocumentViewerProps) => {
    const [document, setDocument] = useState<any>(null);
    const [isLoading, setIsloading] = useState(false);
    const [links, setLinks] = useState<string[]>([]);


    const { mutate } = useMutation(documentApi.getDocument, {
        onSuccess: (data: any) => {
            setDocument(data.meta);

            const dataLinks = JSON.stringify(data).match(/(?<=")https?:\/\/[^\"]+/g);

            if (dataLinks !== null && dataLinks?.length > 0) {
                setLinks(dataLinks);
            } else {
                setLinks([]);
            }

            setIsloading(false);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (props.document !== null) {
            setIsloading(true);
            mutate({ model: props.model.id, document: props.document.id })
        } else {
            setDocument(null);
        }
    }, [props.document])



    if (isLoading) {
        return (
            <p className="text-black font-medium dark:text-white">
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                </svg>
                Searching...
            </p>
        )
    }

    return (
        <div className="flex flex-col justify-start items-start h-full p-2 overflow-auto space-y-4" style={{ maxHeight: "calc(100vh - 80px)" }}>
            {document !== null ?
                <div className="bg-slate-100 dark:bg-neutral-900 min-w-1/4 max-w-1/4 p-2">
                    <div className="max-h-9 flex-row flex justify-start items-stretch space-x-2s">
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2" onClick={() => { setDocument(null); props.setClickedDocument(null) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2" onClick={() => { props.setFocus(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm p-2" onClick={() => { props.setShowingCosine(!props.showingCosine) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </button>
                    </div>
                    <p className="font-sans text-black dark:text-white font-medium text-xl p-2">{props.document!.name}</p>
                    {props.model.meta.map(metaData => {
                        return (
                            <div key={metaData.key}>
                                <p className="font-sans text-slate-400 font-medium text-lg p-2">
                                    {metaData.name}
                                </p>
                                <p className="font-sans text-slate-700 dark:text-slate-100 p-2">
                                    {metaData.type === "string" && document[metaData.key]}
                                    {metaData.type === "date" && new Date(document[metaData.key]).toLocaleDateString()}
                                </p>
                            </div>
                        )
                    })}
                    {links.length > 0 &&
                        <div>
                            <p className="font-sans text-slate-400 font-medium text-lg p-2">
                                Document Links
                            </p>
                            {links.map(link => {
                                return (
                                    <DocumentLink key={link} link={link} />
                                )
                            })}
                        </div>
                    }
                    <CosineDocuments cosineDocuments={props.cosineDocuments} setCosineDocuments={props.setCosineDocuments}
                        modelId={props.model.id} documentId={props.document?.id!!} range={0.4} key={props.model.id} />
                </div>
                :
                <>
                    <div className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                        <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Current search</p>
                        <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                            Fetched {props.count} documents in {props.duration}ms.
                        </p>
                    </div>
                    <div className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                        <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">Dataset</p>
                        <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                            Name: {props.model.collectionName}
                        </p>
                        <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                            Id: {props.model.id}
                        </p>
                    </div>
                    <div className="rounded bg-slate-100 dark:bg-slate-800 min-w-full p-2">
                        <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">How to navigate</p>
                        <p className="font-sans text-slate-600 dark:text-slate-400 p-2">
                            Tutorial
                        </p>
                    </div>
                </>
            }
        </div>
    )
}

export default DocumentViewer;