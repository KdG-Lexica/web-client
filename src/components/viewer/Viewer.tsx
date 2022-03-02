import { duration } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import DatasetType from "../../types/DatasetType";
import FilterItemType from "../../types/FilterItemType";
import ModelType from "../../types/ModelType";
import QueryFilterDtoType from "../../types/QueryFilterType";
import { Filter } from "../filter/Filter";
import DocumentViewer from "./DocumentViewer";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";

const operators = [
  {
    name: "CONTAINS",
    input: true
  },
  {
    name: "EQUALS",
    input: true
  }
];

interface ViewerProps {
  modelId: string
  chunkSize: number;
}

const Viewer = (props: ViewerProps) => {
  const [dataset, setDataset] = useState<DatasetType>({count: 0, rows: [], duration: 0});
  const [model, setModel] = useState<ModelType>({ id: "", collectionName: "", createdAt: new Date(), updatedAt: new Date(), meta: [] });
  const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);
  const [showingFilter, setShowingFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation(documentApi.getDocuments, {
    onSuccess: (data: DatasetType) => {     
      setDataset(data);
      setLoading(false);
    },
    onError: (error: any) => {
      console.log(error);
    }
  });

  const { isLoading } = useQuery(
    "getModel",
    async () => {
      try {
        const mod = await documentApi.getModel(props.modelId)
        setModel(mod as unknown as ModelType)
      } catch (error) {
        console.log(error)
      }
    }
  );

  useEffect(() => {
    if (!isLoading) {
      mutate({ model: props.modelId, limit: 2000, offset: 0, filter: [] });
    }
  }, [isLoading])

  function executeFilter(filter: QueryFilterDtoType[]) {
    setLoading(true);
    mutate({ model: props.modelId, limit: 2000, offset: 0, filter: filter });
  }

  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{
        position: "absolute", top: 10, left: 10, height: 32, width: 32, background: "#90caf9",
        zIndex: 50, borderRadius: 100
      }} onClick={() => { setShowingFilter(!showingFilter); }}>
        <img src="/filter.png" alt="home" style={{ height: "100%", width: "100%", padding: "20%" }} />
      </div>
      <div style={{ position: "absolute", zIndex: 100, top: 10, left: 52, display: showingFilter ? "block" : "none" }}>
        <Filter
          fields={model.meta.map(metaData => metaData.key)}
          operators={operators}
          executeFilter={executeFilter}
        />
      </div>
      <div style={{ height: "100%", width: "66%"}}>
        <DefaultViewerCanvas documents={dataset.rows} words={[]} scale={30} setClickedDocument={setClickedDocument} />
      </div>
      <div style={{ maxHeight: "100%", width: "33%"}}>
        <DocumentViewer model={model}
            document={clickedDocument} duration={dataset.duration} count={dataset.count}/>
      </div>
    </div>
  );
}

export default Viewer;