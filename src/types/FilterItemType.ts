export interface RuleType {
    id: string;
    field: string; // author, title
    operator: string; // contains, does not contain, ...
    value: string;
}

export default interface FilterItemType {
    id: string;
    combinator: string; // where, and, or
    rules: RuleType[];
}

