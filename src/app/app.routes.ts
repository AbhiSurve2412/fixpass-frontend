import { Routes } from '@angular/router';
import { Home } from './home/home';
import { StudyMaterial } from './study-material/study-material';
import { AuthGuard } from './shared/gaurds/auth-guard';
import { StudyMaterialResolver } from './shared/resolvers/study-material-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    resolve: {
      studyMaterial: StudyMaterialResolver,
    },
  },
  {
    path: 'home',
    component: Home,
    resolve: {
      studyMaterial: StudyMaterialResolver,
    },
  },
  {
    path: 'study-material',
    component: StudyMaterial,
    resolve: {
      studyMaterial: StudyMaterialResolver,
    },
    canActivate : [AuthGuard]
  },
];
