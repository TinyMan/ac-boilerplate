import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap'

@Injectable()
export class PizzasEffects {
  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
    exhaustMap(() => this.pizzaService.getPizzas()),
    map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
    catchError(error => of(new pizzaActions.LoadPizzasFail(error))),
  );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    exhaustMap(pizza => this.pizzaService.createPizza(pizza)),
    map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
    catchError(err => of(new pizzaActions.CreatePizzaFail(err))),
  );

  @Effect({ dispatch: false })
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
    map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
    tap(pizza => this.router.navigate([`/products/${pizza.id}`])),
  );

  constructor(
    private router: Router,
    private pizzaService: fromServices.PizzasService,
    private actions$: Actions,

  ) { }
}
