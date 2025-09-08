export interface User{
    userId? : string,
    name : string,
    email : string,
    collegeName : string,
    collegeId : string,
    universityName : string,
    universityId : string,
    branchId : string,
    branchName : string,
    yearId : string,
    yearName : string,
    semesterId : string,
    semesterName : string
    isProUser? : boolean
}

export interface UserState {
    loggedInUser? : User,
    allUsers? : User[],
    isAuthenticated: boolean,
    loading: boolean,
    error?: string
}