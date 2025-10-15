import { Semester } from "./semester.model";
export interface Branch {
    branchId : string,
    name : string,
    description? : string
    semesters?: Semester[];
}