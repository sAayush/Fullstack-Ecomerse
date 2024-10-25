import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../enum/category.enum';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent implements OnInit {
  categories = Object.values(Category);
  product: Product | undefined;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve product ID from the route
    this.id = +this.route.snapshot.paramMap.get('id')!;
    
    // Get the product data from the service
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === this.id);
    });
  }

  saveProduct() {
    if (this.product) {
      this.productService.editProduct(this.product);  // Update product via the service
      this.router.navigate(['/admin/products']);  // Navigate back to the product list
    }
  }
}
