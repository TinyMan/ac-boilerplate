import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  loaded: boolean,
  loading: boolean,
  pizzas: Pizza[],
  selected: Pizza,
}

const initialState: PizzaState = {
  loaded: false,
  loading: false,
  pizzas: [],
  selected: null,
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {

  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.log('Load pizzas', state);
      return { ...state, loading: true, loaded: false };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      console.log('Load pizzas success', state);
      return { ...state, loading: false, loaded: true, pizzas: action.payload }
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      console.error('Load pizzas error', action.payload);
    }
    case fromPizzas.SELECT_PIZZA: {
      return { ...state, selected: action.payload }
    }
  }
  return state;
}


export const getPizzas = (state: PizzaState) => state.pizzas;
export const getSelectedPizza = (state: PizzaState) => state.selected;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
