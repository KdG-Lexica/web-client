import React, { useEffect, useState } from "react";
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
          setDocuments(docs as unknown as BasicDocumentType[]);
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