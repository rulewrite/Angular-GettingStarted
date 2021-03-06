import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: Product[];
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: ${message}`;
  }

  performFilter(filterBy: string): Product[] {
    const toLowerCasedFilterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product) =>
      product.productName.toLocaleLowerCase().includes(toLowerCasedFilterBy)
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (errorMessage) => (this.errorMessage = errorMessage),
    });
  }
}
