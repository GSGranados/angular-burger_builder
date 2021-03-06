import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
//ANGULAR MATERIAL IMPORTS
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { HistoryComponent } from './history/history.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
//Service
import {OrderService} from './order/order.service';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    OrderComponent,
    HistoryComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
