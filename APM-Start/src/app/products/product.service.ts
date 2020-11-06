import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productUrl = 'api/products/products.json';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ', data)),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => {
        return products.find((product) => product.productId === id);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      return throwError(`An error occurred: ${error.error.message}`);
    }
    return throwError(
      `Server returned code: ${error.status}, error message is: ${error.message}`
    );
  }
}
