import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.model';

export const USER_FEATURE_KEY = 'user';

export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getLoggedInUser = createSelector(getUserState, (state) => state.loggedInUser);

export const getAllUsers = createSelector(getUserState, (state) => state.allUsers);

export const getIsAuthenticated = createSelector(getUserState, (state) => state.isAuthenticated);

export const getIsLoading = createSelector(getUserState, (state) => state.loading);

export const getError = createSelector(getUserState, (state) => state.error);
