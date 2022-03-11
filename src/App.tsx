import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Viewer from "./components/viewer/Viewer";
import './index.css'
import { DatasetSelector } from "./components/select-dataset/DatasetSelector";
import { MainLayout } from "./components/layouts/MainLayout";
import { ServerError } from "./components/error/ServerError";
import { ViewerLayout } from "./components/layouts/ViewerLayout";
import { Tutorial } from "./components/viewer/tutorial/Tutorial";
import { News } from "./components/viewer/news/News";
import ModelEditor from "./components/model/ModelEditor";
import { NewsArticle } from "./components/viewer/news/NewsArticle";

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
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
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