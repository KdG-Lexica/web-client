import { useState } from "react";
import BasicDocumentType from "../../../types/BasicDocumentType";

interface SidebarProps {
    chunkDistance: number;
    setChunkDistance: React.Dispatch<React.SetStateAction<number>>;
    size: number;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    document: BasicDocumentType | null;
}

export const Sidebar = (props : SidebarProps) => {
    return (
        <aside className="w-64 " aria-label="Sidebar">
            <div className="overflow-y-hidden py-4 px-3 heigt-full bg-gray-50 dark:bg-gray-800" style={{ height: "calc(100vh - 80px)" }}>
                <div className="space-y-2 mb-2">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-6 h-6  text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>
                <div className="lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Performance</span>
                </div>

                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-nowrap  text-slate-600 dark:text-slate-400">Chunk distance: {props.chunkDistance}</span>
                </div>
                <div className="hidden md:block flex flex-col space-y-2 p-2 w-full mb-2">
                    <input defaultValue={props.chunkDistance} type="range" className="w-full" min="0" max="3" step="1" 
                    onChange={(e) => {props.setChunkDistance(parseInt(e.target.value))}}/>
                </div>

                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-nowrap  text-slate-600 dark:text-slate-400">Showing: {Math.floor(props.size * 100)}%</span>
                </div>
                <div className="hidden md:block flex flex-col space-y-2 p-2 w-full mb-2">
                    <input defaultValue={Math.floor(props.size * 100)} type="range" className="w-full" min="1" max="100" step="1" 
                    onChange={(e) => {props.setSize(parseInt(e.target.value) / 100)}}/>
                </div>

                <div className="lex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Document</span>
                </div>
                <div className="lex items-center pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    <span className="self-center text-base font-semibold whitespace-wrap  text-slate-600 dark:text-slate-400">{
                        props.document === null ? "Hover over a document to see the title." : props.document.name
                    }</span>
                </div>

                <div id="dropdown-cta" className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                    </div>
                    <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                        This is a beta version of the application. Not all buttons will work and bugs may occur. Thanks for understanding.
                    </p>
                </div>

            </div>
        </aside >
    )
}
