import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  getUserBoard() {
    return this.http.get(API_URL + 'user');
  }
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  getModerator() {
    return this.http.get(API_URL + 'mod' );
  }
  getAdminBoard() {
    return this.http.get(API_URL + 'admin');
  }
}
