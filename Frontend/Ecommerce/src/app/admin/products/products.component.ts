import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  removeProduct(productId: number) {
    this.productService.removeProduct(productId);
  }

  editProduct(product: Product) {
    this.productService.editProduct(product);
  }
}
