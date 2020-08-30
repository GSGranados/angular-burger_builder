import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  onionQ: number = 0;
  lettuceQ: number = 0;
  chesseQ: number = 0;
  cost: number;
  name: string = '';
  private orderId: string;
  mode: string = 'create';

  constructor(
    private orderService: OrderService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //CHECK FOR LOCALSTORAGE
    console.log(localStorage.getItem("Burger"));
    //CHECK IF WE ARE ON ORDER AGAIN MODE
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('orderId')) {
        this.mode = 'edit';
        this.orderId = paramMap.get('orderId');
        this.orderService.getOrder(this.orderId).subscribe((orderData) => {
          this.orderId = orderData._id;
          this.name = orderData.name;
          this.onionQ = orderData.onions;
          this.lettuceQ = orderData.lettuces;
          this.chesseQ = orderData.cheeses;
          this.cost = this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
          console.log(this.cost);
        });
      } else {
        this.mode = 'create';
        this.orderId = null;
      }
    });
  }

  orderBurger(OrderForm: NgForm) {
      if (OrderForm.value.burgerName === '') {
        OrderForm.value.burgerName = 'Placeholder Burger';
      }
      this.name = OrderForm.value.burgerName;
      this.cost = this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
      this.orderService.addOrder(
        this.name,
        this.cost,
        this.onionQ,
        this.lettuceQ,
        this.chesseQ
      );

  }

  //INCREASE/DECREASE METHODS
  increaseOnion() {
    this.onionQ = this.onionQ + 1;
  }

  decreaseOnionQ() {
    this.onionQ = this.onionQ - 1;
  }
  increaseLettuceQ() {
    this.lettuceQ = this.lettuceQ + 1;
  }

  decreaseLettuceQ() {
    this.lettuceQ = this.lettuceQ - 1;
  }

  increaseCheeseQ() {
    this.chesseQ = this.chesseQ + 1;
  }

  decreaseCheeseQ() {
    this.chesseQ = this.chesseQ - 1;
  }
  // END OF INCREASE/DECREASE METHODS

  calculateCost(
    basePrice: number,
    onionQ: number,
    lettuceQ: number,
    cheeseQ: number
  ) {
    return basePrice + onionQ * 1.2 + lettuceQ * 0.5 + cheeseQ * 0.75;
  }
  ngOnDestroy(){
    localStorage.setItem("Burger",
       JSON.stringify({
         name:this.name,
         cost:this.cost,
         onions:this.onionQ,
         lettuces:this.lettuceQ,
         cheeses: this.chesseQ
       })
    );
  }
}
