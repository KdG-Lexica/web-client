import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import ModelType from "../../types/ModelType";
import DocumentViewer from "./DocumentViewer";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";

interface ViewerProps {
  modelId: string
  chunkSize : number;
}

const Viewer = (props : ViewerProps) => {
  const [documents, setDocuments] = useState<BasicDocumentType[]>([]);
  const [model, setModel] = useState<ModelType>({_id: "", collectionName: "", meta: []});
  const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);

  const {isLoading} = useQuery(
    "getData",
    async () => {
        try {
          const mod = await documentApi.getModel(props.modelId)
          setModel(mod as unknown as ModelType)

          const docs = await documentApi.getDocuments(props.modelId, 1000);          
          setDocuments(docs as unknown as BasicDocumentType[]);
        } catch (error) {
            console.log(error)
        }
    }
  );

  if(isLoading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
      <div style={{height: "100vh", width: "100vw", display: "flex"}}>
        <div style={{height: "100%", width: "66%", backgroundColor: "#EEEEEE"}}>
          <DefaultViewerCanvas documents={documents} scale={30} setClickedDocument={setClickedDocument}/>
        </div>
        <div style={{maxHeight: "100%", width: "33%", overflowX: "hidden"}}>
          {
            clickedDocument !== null && <DocumentViewer model={model} document={clickedDocument} />
          }
        </div>
      </div>
  );
}

export default Viewer;