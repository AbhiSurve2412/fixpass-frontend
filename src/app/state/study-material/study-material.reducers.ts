import { createReducer, on } from '@ngrx/store';
import { StudyMaterialActions } from './study-material.actions';
import { StudyMaterialState } from './study-material.model';

export const initialState: StudyMaterialState = {
  years: [],
  isYearsLoading: false,
  branches: [],
  isBranchesLoading: false,
  colleges: [],
  isCollegesLoading: false,
  universities: [],
  isUniversitiesLoading: false,
  semesters: [],
  isSemestersLoading: false,
  subjects: [],
  isSubjectsLoading: false,
  units: [],
  isUnitsLoading: false,
  questions: [],
  isQuestionsLoading: false,
  answers: [],
  isAnswersLoading: false,
  error: null
};

export const studyMaterialReducer = createReducer(
  initialState,

  // Years
  on(StudyMaterialActions.getYears, (state) => ({ ...state, isYearsLoading: true, error: null })),
  on(StudyMaterialActions.getYearsSuccess, (state, { years }) => ({ ...state, years, isYearsLoading: false })),
  on(StudyMaterialActions.getYearsFailure, (state, { error }) => ({ ...state, isYearsLoading: false, error })),

  // Branches
  on(StudyMaterialActions.getBranches, (state) => ({ ...state, isBranchesLoading: true, error: null })),
  on(StudyMaterialActions.getBranchesSuccess, (state, { branches }) => ({ ...state, branches, isBranchesLoading: false })),
  on(StudyMaterialActions.getBranchesFailure, (state, { error }) => ({ ...state, isBranchesLoading: false, error })),

  // Colleges
  on(StudyMaterialActions.getColleges, (state) => ({ ...state, isCollegesLoading: true, error: null })),
  on(StudyMaterialActions.getCollegesSuccess, (state, { colleges }) => ({ ...state, colleges, isCollegesLoading: false })),
  on(StudyMaterialActions.getCollegesFailure, (state, { error }) => ({ ...state, isCollegesLoading: false, error })),

  // Universities
  on(StudyMaterialActions.getUniversities, (state) => ({ ...state, isUniversitiesLoading: true, error: null })),
  on(StudyMaterialActions.getUniversitiesSuccess, (state, { universities }) => ({ ...state, universities, isUniversitiesLoading: false })),
  on(StudyMaterialActions.getUniversitiesFailure, (state, { error }) => ({ ...state, isUniversitiesLoading: false, error })),

  // Semesters
  on(StudyMaterialActions.getSemesters, (state) => ({ ...state, isSemestersLoading: true, error: null })),
  on(StudyMaterialActions.getSemestersSuccess, (state, { semesters }) => ({ ...state, semesters, isSemestersLoading: false })),
  on(StudyMaterialActions.getSemestersFailure, (state, { error }) => ({ ...state, isSemestersLoading: false, error })),

  // Subjects
  on(StudyMaterialActions.getSubjects, (state) => ({ ...state, isSubjectsLoading: true, error: null })),
  on(StudyMaterialActions.getSubjectsSuccess, (state, { subjects }) => ({ ...state, subjects, isSubjectsLoading: false })),
  on(StudyMaterialActions.getSubjectsFailure, (state, { error }) => ({ ...state, isSubjectsLoading: false, error })),

  // Units
  on(StudyMaterialActions.getUnits, (state) => ({ ...state, isUnitsLoading: true, error: null })),
  on(StudyMaterialActions.getUnitsSuccess, (state, { units }) => ({ ...state, units, isUnitsLoading: false })),
  on(StudyMaterialActions.getUnitsFailure, (state, { error }) => ({ ...state, isUnitsLoading: false, error })),

  // Questions
  on(StudyMaterialActions.getQuestions, (state) => ({ ...state, isQuestionsLoading: true, error: null })),
  on(StudyMaterialActions.getQuestionsSuccess, (state, { questions }) => ({ ...state, questions, isQuestionsLoading: false })),
  on(StudyMaterialActions.getQuestionsFailure, (state, { error }) => ({ ...state, isQuestionsLoading: false, error })),

  // Answers
  on(StudyMaterialActions.getAnswers, (state) => ({ ...state, isAnswersLoading: true, error: null })),
  on(StudyMaterialActions.getAnswersSuccess, (state, { answers }) => ({ ...state, answers, isAnswersLoading: false })),
  on(StudyMaterialActions.getAnswersFailure, (state, { error }) => ({ ...state, isAnswersLoading: false, error }))
);
