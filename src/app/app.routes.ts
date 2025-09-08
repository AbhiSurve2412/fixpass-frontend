import { Routes } from '@angular/router';
import { Home } from './home/home';
import { StudyMaterial } from './study-material/study-material';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'home', component: Home } ,
  { path: 'study-material', component: StudyMaterial } ,
];
