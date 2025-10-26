import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { from, Observable, map } from 'rxjs';
import { Year } from '../../shared/models/year.model';
import { Branch } from '../../shared/models/branch.model';
import { College } from '../../shared/models/college.model';
import { University } from '../../shared/models/university.model';
import { Semester } from '../../shared/models/semester.model';
import { Subject } from '../../shared/models/subject.model';
import { Unit } from '../../shared/models/unit.model';
import { Question } from '../../shared/models/question.model';
import { Answer } from '../../shared/models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class StudyMaterialService {
  private firestore: Firestore = inject(Firestore);

  // -------------------------------
  // GET YEARS
  // -------------------------------
  getYears(): Observable<Year[]> {
    const yearsCollection = collection(this.firestore, 'years');
    return from(getDocs(yearsCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Year))
    );
  }

  // -------------------------------
  // GET BRANCHES
  // -------------------------------
  getBranches(): Observable<Branch[]> {
    const branchesCollection = collection(this.firestore, 'branches');
    return from(getDocs(branchesCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Branch))
    );
  }

  // -------------------------------
  // GET COLLEGES
  // -------------------------------
  getColleges(): Observable<College[]> {
    const collegesCollection = collection(this.firestore, 'colleges');
    return from(getDocs(collegesCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as College))
    );
  }

  // -------------------------------
  // GET UNIVERSITIES
  // -------------------------------
  getUniversities(): Observable<University[]> {
    const universitiesCollection = collection(this.firestore, 'universities');
    return from(getDocs(universitiesCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as University))
    );
  }

  // -------------------------------
  // GET SEMESTERS
  // -------------------------------
  getSemesters(): Observable<Semester[]> {
    const semestersCollection = collection(this.firestore, 'semesters');
    return from(getDocs(semestersCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Semester))
    );
  }

  // -------------------------------
  // GET SUBJECTS
  // -------------------------------
  getSubjects(): Observable<Subject[]> {
    const subjectsCollection = collection(this.firestore, 'subjects');
    return from(getDocs(subjectsCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Subject))
    );
  }

  // -------------------------------
  // GET UNITS
  // -------------------------------
  getUnits(): Observable<Unit[]> {
    const unitsCollection = collection(this.firestore, 'units');
    return from(getDocs(unitsCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Unit))
    );
  }

  // -------------------------------
  // GET QUESTIONS
  // -------------------------------
  getQuestions(): Observable<Question[]> {
    const questionsCollection = collection(this.firestore, 'questions');
    return from(getDocs(questionsCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Question))
    );
  }

  // -------------------------------
  // GET ANSWERS
  // -------------------------------
  getAnswers(): Observable<Answer[]> {
    const answersCollection = collection(this.firestore, 'answers');
    return from(getDocs(answersCollection)).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Answer))
    );
  }
}
