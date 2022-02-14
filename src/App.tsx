import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Viewer from "./components/viewer/Viewer"

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
          <Route path="/login" element={<Login/>}/>
          <Route path="/viewer" element={<Viewer/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App