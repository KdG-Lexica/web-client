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
import useQueryParams from "../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";


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
  const [dataset, setDataset] = useState<DatasetType>({ count: 0, rows: [], duration: 0 });
  const [model, setModel] = useState<ModelType>({ id: "", collectionName: "", createdAt: new Date(), updatedAt: new Date(), meta: [] });
  const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);
  const [showingFilter, setShowingFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const params = useQueryParams();
  const dataPercentage = params.get("size");
  const setId = params.get("set");

  const { mutate } = useMutation(documentApi.getDocuments, {
    onSuccess: (data: DatasetType) => {
      setDataset(data);
      setLoading(false);
    },
    onError: (error: any) => {
      console.log(error);
    }
  });


  function executeFilter(filter: QueryFilterDtoType[]) {
    setLoading(true);
    mutate({ model: props.modelId, limit: 2000, offset: 0, filter: filter });
  }

  const getModel = async (id: string) => {
    const mod = await documentApi.getModel(id)
    setModel(mod as unknown as ModelType)
  }

  const { isLoading, isError } = useQuery("getModel", () => getModel(props.modelId));



  useEffect(() => {
    if (!isLoading) {
      mutate({ model: props.modelId, limit: 2000, offset: 0, filter: [] });
    }
  }, [isLoading])


  if (isError) {
    navigate("/server-error")
  }

  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <>

      <div className="flex flex-row h-full w-full">
        <DefaultViewerCanvas documents={dataset.rows} words={[]} scale={30} setClickedDocument={setClickedDocument} executeFilter={executeFilter} filterFields={model.meta} />
        <div className="w-1/3">
          <DocumentViewer model={model}
            document={clickedDocument} duration={dataset.duration} count={dataset.count} />

        </div>
      </div>

      {/*
        <div style={{ height: "100%", width: "66%" }}>
          <DefaultViewerCanvas documents={dataset.rows} words={[]} scale={30} setClickedDocument={setClickedDocument} />
        </div>
        <div style={{ maxHeight: "100%", width: "33%" }}>
          <DocumentViewer model={model}
            document={clickedDocument} duration={dataset.duration} count={dataset.count} />
        </div>
      </div> */}
    </>

  );
}

export default Viewer;