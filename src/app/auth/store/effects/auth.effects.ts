import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  logIn,
  logInError,
  logInSuccess,
  signUp,
  signUpError,
  signUpSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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

  // getUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getUser),
  //     mergeMap(({ userId }) => {
  //       return this.authService.getUser(userId).pipe(
  //         map(({ _id, name, login }) => getUserSuccess({ _id, name, login })),
  //         tap(() => this.router.navigate(['/boards'])),
  //         catchError(({ error: { statusCode, message } }) =>
  //           of(getUserError({ statusCode, message })),
  //         ),
  //       );
  //     }),
  //   );
  // });

  // updateUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updateUser),
  //     mergeMap(({ name, login, password }) => {
  //       return this.authService.updateUser(name, login, password).pipe(
  //         map((response) =>
  //           updateUserSuccess({ _id: response._id, name: response.name, login: response.login }),
  //         ),
  //         tap(() => this.router.navigate(['/settings'])),
  //         catchError(({ error: { statusCode, message } }) =>
  //           of(updateUserError({ statusCode, message })),
  //         ),
  //       );
  //     }),
  //   );
  // });

  // deleteUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteUser),
  //     mergeMap(({ userId }) => {
  //       return this.authService.deleteUser(userId).pipe(
  //         map(({ _id, name, login }) => deleteUserSuccess({ _id, name, login })),
  //         tap(() => this.router.navigate([''])),
  //         catchError(({ error: { statusCode, message } }) =>
  //           of(deleteUserError({ statusCode, message })),
  //         ),
  //       );
  //     }),
  //   );
  // });
}
