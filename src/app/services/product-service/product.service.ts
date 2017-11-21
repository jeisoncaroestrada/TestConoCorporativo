import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Product } from '../../models/Product';
import { ApiService } from '../api-service/api.service';


@Injectable()
export class ProductService {
	private apiUrl = this.apiService.apiUrl;

	constructor(
		private http: Http,
	 	private apiService: ApiService,
	) { }

	/* ---------------------- CREAR PRODUCTO --------------------------------------*/
	//crea un producto en la base de datos
	create(Product: Product): Observable<any> {

		let body = '&Name=' + Product.Name
				+ '&Description=' + Product.Description
				+ '&State=' + Product.State;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.post(this.apiService.getUrl('Api/Products'), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- LISTAR PRODUCTOS --------------------------------------*/
	//listar las productos creados
	index(): Observable<any> {

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });


		return this.http.get(this.apiService.getUrl('Api/Products'), options)
			.map(this.extractData)
            .catch(this.handleError);
	}

	/* ---------------------- ACTUALIZAR UN PRODUCTO --------------------------------------*/
	update(Product: Product): Observable<any> {
		let productId = Product.ProductId
		let body = 'ProductId=' + Product.ProductId
				+'&Name=' + Product.Name
				+ '&Description=' + Product.Description
				+ '&State=' + Product.State;

		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let options = new RequestOptions({ 'headers': headers });

		return this.http.put(this.apiService.getUrl('Api/Products/' + productId), body, options)
			.map(this.extractData)
            .catch(this.handleError);
	}

  	/* ---------------------- ELIMINAR UN PRODUCTO --------------------------------------*/
	delete(Product: Product): Observable<any> {
		let productId = Product.ProductId
		
		return this.http.delete(this.apiService.getUrl('Api/Products/' + productId))
			.map(this.extractData)
            .catch(this.handleError);
	}
	
	//extrae los datos del resultado de la peticion HTTP
	private extractData(res: Response) {
		//obtener los datos
	    let body = res.json();
	    return body || { };
  	}

  	//obtiene los mensajes de error del resultado de la peticion HTTP
  	private handleError (error: Response | any) {
	    // mostrar los errores
	    let errMsg: Array<any>;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body || JSON.stringify(body);
	      errMsg = err;
	     
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    return Observable.throw(errMsg);

  	}


}
