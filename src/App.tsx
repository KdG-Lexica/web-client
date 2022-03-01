import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Filter } from "./components/filter/Filter";
import Login from "./components/login/Login";
import Viewer from "./components/viewer/Viewer";
import './index.css'
import { DatasetSelector } from "./components/select-dataset/DatasetSelector";
import { MainLayout } from "./components/layouts/MainLayout";
import { ServerError } from "./components/error/ServerError";

const queryGeneralClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 15000,
    },
  },
});

function App() {
  const operators = [
    {
      name: "contains",
      input: true
    },
    {
      name: "does not contain",
      input: true
    },
    {
      name: "is",
      input: true
    },
    {
      name: "is not",
      input: true
    },
    {
      name: "is empty",
      input: false
    },
    {
      name: "is not empty",
      input: false
    }
  ];


  return (
    <QueryClientProvider client={queryGeneralClient} contextSharing={true}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={
              <DatasetSelector />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/viewer" element={<Viewer modelId="6213958a1f691c06487cf848" chunkSize={1000} />} />
            <Route path="/filter" element={
              <Filter
                fields={["Title", "Author", "Source"]}
                operators={operators}
                executeFilter={() => { }}
              />
            }
            />
            <Route path="/server-error" element={<ServerError />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider >

  )
}

export default App