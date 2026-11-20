import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { googleBooksApiKey } from '../../environments/api-key';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  private readonly API_KEY = googleBooksApiKey;

  constructor(
    private http: HttpClient
  ) { }

  buscar(valorDigitado: string): Observable<any> {
    let params = new HttpParams()
      .append('q', valorDigitado)

    if (this.API_KEY.trim().length > 0) {
      params = params.append('key', this.API_KEY);
    }

    return this.http.get(this.API, { params });
  }
}
