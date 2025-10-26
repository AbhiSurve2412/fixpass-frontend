import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Year } from '../../shared/models/year.model';
import { Branch } from '../../shared/models/branch.model';
import { College } from '../../shared/models/college.model';
import { University } from '../../shared/models/university.model';
import { Semester } from '../../shared/models/semester.model';
import { Subject } from '../../shared/models/subject.model';
import { Unit } from '../../shared/models/unit.model';
import { Question } from '../../shared/models/question.model';
import { Answer } from '../../shared/models/answer.model';

export const StudyMaterialActions = createActionGroup({
  source: 'study-material',
  events: {
    // Years
    getYears: emptyProps(),
    getYearsSuccess: props<{ years: Year[] }>(),
    getYearsFailure: props<{ error: string }>(),

    // Branches
    getBranches: emptyProps(),
    getBranchesSuccess: props<{ branches: Branch[] }>(),
    getBranchesFailure: props<{ error: string }>(),

    // Colleges
    getColleges: emptyProps(),
    getCollegesSuccess: props<{ colleges: College[] }>(),
    getCollegesFailure: props<{ error: string }>(),

    // Universities
    getUniversities: emptyProps(),
    getUniversitiesSuccess: props<{ universities: University[] }>(),
    getUniversitiesFailure: props<{ error: string }>(),

    // Semesters
    getSemesters: emptyProps(),
    getSemestersSuccess: props<{ semesters: Semester[] }>(),
    getSemestersFailure: props<{ error: string }>(),

    // Subjects
    getSubjects: emptyProps(),
    getSubjectsSuccess: props<{ subjects: Subject[] }>(),
    getSubjectsFailure: props<{ error: string }>(),

    // Units
    getUnits: emptyProps(),
    getUnitsSuccess: props<{ units: Unit[] }>(),
    getUnitsFailure: props<{ error: string }>(),

    // Questions
    getQuestions: emptyProps(),
    getQuestionsSuccess: props<{ questions: Question[] }>(),
    getQuestionsFailure: props<{ error: string }>(),

    // Answers
    getAnswers: emptyProps(),
    getAnswersSuccess: props<{ answers: Answer[] }>(),
    getAnswersFailure: props<{ error: string }>()
  }
});
