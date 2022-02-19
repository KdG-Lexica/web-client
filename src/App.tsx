import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Filter } from "./components/Filter/Filter";
import Login from "./components/login/Login";
import { Sidebar } from "./components/viewer/sidebar/Sidebar";
import Viewer from "./components/viewer/Viewer";
import './index.css'


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
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/home" element={<Viewer />} />
          <Route path="/filter" element={<Filter
            fields={["Title", "Author", "Source"]}
            operators={operators}
          />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App