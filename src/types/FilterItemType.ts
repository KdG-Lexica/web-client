import React from "react";
import OperatorType from "./OperatorType";

export default interface FilterItemType {
    id: number;
    clause: string; // where, and, or
    field: string; // author, title
    operator: OperatorType; // contains, does not contain, ...
    search: string;
}