import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {Product} from "./product";
import {Post} from "./post";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL: string = "https://fakestoreapi.com/products";
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL).pipe(
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
