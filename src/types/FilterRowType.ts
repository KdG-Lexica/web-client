import Filter from "./FilterType";


export default interface FilterRowType {
    keywords: Array<string>,
    operators: Array<string>,
    filter: Filter
}