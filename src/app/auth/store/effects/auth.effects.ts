import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  logIn,
  logInError,
  logInSuccess,
  signUp,
  signUpError,
  signUpSuccess,
  getUser,
  getUserSuccess,
  getUserError,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logIn),
      mergeMap(({ login, password }) => {
        return this.authService.signIn({ login, password }).pipe(
          map(({ token }) => logInSuccess({ token })),
          catchError(({ error: { statusCode, message } }) => {
            return of(logInError({ statusCode, message }));
          }),
        );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ name, login, password }) => {
        return this.authService.signUp({ name, login, password }).pipe(
          map((response) =>
            signUpSuccess({ _id: response._id, name: response.name, login: response.login }),
          ),
          catchError(({ error: { statusCode, message } }) =>
            of(signUpError({ statusCode, message })),
          ),
        );
      }),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUser),
      mergeMap(({ userId }) => {
        return this.authService.getUser(userId).pipe(
          map(({ _id, name, login }) => getUserSuccess({ _id, name, login })),
          tap(() => this.router.navigate(['/boards'])),
          catchError(({ error: { statusCode, message } }) =>
            of(getUserError({ statusCode, message })),
          ),
        );
      }),
    );
  });
}
