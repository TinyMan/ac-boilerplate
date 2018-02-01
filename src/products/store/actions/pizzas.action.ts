import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Pizzas] Load pizzas';
export const LOAD_PIZZAS_FAIL = '[Pizzas] Load pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Pizzas] Load pizzas success';
export const SELECT_PIZZA = '[Pizzas] Selct pizza';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}
export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) { }
}
export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) { }
}
export class SelectPizza implements Action {
  readonly type = SELECT_PIZZA;
  constructor(public payload: Pizza) { }
}

// action types
export type PizzasAction = LoadPizzas | LoadPizzasSuccess | LoadPizzasFail | SelectPizza;
