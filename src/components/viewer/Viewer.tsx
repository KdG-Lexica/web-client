import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import ViewerCanvas from "./three-components/ViewerCanvas";

const Viewer = () => {
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
      <ViewerCanvas documents={documents}/>
    </div>
  );
}

export default Viewer;