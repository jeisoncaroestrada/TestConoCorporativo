import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product-service/product.service';

@Component({
  selector: 'sta-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

	model: Product = new Product();
	loading: boolean = false
    error = '';
	success = '';
	states = ['Activo','Inactivo'];
	constructor(
		private productService: ProductService
	) {

	}

	ngOnInit() {
	}

	showSuccess(success) {
		this.success = success
		delete this.error
		setTimeout(() => {
		   this.closeSuccess()
		}, 5000);
	}

	closeError() {
	this.error = null;
	}

	closeSuccess() {
		this.success = '';
	}

	createProduct(){
		this.loading = true;
		this.productService.create(this.model)
		.subscribe(
            success => {
            	this.loading = false
            	this.model = new Product();
				this.showSuccess(success.Result.Message)
            	this.error = ''
            },
            error =>  {
            	this.loading = false
               	this.error = error.Errors
               	this.success = ''
			}
       	);
	}

}
