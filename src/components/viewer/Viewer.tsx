import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import ModelType from "../../types/ModelType";
import DocumentViewer from "./DocumentViewer";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";

const words : BasicDocumentType[] = [
  {
    id: "1",
    name: "1",
    date: new Date(),
    vector3: {
      x: 1,
      y: 1,
      z: 1
    }
  },
  {
    id: "2",
    name: "2",
    date: new Date(),
    vector3: {
      x: 2,
      y: 2,
      z: 2
    }
  },
  {
    id: "3",
    name: "3",
    date: new Date(),
    vector3: {
      x: 3,
      y: 3,
      z: 3
    }
  },
  {
    id: "4",
    name: "4",
    date: new Date(),
    vector3: {
      x: 4,
      y: 4,
      z: 4
    }
  },
  {
    id: "5",
    name: "5",
    date: new Date(),
    vector3: {
      x: 5,
      y: 5,
      z: 5
    }
  }
]

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

          const docs = await documentApi.getDocuments(props.modelId, 5000);          
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
          <DefaultViewerCanvas documents={documents} words={words} scale={30} setClickedDocument={setClickedDocument}/>
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