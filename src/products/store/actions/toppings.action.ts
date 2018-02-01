import { Action } from '@ngrx/store';

export const LOAD_TOPPINGS = 'LOAD_TOPPINGS';
export const LOAD_TOPPINGS_FAIL = 'LOAD_TOPPINGS_FAIL';
export const LOAD_TOPPINGS_SUCCESS = 'LOAD_TOPPINGS_SUCCESS';

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}
export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: string[]) { }
}
export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) { }
}

// action types
export type ToppingsAction = LoadToppings | LoadToppingsSuccess | LoadToppingsFail;
