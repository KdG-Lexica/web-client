import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";
import TimeViewerCanvas from "./three-components/time-viewer/TimeViewerCanvas";

const Viewer = () => {
  const { view } = useParams();
  const [documents, setDocuments] = useState<BasicDocumentType[]>([]);  

  const {isLoading} = useQuery(
    "getDocuments",
    async () => {
        try {
          const docs = await documentApi.getDocuments();          
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
    <div style={{height: "100vh", width: "100vw"}}>
      {view === "default" &&
        <DefaultViewerCanvas documents={documents}/>
      }
      {view === "time" &&
        <TimeViewerCanvas documents={documents}/>
      }
    </div>
  );
}

export default Viewer;