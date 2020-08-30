import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient, private router: Router) {}

  //SEND Observable
  getUpdatedOrderListener() {
    return this.ordersUpdated.asObservable();
  }
  //FETCH ALL ORDERS
  getOrders() {
    this.http
      .get<{ message: string; orders: any }>(
        'http://localhost:3000/burger/orders'
      ).pipe(map((orderData)=>{
        return{
          orders: orderData.orders.map(order =>{
            return {
              id:order._id,
              name:order.name,
              cost:order.cost,
              onions:order.onions,
              lettuces:order.lettuces,
              cheeses:order.cheeses
            };
          })
        };
      })
      ).subscribe(transformedOrderData => {
        console.log(transformedOrderData);
        this.orders = transformedOrderData.orders;
        this.ordersUpdated.next([...this.orders]);
      })
  }

  //GET ONE ORDER
  getOrder(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      cost: number;
      onions: number;
      lettuces: number;
      cheeses: number;
    }>('http://localhost:3000/burger/orders/' + id);
  }
  //ADD AN ORDER
  addOrder(
    name: string,
    cost: number,
    onions: number,
    lettuces: number,
    cheeses: number
  ) {
    const newOrder = {
      name: name,
      cost: cost,
      onions: onions,
      lettuces: lettuces,
      cheeses: cheeses,
    };
    this.http
      .post<{ message: string; order: Order }>(
        'http://localhost:3000/burger/orders',
        newOrder
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
        console.log(responseData);
      });
  }
}
