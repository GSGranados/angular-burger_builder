import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order/order.service';
import { Subscription } from 'rxjs';
import { Order } from '../order/order.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  private orderStatusSub: Subscription;
  constructor(private orderService: OrderService) {
   }

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
     this.orderStatusSub = this.orderService.getUpdatedOrderListener().subscribe(orderData => {
      this.orders = orderData;
    })
  }

  ngOnDestroy(){
    this.orderStatusSub.unsubscribe();
  }

}
