import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la lista de productos
  { path: 'cart', component: CartComponent }, // Ruta para el carrito
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
