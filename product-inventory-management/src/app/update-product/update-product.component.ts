import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product = {
    id: 0,
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    quantity: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.getProductDetails(productId);
    }
  }

  getProductDetails(id: number) {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        console.log('Product fetched for update:', this.product);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onSubmit() {
    console.log('Sending update request:', this.product);
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      (response) => {
        console.log('Product Updated:', response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
