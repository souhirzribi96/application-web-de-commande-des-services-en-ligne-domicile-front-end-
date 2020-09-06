import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(credentials): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username: credentials.username,
            password: credentials.password
        }, httpOptions);
    }

    register(user): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            cin: user.cin,
            prenom: user.prenom,
            nom: user.nom,
            sexe: user.sexe,
            datenais: user.datenais,
            codepostal: user.codepostal,
            ville: user.ville,
            addresse: user.addresse,
            data: user.data,
            tel: user.tel,
            id_role: 1

        }, httpOptions);
    }

    registeret(user): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            cin: user.cin,
            prenom: user.prenom,
            nom: user.nom,
            sexe: user.sexe,
            datenais: user.datenais,
            ville: user.ville,
            sante: user.sante,
            universite: user.universite,
            data: user.data,
            tel: user.tel,
            id_role: 2,
        }, httpOptions);
    }

}
