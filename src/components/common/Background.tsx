import { FC } from "react";

export const Background: FC = ({ children }) => {
    return (
        <div className="bg-slate-200 dark:bg-zinc-900 h-screen transition-all">
            {children}
        </div>
    )
}
