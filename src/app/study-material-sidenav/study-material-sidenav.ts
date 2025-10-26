import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getLoggedInUser } from '../state/user-state/user.selectors';
import { Subject } from '../shared/models/subject.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Unit } from '../shared/models/unit.model';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Question } from '../shared/models/question.model';
import { Answer } from '../answer/answer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { YoutubeDialog } from '../youtube-dialog/youtube-dialog';
import {
  getEngineeringSubjects,
  isSubjectsLoading,
  getEngineeringUnits,
  isUnitsLoading,
  getEngineeringQuestions,
  isQuestionsLoading,
} from '../state/study-material/study-material.selectors';

@Component({
  selector: 'app-study-material-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    Answer,
    MatTooltipModule
  ],
  templateUrl: './study-material-sidenav.html',
  styleUrl: './study-material-sidenav.scss',
})
export class StudyMaterialSidenav implements OnInit {
  private readonly store: Store = inject(Store);
  private dialog: MatDialog = inject(MatDialog);

  userDetails = toSignal(this.store.select(getLoggedInUser));

  isCollapsed = signal(false);
  selectedSubject = signal<Subject | null>(null);
  selectedUnit = signal<Unit | null>(null);

  subjects = toSignal(this.store.select(getEngineeringSubjects), { initialValue: [] });
  units = toSignal(this.store.select(getEngineeringUnits), { initialValue: [] });
  questions = toSignal(this.store.select(getEngineeringQuestions), { initialValue: [] });

  subjectsLoading = toSignal(this.store.select(isSubjectsLoading), { initialValue: false });
  unitsLoading = toSignal(this.store.select(isUnitsLoading), { initialValue: false });
  questionsLoading = toSignal(this.store.select(isQuestionsLoading), { initialValue: false });

  selectedIndex = 0;
  questionAnswerMode = signal(new Map<string, boolean>());

  filteredQuestions = signal<Question[]>([]);
  filteredUnits = signal<Unit[]>([]);
  userSubjects = computed(() => {
    const subjects = this.subjects(); 
    const user = this.userDetails(); 
    if (!subjects?.length || !user) return [];
    return subjects.filter(
      s =>
        s.branchId === user.branchId &&
        s.semesterId === user.semesterId &&
        s.yearId === user.yearId
    );
  }); 

  ngOnInit(): void {
    const subjects = this.userSubjects(); 
    if (subjects?.length) {
      const firstSubject = subjects[0];
      this.selectedSubject.set(firstSubject);
      this.updateUnitsAndQuestions(firstSubject);
    }
    
  }

  updateUnitsAndQuestions(subject: Subject): void {
    const subjectUnits = this.units().filter(u => u.subjectId === subject.subjectId);
    this.filteredUnits.set(subjectUnits); 
  
    if (subjectUnits.length > 0) {
      this.selectedUnit.set(subjectUnits[0]);
      this.updateQuestions(subjectUnits[0]);
    } else {
      this.selectedUnit.set(null);
      this.filteredQuestions.set([]);
    }
  }

  updateQuestions(unit: Unit): void {
    const unitQuestions = this.questions().filter(q => q.unitId === unit.unitId);
    this.filteredQuestions.set(unitQuestions);
  }

  toggleSidenav(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  selectSubject(subject: Subject): void {
    this.selectedSubject.set(subject);
    this.selectedIndex = 0;
    this.updateUnitsAndQuestions(subject);
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedIndex = event.index;
    const subject = this.selectedSubject();
    if (!subject) return;
  
    const unit = this.filteredUnits()[event.index]; 
    if (unit) {
      this.selectedUnit.set(unit);
      this.updateQuestions(unit);
    }
  }

  openYoutubeVideo(videoUrl: string): void {
    const embedUrl = this.getEmbedUrl(videoUrl);
    this.dialog.open(YoutubeDialog, {
      data: { url: embedUrl },
      width: '80vw',
      height: '80vh',
      maxWidth: '1000px',
      maxHeight: '650px',
      autoFocus: false,
    });
  }

  getEmbedUrl(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  toggleAnswerMode(questionId: string): void {
    const currentMap = new Map(this.questionAnswerMode());
    const currentValue = currentMap.get(questionId) || false;
    currentMap.set(questionId, !currentValue);
    this.questionAnswerMode.set(currentMap);
  }

  isSimpleAnswer(questionId: string): boolean {
    return this.questionAnswerMode().get(questionId) || false;
  }
}