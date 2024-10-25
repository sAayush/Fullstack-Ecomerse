import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService, 
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
