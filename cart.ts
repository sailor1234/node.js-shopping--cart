import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {
  cartItems: any[]= [];
  total:any;
  showEmptyCartMessage:boolean = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public viewCtrl: ViewController, public toastCtrl: ToastController) {
   this.total = 0.0;
    this.storage.ready().then(()=>{
      this.storage.get("cart").then((data)=>{
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0){
          this.cartItems.forEach((item, index)=>{
            this.total = this.total + (item.product.price * item.quantity)
          })
        }else{
          this.showEmptyCartMessage = true;

        }

      })
    })
  }
  removeFromCart(item, i){
    let price = item.product.price;
    let quantity = item.quantity;
    this.cartItems.splice(i, 1);
    this.storage.set("cart", this.cartItems).then(()=>{
      this.total = this.total - (price * quantity);
    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  changeqty(item, i, change){
    let price = 0;
    let quantity = 0;

    price = parseFloat(item.product.price);
    quantity = item.quantity;
    if(change < 0 && item.quantity == 1){
      return;

    }
    quantity = quantity + change;
    item.quantity = quantity;
    item.amount = quantity*price;
    

    this.cartItems[i]= item;

    this.storage.set("cart", this.cartItems).then(()=>{
      this.toastCtrl.create({
        message:"your cart is updated",
        duration:2000,
        showCloseButton:true
      }).present();
    });
  }

  checkOut(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
