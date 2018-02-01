import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

import * as fromStore from '../../store';
import { ProductsState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="selected$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  selected$: Observable<Pizza>;
  toppings$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ProductsState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPizzas);
    this.store.dispatch(new fromStore.LoadToppings);
    this.pizza$ = this.route.params.pipe(
      switchMap(params => {
        if (params.id === 'new') {
          return of({})
        }
        return this.store.select(fromStore.getPizzas).pipe(
          map(pizzas => pizzas.find(pizza => pizza.id === parseInt(params.id, 10))),
        )
      }),
      tap(pizza => this.store.dispatch(new fromStore.SelectPizza(pizza))),
    );
    this.selected$ = this.store.select(fromStore.getSelectedPizza);
    this.toppings$ = this.store.select(fromStore.getToppings).pipe(tap(e => console.log(e)));
    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   const param = this.route.snapshot.params.id;
    //   let pizza;
    //   if (param === 'new') {
    //     pizza = {};
    //   } else {
    //     pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
    //   }
    //   this.pizza = pizza;
    //   this.toppingsService.getToppings().subscribe(toppings => {
    //     this.toppings = toppings;
    //   });
    //   this.store.dispatch(new fromStore.SelectPizza(this.pizza));
    // });

  }

  onSelect(event: Pizza) {
    this.store.dispatch(new fromStore.SelectPizza(event));
  }

  onCreate(event: Pizza) {
    // this.pizzaService.createPizza(event).subscribe(pizza => {
    //   this.router.navigate([`/products/${pizza.id}`]);
    // });
  }

  onUpdate(event: Pizza) {
    // this.pizzaService.updatePizza(event).subscribe(() => {
    //   this.router.navigate([`/products`]);
    // });
  }

  onRemove(event: Pizza) {
    // const remove = window.confirm('Are you sure?');
    // if (remove) {
    //   this.pizzaService.removePizza(event).subscribe(() => {
    //     this.router.navigate([`/products`]);
    //   });
    // }
  }
}
