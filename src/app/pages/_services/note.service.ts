import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getAll(id_etd) {
    return this.http.get(`${baseUrl}?num=${id_etd}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }
}
