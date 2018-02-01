import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';
import { Effect, Actions } from '@ngrx/effects';
import * as fromStore from '../../store';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ToppingsEffects {
  @Effect()
  loadToppings$ = this.actions$
    .ofType(fromStore.LOAD_TOPPINGS)
    .pipe(
    exhaustMap(() => this.toppingsService.getToppings()),
    map(toppings => new fromStore.LoadToppingsSuccess(toppings))
    )
  constructor(private toppingsService: fromServices.ToppingsService, private actions$: Actions) { }
}
