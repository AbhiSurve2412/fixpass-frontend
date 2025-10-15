import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getLoggedInUser } from '../state/user-state/user.selectors';
import { Subject } from '../shared/models/subject.model';
import { engineeringSubjects } from '../shared/constants/subjects';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Unit } from '../shared/models/unit.model';
import { engineeringUnits } from '../shared/constants/units';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Question } from '../shared/models/question.model';
import { engineeringQuestions } from '../shared/constants/questions';
import { Answer } from '../answer/answer';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-study-material-sidenav',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    Answer
],
  templateUrl: './study-material-sidenav.html',
  styleUrl: './study-material-sidenav.scss',
})
export class StudyMaterialSidenav implements OnInit {
  private readonly store: Store = inject(Store);

  userDetails = toSignal(this.store.select(getLoggedInUser));

  isCollapsed = signal(false);
  selectedSubject = signal<Subject | null>(null);
  selectedUnit = signal<Unit | null>(null);

  userSubjects: Subject[] = [];
  units : Unit[] = [];
  questions : Question[] = [];
  selectedIndex = 0;

  ngOnInit(): void {
    this.userSubjects = engineeringSubjects;
    this.units = engineeringUnits.filter((item)=> this.userSubjects[0].subjectId === item.subjectId);

    this.selectedSubject.set(this.userSubjects[0]);
    this.selectedUnit.set(this.units ? this.units[0] : null);

    this.questions = engineeringQuestions.filter((item)=> item.unitId === this.selectedUnit()?.unitId);

    //const userDetails = this.userDetails();
    // this.userSubjects = userDetails
    //   ? engineeringSubjects.filter(
    //       (subject: Subject) =>
    //         subject.branchId === userDetails.branchId &&
    //         subject.semesterId === userDetails.semesterId &&
    //         subject.yearId === userDetails.yearId
    //     )
    //   : [];
  }

  toggleSidenav() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  selectSubject(subject: Subject) {
    this.selectedSubject.set(subject);
    this.units = engineeringUnits.filter((item)=> this.selectedSubject()?.subjectId === item.subjectId);
    this.questions = engineeringQuestions.filter((item)=> item.unitId === this.units[0]?.unitId);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    this.selectedUnit.set(this.units[event.index]);
    this.questions = engineeringQuestions.filter((item)=> item.unitId === this.selectedUnit()?.unitId);
  }
}
