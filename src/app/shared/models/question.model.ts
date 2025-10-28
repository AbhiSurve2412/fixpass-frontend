export interface Question {
    questionId : string,
    name : string,
    description? : string,
    answerId : string,
    unitId : string,
    previouslyAskedYears? : string[],
    diagramUrl? : string,
    priority : string
}
  