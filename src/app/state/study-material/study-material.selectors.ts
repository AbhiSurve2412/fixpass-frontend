import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudyMaterialState } from './study-material.model';

// Feature selector
export const selectStudyMaterialState = createFeatureSelector<StudyMaterialState>('studyMaterial');

// Years
export const getEngineeringYears = createSelector(
  selectStudyMaterialState,
  (state) => state.years
);

export const isYearsLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isYearsLoading
);

// Branches
export const getEngineeringBranches = createSelector(
  selectStudyMaterialState,
  (state) => state.branches
);

export const isBranchesLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isBranchesLoading
);

// Colleges
export const getEngineeringColleges = createSelector(
  selectStudyMaterialState,
  (state) => state.colleges
);

export const isCollegesLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isCollegesLoading
);

// Universities
export const getEngineeringUniversities = createSelector(
  selectStudyMaterialState,
  (state) => state.universities
);

export const isUniversitiesLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isUniversitiesLoading
);

// Semesters
export const getEngineeringSemesters = createSelector(
  selectStudyMaterialState,
  (state) => state.semesters
);

export const isSemestersLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isSemestersLoading
);

// Subjects
export const getEngineeringSubjects = createSelector(
  selectStudyMaterialState,
  (state) => state.subjects
);

export const isSubjectsLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isSubjectsLoading
);

// Units
export const getEngineeringUnits = createSelector(
  selectStudyMaterialState,
  (state) => {
    return [...state.units].sort((a, b) => a.unitNumber - b.unitNumber);
  }
);


export const isUnitsLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isUnitsLoading
);

// Questions
export const getEngineeringQuestions = createSelector(
  selectStudyMaterialState,
  (state) => {
    if (!state.questions) return [];

    const priorityOrder: Record<'high' | 'medium' | 'low', number> = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return [...state.questions].sort((a, b) => {
      const pA = priorityOrder[(a.priority?.toLowerCase() as 'high' | 'medium' | 'low') || 'low'];
      const pB = priorityOrder[(b.priority?.toLowerCase() as 'high' | 'medium' | 'low') || 'low'];
      return pA - pB;
    });
  }
);

export const isQuestionsLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isQuestionsLoading
);

// Answers
export const getEngineeringAnswers = createSelector(
  selectStudyMaterialState,
  (state) => state.answers
);

export const isAnswersLoading = createSelector(
  selectStudyMaterialState,
  (state) => state.isAnswersLoading
);

// Error
export const getStudyMaterialError = createSelector(
  selectStudyMaterialState,
  (state) => state.error
);
