import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Background } from "./components/common/Background";
import { Filter } from "./components/filter/Filter";
import Login from "./components/login/Login";
import Viewer from "./components/viewer/Viewer";
import './index.css'
import { ThemeToggle } from "./components/theme/ThemeToggle";
import QueryFilterDtoType from "./types/QueryFilterType";
import { DatasetSelector } from "./components/select-dataset/DatasetSelector";

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
          <Route path="/login" element={<Login />} />
          <Route path="/viewer" element={<Viewer modelId="6213958a1f691c06487cf848" chunkSize={1000} />} />
          <Route path="/filter" element={
            <Background>
              <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
                <ThemeToggle />
              </div>
              <Filter
                fields={["Title", "Author", "Source"]}
                operators={operators}
                executeFilter={(filter: QueryFilterDtoType[]) => { }}
              />
            </Background>
          }
          />
          <Route path="/select-dataset" element={
            <Background>
              <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
                <ThemeToggle />
              </div>
              <DatasetSelector />
            </Background>}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App