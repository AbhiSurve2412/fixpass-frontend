import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { StudyMaterialActions } from '../../state/study-material/study-material.actions';
import { combineLatest, first, filter, map } from 'rxjs';
import {
  isYearsLoading,
  isBranchesLoading,
  isCollegesLoading,
  isUniversitiesLoading,
  isSemestersLoading,
  isSubjectsLoading,
  isUnitsLoading,
  isQuestionsLoading,
  isAnswersLoading
} from '../../state/study-material/study-material.selectors';

@Injectable({ providedIn: 'root' })
export class StudyMaterialResolver implements Resolve<void> {
  private store = inject(Store);
  private platformId = inject(PLATFORM_ID);

  resolve() {
    if (!isPlatformBrowser(this.platformId)) return; 

    this.store.dispatch(StudyMaterialActions.getYears());
    this.store.dispatch(StudyMaterialActions.getBranches());
    this.store.dispatch(StudyMaterialActions.getColleges());
    this.store.dispatch(StudyMaterialActions.getUniversities());
    this.store.dispatch(StudyMaterialActions.getSemesters());
    this.store.dispatch(StudyMaterialActions.getSubjects());
    this.store.dispatch(StudyMaterialActions.getUnits());
    this.store.dispatch(StudyMaterialActions.getQuestions());
    this.store.dispatch(StudyMaterialActions.getAnswers());

    return combineLatest([
      this.store.pipe(select(isYearsLoading), filter(l => !l)),
      this.store.pipe(select(isBranchesLoading), filter(l => !l)),
      this.store.pipe(select(isCollegesLoading), filter(l => !l)),
      this.store.pipe(select(isUniversitiesLoading), filter(l => !l)),
      this.store.pipe(select(isSemestersLoading), filter(l => !l)),
      this.store.pipe(select(isSubjectsLoading), filter(l => !l)),
      this.store.pipe(select(isUnitsLoading), filter(l => !l)),
      this.store.pipe(select(isQuestionsLoading), filter(l => !l)),
      this.store.pipe(select(isAnswersLoading), filter(l => !l)),
    ]).pipe(first(), map(() => void 0));
  }
}
