import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../../models/User';
import { ApiService } from '../api-service/api.service';
import { HttpInterceptor } from '../http-interceptor/http-interceptor';


@Injectable()
export class UserService {
	private apiUrl = this.apiService.apiUrl;

	constructor(
		private http: Http,
	 	private apiService: ApiService,
	 	private httpInterceptor: HttpInterceptor
	) { }

	/* ---------------------- CREAR USUARIO --------------------------------------*/
	//crea un usuario en la base de datos
	create(User: User): Observable<any> {

		let body = 'Email=' + User.email
			+ '&Password=' + User.password
			+ '&ConfirmPassword=' + User.password_confirmation;

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ 'headers': headers });


		return this.httpInterceptor.post('Account/Register', body, options)
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
	      //errMsg = `${err}`;
	      errMsg = err;
	      /*err.forEach(function(e) {
			    
	      	errMsg.push(e)
		  });*/
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    return Observable.throw(errMsg);

	    /*let body = error.json();
	    return Observable.throw(body);*/
  	}

  	//obtiene el token de autorizacion almacenado en la session
  	private getAuthorization() {
      if (sessionStorage.getItem('token')) {
        let storedToken = JSON.parse(sessionStorage.getItem('token'));
        return storedToken['token'];
      }
  	}

}
