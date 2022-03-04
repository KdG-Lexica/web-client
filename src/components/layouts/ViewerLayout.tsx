import { Outlet } from "react-router-dom"
import ThemeToggle from "../theme/ThemeToggle"
import { Appbar } from "../viewer/appbar/Appbar"
import { Sidebar } from "../viewer/sidebar/Sidebar"

export const ViewerLayout = () => {
    return (
        <div className="bg-slate-200 dark:bg-zinc-900 h-screen flex flex-col">
            <Appbar />
            <div className="flex flex-row grow">
                <Sidebar />
                <div className="grow h-full">
                    <Outlet />
                </div>
            </div>
        </div>)
}
