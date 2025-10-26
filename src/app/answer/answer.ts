import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { getEngineeringAnswers } from '../state/study-material/study-material.selectors';

@Component({
  selector: 'app-answer',
  imports: [NgTemplateOutlet],
  templateUrl: './answer.html',
  styleUrl: './answer.scss',
})
export class Answer implements OnInit {
  @Input() questionId!: string;
  @Input() isSimple: boolean = false;

  private readonly store: Store = inject(Store);
  answer: any;
  simpleAnswer: any;

  engineeringQuestionsAnswers = toSignal(this.store.select(getEngineeringAnswers));
  @HostListener('window:beforeprint', ['$event'])
  beforePrint(event: Event) {
    alert('Printing or screenshotting is discouraged!');
  }

  ngOnInit(): void {
    this.answer = this.engineeringQuestionsAnswers()?.find(
      (item) => item.questionId === this.questionId
    )?.answer;
    this.simpleAnswer = this.engineeringQuestionsAnswers()?.find(
      (item) => item.questionId === this.questionId
    )?.simpleAnswer;
  }
}
