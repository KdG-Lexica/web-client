import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Filter } from "./components/filter/Filter";
import Login from "./components/login/Login";
import Viewer from "./components/viewer/Viewer";
import './index.css'
import { DatasetSelector } from "./components/select-dataset/DatasetSelector";
import { MainLayout } from "./components/layouts/MainLayout";
import { ServerError } from "./components/error/ServerError";
import { ViewerLayout } from "./components/layouts/ViewerLayout";
import { Tutorial } from "./components/viewer/tutorial/Tutorial";
import { About } from "./components/viewer/about/About";

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
            <Route path="/" element={<DatasetSelector />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<ViewerLayout />}>
            <Route path="/viewer" element={<Viewer modelId="1" chunkSize={1000} />} />
            <Route path="/server-error" element={<ServerError />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >

  )
}

export default App