import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';

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

  //CONSTRUCTOR
  constructor(
    private orderService: OrderService,
    public route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //CHECK FOR LOCALSTORAGE
    let localBurger = localStorage.getItem("Burger");
    if(this.mode === "create" && localBurger){
      const burger = JSON.parse(localBurger);
      this.onionQ = burger.onions;
      this.lettuceQ = burger.lettuces;
      this.chesseQ = burger.cheeses;
      this.cost = burger.cost;
    }
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
          this.cost = orderData.cost;
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
      this.dialog.open(MessageComponent, {data: {message: "Burger Ordered :)!"}});
      localStorage.clear();

  }

  //INCREASE/DECREASE METHODS
  increaseOnion() {
    this.onionQ = this.onionQ + 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
  }

  decreaseOnionQ() {
    this.onionQ = this.onionQ - 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
  }
  increaseLettuceQ() {
    this.lettuceQ = this.lettuceQ + 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
  }

  decreaseLettuceQ() {
    this.lettuceQ = this.lettuceQ - 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
  }

  increaseCheeseQ() {
    this.chesseQ = this.chesseQ + 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
  }

  decreaseCheeseQ() {
    this.chesseQ = this.chesseQ - 1;
    this.cost =this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ);
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
         cost:this.calculateCost(1,this.onionQ,this.lettuceQ,this.chesseQ),
         onions:this.onionQ,
         lettuces:this.lettuceQ,
         cheeses: this.chesseQ
       })
    );
  }
}
