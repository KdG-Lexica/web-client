import RuleDtoType from "./RuleDtoType";



export default interface QueryFilterDtoType {
    combinator: string;
    rules: RuleDtoType[] | null;
}



