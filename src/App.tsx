import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Viewer from "./components/viewer/Viewer";
import './index.css'
import { DatasetSelector } from "./components/select-dataset/DatasetSelector";
import { MainLayout } from "./components/layouts/MainLayout";
import { ServerError } from "./components/error/ServerError";
import { ViewerLayout } from "./components/layouts/ViewerLayout";
import { Tutorial } from "./components/viewer/tutorial/Tutorial";
import { About } from "./components/viewer/about/About";
import ModelEditor from "./components/model/ModelEditor";

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
  return (
    <QueryClientProvider client={queryGeneralClient} contextSharing={true}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DatasetSelector />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/about" element={<About />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/modeleditor" element={<ModelEditor />} />
          </Route>
          <Route element={<ViewerLayout />}>
            <Route path="/viewer" element={<Viewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >

  )
}

export default App