import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  constructor(private http:HttpClient,private router:Router) {}

  getUpdatedOrderListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrders(){
    this.http.get<{message: string, orders:any}>("http://localhost:3000/burger/orders")
    .subscribe(ordersData=>{
      console.log(ordersData);
      this.orders = ordersData.orders;
      this.ordersUpdated.next([...this.orders]);
    });
  }

  addOrder(name:string, cost: number, onions: number, lettuces: number, cheeses: number) {
    const newOrder = {
      name: name,
      cost: cost,
      onions: onions,
      lettuces: lettuces,
      cheeses: cheeses
    };
    this.http.post<{message: string, order: Order}>("http://localhost:3000/burger/orders",newOrder).subscribe(responseData=>{
      this.router.navigate(['/']);
      console.log(responseData);
    })

  }
}
