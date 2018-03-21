import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  user: any= {};
  billing_shipping_same: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
    this.user.shipping_address={};
    this.user.billing_address={};
    
    
    this.billing_shipping_same = false;

  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  
  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  signup(){
   
    
     let userData = {
       user:{}
     }
    userData.user = {
      fname: this.user.fname,
      lname:this.user.lname,
      email: this.user.email,
      username:this.user.username,
      password:this.user.password,
      billing_address:{
        fname: this.user.fname,
        lname:this.user.lname,
        address: this.user.billing_address.address,
        country: this.user.billing_address.country,
        state: this.user.billing_address.state,
        city: this.user.billing_address.city,
        postalcode: this.user.billing_address.postalcode,
        phone: this.user.billing_address.phone
      },
     shipping_address:{
      fname: this.user.fname,
      lname:this.user.lname,
       address: this.user.shipping_address.address,
       country: this.user.shipping_address.country,
       state: this.user.shipping_address.state,
       city: this.user.shipping_address.city,
       postalcode: this.user.shipping_address.postalcode,
       phone: this.user.shipping_address.phone,
     }
    
    }
    if(this.billing_shipping_same){
      this.user.shipping_address = this.user.shipping_address;
    }
    // this.http.post('http://localhost:8101/user/signup',(userData))
    // .subscribe((data)=>{
    //   console.log(data);
      
    //  })
    

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append ('Content-Type', 'application/json');
    return  this.http.post("http://localhost:8101/user/signup",(userData),{headers:headers})
      .subscribe((data) => {
        resolve(data);
      });
    });

    
    
    
   }

  
}
