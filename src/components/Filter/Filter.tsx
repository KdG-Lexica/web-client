import React, { useState } from "react";
import FilterRowType from "../../types/FilterRowType";
import FilterType from "../../types/FilterType";
import { FilterRow } from "./FilterRow";





export const Filter = () => {
    let keywords = ["Title", "Author", "Source"]
    let operators = ["contains", "does not contain", "is", "is not", "is empty", "is not empty"]

    const [filters, setFilters] = useState<FilterType[]>([]);

    const addCondition = () => {
        let clause = filters.length == 0 ? "Where" : "and";
        setFilters(filter => [...filters, { clause: clause, field: keywords[0], operator: operators[0], search: "" } as FilterType]);
    }

    const drawConditions = () => {
        console.log(filters);

        return filters.map((f, index) => {
            return <FilterRow key={index} keywords={keywords} operators={operators} filter={f} />
        })


    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="rounded-lg bg-slate-900 min-w-1/4 max-w-1/4 border-solid border-slate-400 border-4 p-2">
                <div className="flex flex-col">
                    <p className="font-sans text-slate-400 font-medium text-lg p-2">In this view, show records</p>
                    <div>{filters.length > 0 ? drawConditions() : ""}</div>
                    <div className="flex flex-row items-center">
                        <button onClick={() => addCondition()}><svg style={{ height: 30, width: 30 }}
                            xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg></button>
                        <p className="font-sans text-slate-400 font-medium text-md p-2">Add condition</p>
                    </div>
                </div >
            </div>
        </div>
    )
}
