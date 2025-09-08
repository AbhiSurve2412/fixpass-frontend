import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    SignUpWithGoogle:props<{ user: User ,isLoginForm : boolean}>(),
    SignUpWithEmailAndPassword: props<{ user: User,password : string }>(),
    SignUpSuccess: props<{ user: User }>(),
    SignUpFailure: props<{ error: string }>(),
    
    Login: props<{ email: string; password: string }>(),
    LoginSuccess: props<{ user: User }>(),
    LoginFailure: props<{ error: string }>(),
    
    Logout: emptyProps(),
    LogoutSuccess: emptyProps(),
    LogoutFailure: props<{ error: string }>(),

    GetUserById: props<{ userId: string }>(),          
    GetUserByIdSuccess: props<{ user: User }>(),
    GetUserByIdFailure: props<{ error: string }>(),

    UpdateUserProfile: props<{ user: Partial<User> }>(),
    UpdateUserProfileSuccess: props<{ user: User }>(),
    UpdateUserProfileFailure: props<{ error: string }>(),

    LoadUsers: emptyProps(),
    LoadUsersSuccess: props<{ users: User[] }>(),
    LoadUsersFailure: props<{ error: string }>(),
  }
});
