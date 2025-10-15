import { Component, Input, OnInit } from '@angular/core';
import { engineeringQuestionsAnswers } from '../shared/constants/answers';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-answer',
  imports: [NgTemplateOutlet],
  templateUrl: './answer.html',
  styleUrl: './answer.scss'
})
export class Answer implements OnInit{
  @Input() questionId! : string;
  answer : any;

  ngOnInit(): void {
    this.answer = engineeringQuestionsAnswers.find((item)=> item.questionId === this.questionId)?.answer;
  }
}
