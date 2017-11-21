import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (sessionStorage.getItem('token')) {
    		let storedToken = JSON.parse(sessionStorage.getItem('token'));
            let now = new Date();
            // and validate if session-token dont no expire
            if(storedToken.expires_at >= now.getTime())
                return true;
            sessionStorage.removeItem('token');
        }
        this.router.navigate(['/login']);
        return false;
    }
}