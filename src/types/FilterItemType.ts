import MetaType from "./MetaType";
import OperatorType from "./OperatorType";

export interface RuleType {
    id: string;
    field: MetaType; // author, title
    operator: OperatorType; // contains, does not contain, ...
    value: string;
}

export default interface FilterItemType {
    id: string;
    combinator: string; // where, and, or
    rules: RuleType[] | null;
}

