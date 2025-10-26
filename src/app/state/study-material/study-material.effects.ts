import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudyMaterialActions } from './study-material.actions';
import { NotificationService } from '../../shared/services/notification.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { StudyMaterialService } from '../../shared/services/study-material.service';

@Injectable()
export class StudyMaterialEffects {
  private actions$ = inject(Actions);
  private studyService = inject(StudyMaterialService);
  private notification = inject(NotificationService);

  // Get Years
  getYears$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getYears),
      mergeMap(() =>
        this.studyService.getYears().pipe(
          map((years) => StudyMaterialActions.getYearsSuccess({ years })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getYearsFailure({ error }));
          })
        )
      )
    )
  );

  // Get Branches
  getBranches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getBranches),
      mergeMap(() =>
        this.studyService.getBranches().pipe(
          map((branches) => StudyMaterialActions.getBranchesSuccess({ branches })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getBranchesFailure({ error }));
          })
        )
      )
    )
  );

  // Get Colleges
  getColleges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getColleges),
      mergeMap(() =>
        this.studyService.getColleges().pipe(
          map((colleges) => StudyMaterialActions.getCollegesSuccess({ colleges })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getCollegesFailure({ error }));
          })
        )
      )
    )
  );

  // Get Universities
  getUniversities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getUniversities),
      mergeMap(() =>
        this.studyService.getUniversities().pipe(
          map((universities) => StudyMaterialActions.getUniversitiesSuccess({ universities })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getUniversitiesFailure({ error }));
          })
        )
      )
    )
  );

  // Get Semesters
  getSemesters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getSemesters),
      mergeMap(() =>
        this.studyService.getSemesters().pipe(
          map((semesters) => StudyMaterialActions.getSemestersSuccess({ semesters })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getSemestersFailure({ error }));
          })
        )
      )
    )
  );

  // Get Subjects
  getSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getSubjects),
      mergeMap(() =>
        this.studyService.getSubjects().pipe(
          map((subjects) => StudyMaterialActions.getSubjectsSuccess({ subjects })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getSubjectsFailure({ error }));
          })
        )
      )
    )
  );

  // Get Units
  getUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getUnits),
      mergeMap(() =>
        this.studyService.getUnits().pipe(
          map((units) => StudyMaterialActions.getUnitsSuccess({ units })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getUnitsFailure({ error }));
          })
        )
      )
    )
  );

  // Get Questions
  getQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getQuestions),
      mergeMap(() =>
        this.studyService.getQuestions().pipe(
          map((questions) => StudyMaterialActions.getQuestionsSuccess({ questions })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getQuestionsFailure({ error }));
          })
        )
      )
    )
  );

  // Get Answers
  getAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudyMaterialActions.getAnswers),
      mergeMap(() =>
        this.studyService.getAnswers().pipe(
          map((answers) => StudyMaterialActions.getAnswersSuccess({ answers })),
          catchError((error: string) => {
            this.notification.showError(error);
            return of(StudyMaterialActions.getAnswersFailure({ error }));
          })
        )
      )
    )
  );
}
