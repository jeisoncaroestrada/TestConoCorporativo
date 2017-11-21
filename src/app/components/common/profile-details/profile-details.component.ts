import { Component, OnInit } from '@angular/core';
import  { UserProfileService } from '../../views/start/user-profile.service';


@Component({
  selector: 'sta-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

    open: boolean = false;
  	constructor(
  		private userProfileService: UserProfileService,
  	) { 
	  
  	}

    ngOnInit() {
    }

    openModalProduct() {
     this.userProfileService.setModalProduct(true)
    }

}
