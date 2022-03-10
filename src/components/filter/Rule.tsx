import { useState, useEffect } from "react";
import FilterItemType, { RuleType } from "../../types/FilterItemType";
import MetaType from "../../types/MetaType";
import OperatorType from "../../types/OperatorType";


interface RuleProps {
    id: string;
    fields: MetaType[];
    operators: OperatorType[];
    combinators: string[];
    rule: RuleType;
    handleDelete: (id: string) => void;
    updateFilterRows: (r: RuleType) => void;
    filterItem: FilterItemType;
    setCombinator: React.Dispatch<React.SetStateAction<string>>;
    combinator: string;
}


export const Rule = (props: RuleProps) => {
    const START_DATE = Date.now();

    const [value, setvalue] = useState(props.rule.value);
    const [field, setField] = useState<MetaType>(props.rule.field);
    const [operator, setOperator] = useState<OperatorType>(props.rule.operator);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [focus, setFocus] = useState(START_DATE)

    useEffect(() => {
        if (field.type === "date") {
            props.updateFilterRows({ id: props.id, field: field, operator: props.operators.find((o) => o.name == operator.name), value: `${startDate}${endDate !== "" ? "$" + endDate : ""}` } as RuleType);
        } else {
            props.updateFilterRows({ id: props.id, field: field, operator: props.operators.find((o) => o.name == operator.name), value: value } as RuleType);
        }
    }, [value, field, operator, endDate, startDate])

    const updateOperator = (e: any) => {
        const operator = props.operators.find((o) => o.name === e.target.value) ?? props.operators[0];
        setOperator(operator)
    }

    const updateField = (e: any) => {
        const field = props.fields.find((f) => f.key === e.target.value) ?? props.fields[0]
        setField(field);
    }

    const drawDateRow = () => {
        return (
            <>
                <select onChange={(e) => updateOperator(e)} className="m-1 rounded h-8 bg-transparent dark:text-white w-[141px]" name="operators" id="operators">
                    {props.operators.filter((o) => o.dateOperator === true).map((o) => {
                        return <option className="dark:bg-slate-900 text-slate-600 dark:text-white" value={o.name} key={o.name}>{o.name.replaceAll("_", " ").toLowerCase()}</option>
                    })}
                </select>
                <div className="relative">
                    <input name="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 m-1 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {operator.name === "from" &&
                    <>
                        <span className="mx-4 text-gray-500">to</span>
                        <div className="relative">
                            <input name="end" value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 m-1 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </>
                }
            </>
        );
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
            <select name="field" onChange={(e) => updateField(e)} className="m-1 rounded h-8 bg-transparent dark:text-white" id="field">
                {props.fields.map((k) => {
                    return <option className="dark:bg-slate-900 text-slate-600 dark:text-white" value={k.key} key={k.id}>{k.key}</option>
                })}
            </select>
            {field.type.toLowerCase() === "date" ? drawDateRow() :
                <>
                    <select onChange={(e) => updateOperator(e)} className="m-1 rounded h-8 bg-transparent dark:text-white" name="operators" id="operators">
                        {props.operators.filter((o) => o.dateOperator === false).map((o) => {
                            return <option className="dark:bg-slate-900 text-slate-600 dark:text-white" value={o.name} key={o.name}>{o.name.replaceAll("_", " ").toLowerCase()}</option>
                        })}
                    </select>
                    {operator.input && <input value={value} onChange={(e) => setvalue(e.target.value)} className="rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1 h-8 dark:bg-slate-700 bg-slate-200 dark:text-slate-300 text-slate-800" id="filter" type="text" placeholder="" />}
                </>
            }
        </div>
    )
}
