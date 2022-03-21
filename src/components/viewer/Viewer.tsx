import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as documentApi from "../../api/DocumentApi"
import BasicDocumentType from "../../types/BasicDocumentType";
import DatasetType from "../../types/DatasetType";
import ModelType from "../../types/ModelType";
import QueryFilterDtoType from "../../types/QueryFilterType";
import DocumentViewer from "./DocumentViewer";
import DefaultViewerCanvas from "./three-components/default-viewer/DefaultViewerCanvas";
import useQueryParams from "../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import IPTCType from "../../types/IPTCType";
import CosineDocumentType from "../../types/CosineDocumentType";

/** 
 * Wrapper component for 3D viewer. Contains Appbar, ViewerCanvas and Documentviewer.
 * Handles loading states, provides context and initial api calls.
 * 
 * @component
 * @example
 * return(
    <DocumentLink key={link} link={link} />
 * 
*/

const Viewer = () => {
  const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
  const [dataset, setDataset] = useState<DatasetType>({ count: 0, chunks: [], duration: 0 });
  const [model, setModel] = useState<ModelType>({ id: "", collectionName: "", createdAt: new Date(), updatedAt: new Date(), meta: [], documentCount: 0, center: { x: 0, y: 0, z: 0 } });
  const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState(false);
  const [chunkDistance, setChunkDistance] = useState<number>(1);
  const [size, setSize] = useState<number>(0.01);
  const [IPTCs, setIPTCs] = useState<IPTCType[]>([]);
  const [IPTC, setIPTC] = useState<IPTCType | null>(null);
  const [cosineDocuments, setCosineDocuments] = useState<CosineDocumentType[]>([]);
  const [showingCosine, setShowingCosine] = useState(false);

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

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
    setClickedDocument(null);
    setLoading(true);
    setProgress(0)
    mutate({
      model: setId!, limit: parseFloat(dataPercentage!) * model.documentCount, offset: 0, filter: filter, config: {
        onDownloadProgress: (progressEvent: any) => {
          let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
          setProgress(percentCompleted);
        }
      }
    });
  }

  const getModel = async (id: string) => {
    const mod = await documentApi.getModel(id);
    setModel(mod as unknown as ModelType);
    const words = await documentApi.getIPTCs();
    setIPTCs(words as unknown as IPTCType[])
  }

  const { isLoading, isError, refetch } = useQuery("getModel", async () => { await getModel(setId!) });

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (!isLoading && model.documentCount > 0) {
      setProgress(0)

      mutate({
        model: setId!, limit: parseFloat(dataPercentage!) * model.documentCount, offset: 0, filter: [], config: {
          onDownloadProgress: (progressEvent: any) => {
            let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            setProgress(percentCompleted);
          }
        }
      });
    }
  }, [isLoading, model.documentCount]);

  useEffect(() => {
    console.log("Changed");

    setShowingCosine(false);
    setCosineDocuments([]);
  }, [clickedDocument]);

  if (isError) {
    navigate("/server-error")
  }

  if (loading) {
    return (
      <>
        {progress == 0 || progress == 100 ?
          <p className="text-black font-medium dark:text-white flex flex-col gap-2 items-center justify-center h-full">
            Querying data
            <svg role="status" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </p>
          :
          <div className="text-black font-medium dark:text-white flex flex-col gap-2 items-center justify-center h-full">
            Downloading data {progress}%
            <div className="w-1/2 bg-gray-400 rounded-full flex transition dark:bg-gray-700">
              <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        }
      </>
    )
  }

  return (
    <>
      <div className="flex flex-row h-full w-full">
        <Sidebar
          size={size}
          setSize={setSize}
          chunkDistance={chunkDistance}
          setChunkDistance={setChunkDistance}
          document={hoveredDocument}
          IPTCs={IPTCs}
          setIPTC={setIPTC}
        />
        <DefaultViewerCanvas
          center={model.center}
          chunkDistance={chunkDistance}
          size={size}
          documents={dataset.chunks}
          scale={30}
          setClickedDocument={setClickedDocument}
          clickedDocument={clickedDocument}
          executeFilter={executeFilter}
          filterFields={model.meta}
          setFocus={setFocus} focus={focus}
          setHoveredDocument={setHoveredDocument}
          IPTC={IPTC}
          showingCosine={showingCosine}
          cosineDocuments={cosineDocuments}
        />
        <div className="overflow-hidden max-h-full" style={{ width: "22.5%" }}>
          <DocumentViewer
            model={model}
            document={clickedDocument}
            duration={dataset.duration}
            count={dataset.count}
            setClickedDocument={setClickedDocument}
            setFocus={setFocus}
            cosineDocuments={cosineDocuments}
            setCosineDocuments={setCosineDocuments}
            showingCosine={showingCosine}
            setShowingCosine={setShowingCosine}
          />
        </div>
      </div>
    </>

  );
}

export default Viewer;