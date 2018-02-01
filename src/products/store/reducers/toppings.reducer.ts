import * as fromToppings from '../actions/toppings.action';
import { Pizza } from '../../models/pizza.model';
import { ToppingsAction } from 'src/products/store';

export interface ToppingsState {
  loaded: boolean,
  loading: boolean,
  toppings: string[],
}

const initialState: ToppingsState = {
  loading: false,
  loaded: false,
  toppings: []
};

export function reducer(state = initialState, action: ToppingsAction) {
  console.log("toppings reducer", state, action);
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return { ...state, loading: true, loaded: false };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      return { ...state, loading: false, loaded: true, toppings: action.payload };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
  }
  return state;
}

export const getToppings = (state: ToppingsState) => state.toppings;
