import React, { useState, useEffect } from "react";
import FilterItemType from "../../types/FilterItemType";
import OperatorType from "../../types/OperatorType";
import { FilterRow } from "./FilterRow";

interface FilterProps {
    fields: Array<string>;
    operators: Array<OperatorType>;
}

export const Filter = (props: FilterProps) => {
    const [filters, setFilters] = useState<FilterItemType[]>([]);

    const addCondition = () => {
        let clause = filters.length == 0 ? ["Where"] : ["and", "or"];
        setFilters(() => [...filters, { id: filters.length, clause: clause[0], field: props.fields[0], operator: props.operators[0], search: "" } as FilterItemType]); // filters length duplicate id check
    }

    const handleDelete = (id: number) => {
        const updatedFilters = filters.filter(fr => fr.id !== id);
        setFilters(updatedFilters);
    }

    const updateFilters = (filter: FilterItemType) => {
        const newFilters = [...filters];
        const index = newFilters.findIndex((f) => f.id == filter.id)
        newFilters[index] = filter;
        setFilters(newFilters);
    }

    const drawConditions = () => {
        return filters.map((f, index) => {
            return <FilterRow key={index}
                id={f.id}
                clauses={index == 0 ? ["Where"] : ["and", "or"]}
                filterItem={f}
                fields={props.fields}
                operators={props.operators}
                handleDelete={handleDelete}
                updateFilters={updateFilters}
                setFilters={setFilters} />
        })
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center h-screen">
                <div className="rounded-lg bg-slate-900 min-w-1/4 max-w-1/4 border-solid border-blue-900 border-2 p-2">
                    <div className="flex flex-col">
                        <p className="font-sans text-slate-400 font-medium text-lg p-2">In this view, show records</p>
                        <div>{filters.length > 0 ? drawConditions() : ""}</div>
                        <div className="flex flex-row items-center">
                            {filters.length < 6 ?
                                <button className="flex flex-row items-center" onClick={() => addCondition()}><svg style={{ height: 30, width: 30 }}
                                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                    <p className="font-sans text-slate-400 font-medium text-md p-2">Add condition</p></button>
                                : ""}

                        </div>
                        {filters.length > 0 ? <button onClick={() => console.log(filters)} className="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Execute Query
                        </button> : ""}
                    </div >
                </div>
                <pre className="m-4 bg-slate-800 text-slate-200 rounded">
                    {JSON.stringify(filters, null, 4)}
                </pre>
            </div>

        </>
    )
}
