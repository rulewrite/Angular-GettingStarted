import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard implements CanActivate {
  static readonly INDEX_PRODUCT_ID = 1;

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = Number(next.url[ProductDetailGuard.INDEX_PRODUCT_ID].path);

    if (isNaN(id) || id < 1) {
      alert('Invalid product id');
      this.router.navigate(['/products']);
      return false;
    }

    return true;
  }
}
