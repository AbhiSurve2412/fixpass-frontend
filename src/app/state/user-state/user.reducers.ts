import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.model';
import { UserActions } from './user.actions';

export const initialUserState: UserState = {
  loggedInUser: undefined,
  allUsers: [],
  isAuthenticated: false,
  loading: false,
  error: undefined,
};

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.signUpWithEmailAndPassword, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UserActions.signUpWithGoogle, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UserActions.signUpSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    isAuthenticated: true,
    loading: false,
    error: undefined,
  })),

  on(UserActions.signUpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    isAuthenticated: true,
    loading: false,
    error: undefined,
  })),

  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.logout, (state) => ({
    ...state,
    loggedInUser: undefined,
    isAuthenticated: false,
    loading: false,
    error: undefined,
  })),

  on(UserActions.logoutSuccess, (state) => ({
    ...state,
    loggedInUser: undefined,
    isAuthenticated: false,
    loading: false,
    error: undefined,
  })),

  on(UserActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(UserActions.getUserById, (state) => ({
    ...state,
    loading: true,
    isAuthenticated: false,
    error: undefined,
  })),

  on(UserActions.getUserByIdSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    isAuthenticated: true,
    loading: false,
    error: undefined,
  })),

  on(UserActions.getUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error,
  })),

  on(UserActions.updateUserProfile, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UserActions.updateUserProfileSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    loading: false,
    error: undefined,
  })),

  on(UserActions.updateUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    allUsers: users,
    loading: false,
    error: undefined,
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
