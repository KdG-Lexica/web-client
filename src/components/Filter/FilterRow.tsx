import React from "react"
import FilterType from "../../types/FilterType"
import FilterRowType from "../../types/FilterRowType"


export const FilterRow = (props: FilterRowType) => {
    let keywords = ["Title", "Author", "Source"]
    let clause = ["contains", "does not contain", "is", "is not", "is empty", "is not empty"]

    return (
        <div className="flex flex-row items-center">
            <svg style={{ height: 30, width: 30 }}
                xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <select name="keyword" className="m-1 rounded h-8 bg-transparent text-white " id="keyword">
                {keywords.map((e) => {
                    return <option className="bg-slate-900 text-white" value={e} key={e}>{e}</option>
                })}
            </select>
            <select className="m-1 rounded h-8 bg-transparent text-white" name="clause" id="clause">
                {clause.map((e) => {
                    return <option className="bg-slate-900 text-white" value={e} key={e}>{e}</option>
                })}
            </select>
            <input className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1 h-8 bg-slate-700 text-slate-400" id="filter" type="text" placeholder="" />
        </div>
    )
}
