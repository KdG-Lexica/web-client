import { Outlet } from "react-router-dom"
import ThemeToggle from "../theme/ThemeToggle"
import { Appbar } from "../viewer/appbar/Appbar";

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
