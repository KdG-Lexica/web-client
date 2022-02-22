import { useState, useEffect } from "react";
import FilterItemType, { RuleType } from "../../types/FilterItemType";
import OperatorType from "../../types/OperatorType";

interface RuleProps {
    id: string;
    fields: Array<string>;
    operators: Array<OperatorType>;
    combinators: Array<string>;
    handleDelete: (id: string) => void;
    updateFilterRows: (r: RuleType) => void;
    filterItem: FilterItemType;
    amountOfFilterRows: number;
    setCombinator: React.Dispatch<React.SetStateAction<string>>;
    combinator: string;
}


export const Rule = (props: RuleProps) => {
    const [value, setvalue] = useState("");
    const [field, setField] = useState(props.fields[0]);
    const [operator, setOperator] = useState<OperatorType>(props.operators[0]);


    useEffect(() => {
        props.updateFilterRows({ id: props.id, field: field.toLowerCase(), operator: operator.name.replace(" ", "_").toUpperCase(), value: value } as RuleType);
    }, [value, field, operator])

    const updateOperator = (e: any) => {
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
            {props.combinators.length == 1 ? <p className="text-slate-400 font-medium text-md m-1 pl-0.5 w-16">{props.combinators[0]}</p> :
                <select name="combinator" onChange={(e) => props.setCombinator(e.target.value)} value={props.combinator} className="m-1 rounded bg-transparent text-slate-400 font-medium text-md w-16" id="combinator">
                    {props.combinators.map((c) => {
                        return <option className="bg-slate-900 text-slate-400 w-16" value={c.toUpperCase()} key={c}>{c}</option>
                    })}
                </select>
            }

            <select name="field" onChange={(e) => setField(e.target.value)} className="m-1 rounded h-8 bg-transparent dark:text-white" id="field">
                {props.fields.map((k) => {
                    return <option className="dark:bg-slate-900 text-slate-600 dark:text-white" value={k} key={k}>{k}</option>
                })}
            </select>
            <select onChange={(e) => updateOperator(e)} className="m-1 rounded h-8 bg-transparent dark:text-white" name="operators" id="operators">
                {props.operators.map((o) => {
                    return <option className="dark:bg-slate-900 text-slate-600 dark:text-white" value={o.name} key={o.name}>{o.name.replaceAll("_", " ").toLowerCase()}</option>
                })}
            </select>
            {operator.input && <input value={value} onChange={(e) => setvalue(e.target.value)} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1 h-8 dark:bg-slate-700 bg-slate-200 dark:text-slate-300 text-slate-800" id="filter" type="text" placeholder="" />}
        </div>
    )
}
