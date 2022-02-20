import { FC } from "react";

export const Background: FC = ({ children }) => {
    return (
        <div className="bg-slate-200 dark:bg-black h-screen transition-all">
            {children}
        </div>
    )
}
