import React, { useEffect, useState } from "react";
import BasicDocumentType from "../../types/BasicDocumentType";
import * as documentApi from "../../api/DocumentApi"
import { useMutation } from "react-query";
import ModelType from "../../types/ModelType";

interface DocumentViewerProps {
    model: ModelType;
    document: BasicDocumentType;
}

const DocumentViewer = (props : DocumentViewerProps) => {
    const [document, setDocument] = useState<any>();
    const [isLoading, setIsloading] = useState(true);
    const [links, setLinks] = useState<string[]>([]);
    
    const { mutate } = useMutation(documentApi.getDocument, {
        onSuccess: (data: any) => {
            setDocument(data)

            const dataLinks = JSON.stringify(data).match(/(?<=")https?:\/\/[^\"]+/g);

            if(dataLinks !== null && dataLinks?.length > 0) {
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
        setIsloading(true);
        mutate({model: props.model._id, document: props.document.id})
    }, [props.document])


    if(isLoading) {
      return (
        <div>
          Loading
        </div>
      )
    }

    return (
      <div style={{paddingLeft: "1rem", paddingRight: "1rem", overflowY: "auto"}}>
          <h1>{props.document.name}</h1>
          {links.length > 0 &&
            <div>
                <h2>
                    Document Links
                </h2>
                {links.map(link => {
                    return(
                        <a key={link} href={link} target="_blank">{link}</a>
                    )
                })}
            </div>
          }
          {props.model.meta.map(metaData => {   
              return (
                <div key={metaData.value}>
                    <h2>
                        {metaData.value}
                    </h2>
                    <p>
                        {metaData.type === "string" && document[metaData.value]} 
                        {metaData.type === "date" && new Date(document[metaData.value]).toString()} 
                    </p>
                </div>
              )
          })}
      </div>
    )
}

export default DocumentViewer;