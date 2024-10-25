import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../enum/category.enum';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  products :Product[] = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  categories = Object.values(Category); 
  selectedCategory: Category = Category.Grocery;  // Default selected value

  name = '';
  price = 0;
  description = '';
  quantity = 0;
  incart = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
    const nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const product = {
      id: nextId,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.selectedCategory,
      quantity: this.quantity,
      incart: this.incart
    };
    
    this.name = '';
    this.price = 0;
    this.description = '';
    this.selectedCategory = Category.Grocery; 
    this.productService.addProduct(product);
    this.router.navigate(['/admin/products']);
  }
}