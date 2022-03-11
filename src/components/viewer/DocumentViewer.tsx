import React, { useEffect, useState } from "react";
import BasicDocumentType from "../../types/BasicDocumentType";
import * as documentApi from "../../api/DocumentApi"
import { useMutation, useQuery } from "react-query";
import ModelType from "../../types/ModelType";
import DocumentLink from "./DocumentLink";
import { CosineDocuments } from "./CosineDocuments";

interface DocumentViewerProps {
    model: ModelType;
    document: BasicDocumentType | null;
    duration: number;
    count: number;
}


const DocumentViewer = (props: DocumentViewerProps) => {
    const [document, setDocument] = useState<any>(null);
    const [isLoading, setIsloading] = useState(false);
    const [links, setLinks] = useState<string[]>([]);


    const { mutate } = useMutation(documentApi.getDocument, {
        onSuccess: (data: any) => {
            setDocument(data);

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
                    <p className="font-sans text-black dark:text-white font-medium text-xl p-2">{props.document!.name}</p>
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
                    <CosineDocuments modelId={props.model.id} documentId={props.document?.id!!} range={0.4} key={props.model.id} />
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
                        <p className="font-sans text-slate-800 dark:text-slate-400 p-2">
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