import { Outlet } from "react-router-dom"
import { Appbar } from "../viewer/appbar/Appbar";

/** 
 * MainLayout 
 * Mainlayout draws a basic layout that is used on all pages.
 * It contains the Appbar and renders the children that are passed in the App component using React router.
 * @component
 * @example
 * <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
            <Route path="/" element={<DatasetSelector />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/modeleditor" element={<ModelEditor />} />
            <Route path="/viewer" element={<Viewer />} />
            </Route>
        </Routes>
    </BrowserRouter>
*/
export const MainLayout = () => {
    return (
        <div className="bg-slate-200 dark:bg-zinc-900 flex flex-col min-h-full">
            <Appbar />
            <div className="flex flex-row grow">
                <div className="grow">
                    <Outlet />
                </div>
            </div>
        </div>)
}
