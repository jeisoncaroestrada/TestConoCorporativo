import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import  { UserProfileService } from './user-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { slideInBottom, swipeToTop } from '../../common/transitions/main.animations';

@Component({
  selector: 'sta-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  animations: [
    slideInBottom(),
    swipeToTop(),
    
  ]
})
export class StartComponent implements OnInit {
  cover = ''

  subscription: Subscription;
  constructor(
      private userProfileService: UserProfileService,
  ) { 

    // se suscribe al triget que abre y cierra el modal para crear una nueva producto
    this.subscription = this.userProfileService.getModalProduct()
    .subscribe(openModalCreateProduct => { 
      this.openModalCreateProduct = openModalCreateProduct;
    });
      
  }

	model: User = new User();
	error = '';
  openModalCreateProduct: boolean = false;
	success = '';
	loading: boolean = false;


  ngOnInit() {

  }

}
