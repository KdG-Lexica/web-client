import { useEffect, useState } from "react"
import FilterItemType from "../../types/FilterItemType"
import OperatorType from "../../types/OperatorType";

interface FilterRowProps {
    id: number,
    fields: Array<string>,
    operators: Array<OperatorType>,
    clauses: Array<string>
    handleDelete: (id: number) => void,
    updateFilters: (f: FilterItemType) => void,
    setFilters: React.Dispatch<React.SetStateAction<FilterItemType[]>>,
    filterItem: FilterItemType
}

export const FilterRow = (props: FilterRowProps) => {
    const [search, setSearch] = useState("");
    const [clause, setClause] = useState(props.clauses[0]);
    const [field, setField] = useState(props.fields[0]);
    const [operator, setOperator] = useState<OperatorType>(props.operators[0]);

    useEffect(() => {
        props.updateFilters({ clause: clause, field: field, id: props.id, operator: operator, search: search } as FilterItemType)
    }, [search, clause, field, operator])

    const updateOperator = (e: any) => {
        console.log(e.target.value)
        const operator = props.operators.find((o) => o.name === e.target.value);
        setOperator(operator!!)
    }

    return (
        <div className="flex flex-row items-center">
            <button onClick={() => props.handleDelete(props.id)}>
                <svg style={{ height: 30, width: 30 }}
                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {props.clauses.length == 1 ? <p className="font-sans text-slate-400 font-medium text-md p-2 w-1/5">{props.clauses[0]}</p> :
                <select name="clause" onChange={(e) => setClause(e.target.value)} className="m-1 rounded h-8 bg-transparent text-slate-400 font-medium text-md w-1/5" id="clause">
                    {props.clauses.map((c) => {
                        return <option className="bg-slate-900 text-slate-400" value={c} key={c}>{c}</option>
                    })}
                </select>
            }

            <select name="field" onChange={(e) => setField(e.target.value)} className="m-1 rounded h-8 bg-transparent text-white" id="field">
                {props.fields.map((k) => {
                    return <option className="bg-slate-900 text-white" value={k} key={k}>{k}</option>
                })}
            </select>
            <select onChange={(e) => updateOperator(e)} className="m-1 rounded h-8 bg-transparent text-white" name="operators" id="operators">
                {props.operators.map((o) => {
                    return <option className="bg-slate-900 text-white" value={o.name} key={o.name}>{o.name}</option>
                })}
            </select>
            {operator.input && <input value={search} onChange={(e) => setSearch(e.target.value)} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1 h-8 bg-slate-700 text-slate-300" id="filter" type="text" placeholder="" />}
        </div>
    )
}
