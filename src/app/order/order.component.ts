import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  onionQ: number = 0;
  lettuceQ: number = 0;
  chesseQ: number = 0;

  constructor() {}

  ngOnInit(): void {}

  orderBurger(OrderForm: NgForm) {
    console.log('Este metodo manda algo!');
    if(OrderForm.value.burgerName === ""){
      OrderForm.value.burgerName = "Placeholder Burger"
    }
    const BurgerOrder: object = {
      name: OrderForm.value.burgerName,
      cost : this.calculateCost(0 , this.onionQ, this.lettuceQ, this.chesseQ),
      onions: this.onionQ,
      lettuces: this.lettuceQ,
      cheeses: this.chesseQ,
    }

    console.log(BurgerOrder);
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

  increaseCheeseQ(){
    this.chesseQ = this.chesseQ +1 ;
  }

  decreaseCheeseQ(){
    this.chesseQ = this.chesseQ -1;
  }
  // END OF INCREASE/DECREASE METHODS

  calculateCost(basePrice:number, onionQ:number, lettuceQ:number, cheeseQ:number){
    return basePrice + (onionQ*1.2) + (lettuceQ*0.50 ) + (cheeseQ*0.75);
  }
}
