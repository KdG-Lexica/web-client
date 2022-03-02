import ThemeToggle from "../theme/ThemeToggle";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className="bg-slate-200 dark:bg-zinc-900 h-screen">
            <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
                <ThemeToggle />
            </div>
            <Outlet />
        </div>
    )
}
