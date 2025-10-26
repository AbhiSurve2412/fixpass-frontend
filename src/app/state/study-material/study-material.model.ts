import { Year } from '../../shared/models/year.model';
import { Branch } from '../../shared/models/branch.model';
import { College } from '../../shared/models/college.model';
import { University } from '../../shared/models/university.model';
import { Semester } from '../../shared/models/semester.model';
import { Subject } from '../../shared/models/subject.model';
import { Unit } from '../../shared/models/unit.model';
import { Question } from '../../shared/models/question.model';
import { Answer } from '../../shared/models/answer.model';

export interface StudyMaterialState {
    years: Year[];
    isYearsLoading: boolean;
    branches: Branch[];
    isBranchesLoading: boolean;
    colleges: College[];
    isCollegesLoading: boolean;
    universities: University[];
    isUniversitiesLoading: boolean;
    semesters: Semester[];
    isSemestersLoading: boolean;
    subjects: Subject[];
    isSubjectsLoading: boolean;
    units: Unit[];
    isUnitsLoading: boolean;
    questions: Question[];
    isQuestionsLoading: boolean;
    answers: Answer[];
    isAnswersLoading: boolean;
    error: string | null;
  }