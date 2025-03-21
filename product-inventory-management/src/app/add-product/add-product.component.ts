import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    quantity: 0,
  };

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Product Added:', response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
