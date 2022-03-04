import { useEffect, useState } from "react"
import FilterItemType, { RuleType } from "../../types/FilterItemType"
import OperatorType from "../../types/OperatorType";
import { Rule } from "./Rule";


interface FilterRowProps {
    id: string;
    fields: Array<string>;
    operators: Array<OperatorType>;
    combinators: Array<string>;
    updateFilters: (f: FilterItemType) => void;
    setFilters: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
    filterItem: FilterItemType;
    filterId: string;
    index: number;
}

export const FilterRow = (props: FilterRowProps) => {
    const [rules, setRules] = useState<RuleType[]>(props.filterItem.rules !== null ? props.filterItem.rules : []);
    const [combinator, setCombinator] = useState<string>(props.filterItem.combinator);

    useEffect(() => {
        if (props.filterItem.rules !== null)
            addRule();
    }, []);

    useEffect(() => {
        drawRules();
    }, [rules]);

    useEffect(() => {
        if (rules.length > 0)
            props.updateFilters({ combinator: combinator, id: props.id, rules: rules })
    }, [combinator, rules])

    const updateFilterRow = (rule: RuleType) => {
        const newRules = [...rules];
        const index = rules.findIndex((r) => r.id == rule.id);
        newRules[index] = rule;
        setRules(newRules);
        props.updateFilters({ combinator: combinator, id: props.id, rules: newRules });
    }

    const handleDelete = (id: string) => {
        const newRules = rules.filter(r => r.id !== id);
        setRules(newRules);
        props.updateFilters({ combinator: combinator, id: props.id, rules: newRules });
    }

    const drawRules = () => {
        return rules.map((r, index) => {
            return <Rule
                key={index}
                rule={r}
                id={rules[index].id}
                combinator={combinator}
                combinators={index == 0 ? ["Where"] : ["and", "or"]}
                filterItem={props.filterItem}
                fields={props.fields}
                operators={props.operators}
                handleDelete={handleDelete}
                updateFilterRows={updateFilterRow}
                setCombinator={setCombinator}
            />
        })
    }

    const updateCombinator = (e: any) => {
        const newCombinator = e.target.value;
        setCombinator(newCombinator);
        props.updateFilters({ combinator: newCombinator, rules: props.filterItem.rules, id: props.id });
    }

    const addRule = () => {
        // in de juiste filterrow en extra rule toevoegen
        const newRules = [...rules, { id: Math.random().toString(16).slice(2), field: props.fields[0], operator: { name: props.operators[0].name, input: true }, value: "" }] as RuleType[];
        setRules(newRules);
        props.updateFilters({ combinator: combinator, rules: newRules, id: props.id } as FilterItemType);
    }

    const drawCombinatorRow = () => {
        return (
            <>
                <div className="rounded-lg bg-white dark:bg-slate-900 min-w-1/4 max-w-1/4 border-solid border-blue-900 border-2 p-2 mt-2">
                    <div className="flex flex-col items-center">
                        {props.combinators.length == 1 ? <p className="text-slate-400 font-medium text-md m-1 pl-0.5 w-16">{props.combinators[0]}</p> :
                            <select name="combinator" onChange={(e) => { updateCombinator(e); }} value={combinator} className="m-1 rounded bg-transparent text-slate-400 font-medium text-md w-16" id="combinator">
                                {props.combinators.map((c) => {
                                    return <option className="bg-slate-900 text-slate-400 w-16" value={c.toUpperCase()} key={c}>{c}</option>
                                })}
                            </select>
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {props.filterItem.rules == null ? drawCombinatorRow() :
                <div className="rounded-lg bg-white dark:bg-slate-900 min-w-1/4 max-w-1/4 border-solid border-blue-900 border-2 p-2 mt-2">
                    <div className="flex flex-col">
                        <div>{rules.length > 0 && drawRules()}</div>
                        <div className="flex flex-row">
                            {rules.length < 5 &&
                                <button className="flex flex-row items-center" onClick={() => addRule()}>
                                    <svg style={{ height: 30, width: 30 }}
                                        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <p className="font-sans text-slate-400 font-medium text-md p-2 m-1">Add rule</p>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
