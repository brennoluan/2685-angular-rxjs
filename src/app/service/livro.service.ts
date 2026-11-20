import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { googleBooksApiKey } from '../../environments/api-key';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volume'
  private readonly API_KEY = googleBooksApiKey;

  constructor(
    private http: HttpClient
  ) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    let params = new HttpParams()
      .append('q', valorDigitado)

    if (this.API_KEY.trim().length > 0) {
      params = params.append('key', this.API_KEY);
    }

    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log(retornoAPI)),
      map(resultado => resultado.items ?? [])
    );
  }
}
