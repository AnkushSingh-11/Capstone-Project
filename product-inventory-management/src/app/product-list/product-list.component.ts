import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // ✅ Provide CommonModule to enable *ngFor
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  viewProduct(id: number) {
    this.router.navigate(['/product-detail', id]);
  }

  editProduct(id: number) {
    this.router.navigate(['/update-product', id]);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      console.log('Product Deleted:', id);
      this.loadProducts();
    });
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
