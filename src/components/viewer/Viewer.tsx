import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import FilterItemType from "../../types/FilterItemType";
import ModelType from "../../types/ModelType";
import QueryFilterDtoType from "../../types/QueryFilterType";
import { Filter } from "../filter/Filter";
import DocumentViewer from "./DocumentViewer";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";

const words: BasicDocumentType[] = [
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
  const [documents, setDocuments] = useState<BasicDocumentType[]>([]);
  const [model, setModel] = useState<ModelType>({ _id: "", collectionName: "", meta: [] });
  const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);
  const [showingFilter, setShowingFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation(documentApi.getDocuments, {
    onSuccess: (data: BasicDocumentType[]) => {
      setDocuments(data);
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
          fields={model.meta.map(metaData => metaData.value)}
          operators={operators}
          executeFilter={executeFilter}
        />
      </div>
      <div style={{ height: "100%", width: "66%", backgroundColor: "#EEEEEE" }}>
        <DefaultViewerCanvas documents={documents} words={words} scale={30} setClickedDocument={setClickedDocument} />
      </div>
      <div style={{ maxHeight: "100%", width: "33%", overflowX: "hidden" }}>
        {
          clickedDocument !== null && <DocumentViewer model={model} document={clickedDocument} />
        }
      </div>
    </div>
  );
}

export default Viewer;