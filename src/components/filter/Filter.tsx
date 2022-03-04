import React, { useState, useEffect, Component } from "react";
import FilterItemType, { RuleType } from "../../types/FilterItemType";
import OperatorType from "../../types/OperatorType";
import QueryFilterDtoType from "../../types/QueryFilterType";
import RuleDtoType from "../../types/RuleDtoType";
import { FilterRow } from "./FilterRow";

interface FilterProps {
    fields: Array<string>;
    operators: Array<OperatorType>;
    executeFilter: (filter: QueryFilterDtoType[]) => void;
}

export const Filter = (props: FilterProps) => {
    const [filters, setFilters] = useState<FilterItemType[]>([]);

    useEffect(() => {
        drawFilters();
    }, [filters])

    const addFilterItem = () => {
        let newFilters = [...filters];
        const newFilter = { combinator: "AND", id: Math.random().toString(16).slice(2), rules: [] } as FilterItemType;
        if (filters.length !== 0) {
            const combinatorFilter = { combinator: "AND", id: Math.random().toString(16).slice(2), rules: null } as FilterItemType;
            newFilters = [...newFilters, combinatorFilter];
        }
        newFilters = [...newFilters, newFilter];
        setFilters([...newFilters]);
    }

    const updateFilters = (filterItem: FilterItemType) => {
        let newFilters = [...filters];
        const index = filters.findIndex((f) => f.id == filterItem.id);
        newFilters[index] = filterItem;
        if (filterItem.rules !== null && filterItem.rules.length == 0) {
            newFilters = newFilters.filter((f) => f.id !== filterItem.id);
            newFilters = newFilters.filter((f) => f.id !== newFilters[index - 1].id);
        }
        setFilters(newFilters);
    }

    const drawFilters = () => {
        return filters.map((f, index) => {
            return <FilterRow
                key={index}
                id={filters[index].id}
                combinators={index == 0 ? ["Where"] : ["and", "or"]}
                filterItem={f}
                fields={props.fields}
                operators={props.operators}
                updateFilters={updateFilters}
                filterId={f.id}
                index={index}
                setFilters={setFilters}
            />
        })
    }

    const filterToDto = (filters: FilterItemType[]): Array<QueryFilterDtoType> => {
        const arr: Array<QueryFilterDtoType> = [];

        filters.forEach((f) => {
            let rules = f.rules !== null ? f.rules?.map((r) => ({ field: r.field, operator: r.operator.name, value: r.value })) : null
            arr.push({
                combinator: f.combinator,
                rules: rules
            })
        });

        return arr;
    }

    const postQuery = (filters: FilterItemType[]) => {
        const arr = filterToDto(filters);
        props.executeFilter(arr)
    }

    return (
        <>
            <div className="flex flex-row justify-center items-start min-w-1/4">
                <div className="rounded-lg bg-white dark:bg-slate-900 min-w-1/4 max-w-1/4 border-solid border-slate-200 dark:border-slate-800 border-2 p-2">
                    <div className="flex flex-col">
                        <p className="font-sans text-slate-400 font-medium text-lg p-2">In this view, show records</p>
                        <div>{filters.length > 0 && drawFilters()}</div>
                        <div className="flex flex-row">
                            {filters.length < 4 && <button className="flex flex-row items-center" onClick={() => addFilterItem()}><svg style={{ height: 30, width: 30 }}
                                xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                                <p className="font-sans text-slate-400 font-medium text-md p-2 m-1">Add filter</p></button>}

                        </div>
                        {filters.length > 0 && <button type="button" onClick={() => { postQuery(filters) }} className="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2">
                            Execute Query
                        </button>}
                    </div >
                </div>
                { /*
                    <pre className="m-4 bg-white dark:bg-slate-800 text-black dark:text-slate-200 rounded overflow-y-scroll h-96 w-80">
                        {JSON.stringify(filterToDto(filters), null, 4)}
                    </pre>
                */ }
            </div>
        </>
    )
}