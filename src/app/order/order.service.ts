import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  constructor(private router:Router) {}

  getUpdatedOrderListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrders(){
    return [...this.orders];
  }

  addOrder(order:Order) {
    const newOrder = {
      name: order.name,
      cost: order.cost,
      onions: order.onions,
      lettuces: order.lettuces,
      cheeses: order.cheeses
    };
    this.orders.push(newOrder);
    this.ordersUpdated.next([...this.orders]);
    this.router.navigate(['/']);

  }
}
