import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Viewer from "./components/viewer/Viewer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/viewer" element={<Viewer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App