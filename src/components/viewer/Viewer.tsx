import React, { useState } from "react";
import { useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";

const Viewer = () => {
  const [documents, setDocuments] = useState<BasicDocumentType[]>([]);

  useQuery(
    "getDocuments",
    async () => {
        try {
          const docs = await documentApi.getDocuments();          
          setDocuments(tempDataConverter(docs));
        } catch (error) {
            console.log(error)
        }
    }
  );

  return (
    <div>Viewer</div>
  );
}

export default Viewer;

function tempDataConverter(data : any) : BasicDocumentType[] {
  const documents : BasicDocumentType[] = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    documents.push({
      id : element._id,
      name : element.headline.main,
      vector : {
        x : element['3d'][0],
        y : element['3d'][1],
        z : element['3d'][2],
      }
    })
  }

  return documents;
}