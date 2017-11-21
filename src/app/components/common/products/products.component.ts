import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../views/start/user-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../../models/Product'
import { fadeInOut, slideInBottom, slideToRight, slideInTop } from '../../common/transitions/main.animations';


@Component({
  selector: 'sta-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    fadeInOut(),
    slideInBottom(),
    slideToRight(),
    slideInTop()
  ]
})
export class ProductsComponent implements OnInit {
	subscription: Subscription;

	openModalCreateProduct: boolean = false;
  model: Product = new Product();
  loading: boolean = true;
  error = '';
  success = '';
  products = [];
  states = ['Activo','Inactivo'];
  filterProducts: string = '';

  	constructor(
  		private userProfileService: UserProfileService,
      private productService: ProductService
  	) {
    	// se suscribe al triget que abre y cierra el modal para crear un nuevo producto
      this.subscription = this.userProfileService.getModalProduct()
      .subscribe(openModalCreateProduct => { 
        this.openModalCreateProduct = openModalCreateProduct;
      });

      this.loading = true;
      this.productService.index()
      .subscribe(
        success => {
          this.loading = false
          this.products = success.Result;
        },
        error =>  {
          this.loading = false
        }
      );
    }

  ngOnInit() {
  }

  openModalProduct() {
     this.userProfileService.setModalProduct(true)
  }

  /* ---------------------- EDITAR UN PRODUCTO --------------------------------------*/
  startEdit(product){
      var original = Object.assign({}, product);
      product.original = original;
      product.editing = true;
  }

  /* ---------------------- CANCELAR LA EDICIÓN DE UN PRODUCTO --------------------------------------*/
  cancelEdit(product){
      product.Name = product.original.Name
      product.Description = product.original.Description
      product.State = product.original.State
      product.editing = false;
      delete this.error
      this.success = ''
  }

  /* ---------------------- MOSTRAR Y OCULTAR ALERTAS DE EXITO Y ERROR --------------------------------------*/
  showError(error) {
    this.error = error
    this.success = ''
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

  /* ---------------------- ABRIR CONFIRMACIÓN DE BORRADO --------------------------------------*/
  confirmDelete(product){
    product.delete = true
  }

  cancelDelete(product){
    delete product.delete
  }

  delete(product){
    product.loading = true
    this.productService.delete(product)
      .subscribe(
        success => {
          var index = this.products.indexOf(product, 0);
          if (index > -1) {
             this.products.splice(index, 1);
          }
          product.loading = false
          this.showSuccess(success.Result.Message)
        },
        error =>  {
          product.loading = false
          this.showError(error.Errors)
            
        }
      );
  }

  /* ---------------------- ACTUALIZAR UN PRODUCTO --------------------------------------*/
  update(product){
    product.loading = true
    var model = Object.assign({}, product);
    this.productService.update(model)
      .subscribe(
        success => {
          product.loading = false
          this.showSuccess(success.Result.Message)
          product.Name = model.Name
          product.Description =  model.Description
          product.State =  model.State
          product.editing = false;
        },
        error =>  {
          product.loading = false
          this.showError(error.Errors)
            
        }
      );
  }

}
