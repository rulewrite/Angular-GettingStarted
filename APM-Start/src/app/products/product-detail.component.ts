import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product | undefined;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.productService.getProduct(id).subscribe({
      next: (product) => (this.product = product),
      error: (errorMessage) => (this.errorMessage = errorMessage),
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
