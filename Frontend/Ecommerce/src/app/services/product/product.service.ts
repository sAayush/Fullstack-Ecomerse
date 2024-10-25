import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../enum/category.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageKey = 'productsData'; 
  
  cat = Category;

  private products: Product[] = this.loadProductsFromLocalStorage() || [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 120.00,
      quantity: 10,
      description: 'High-quality wireless headphones with noise cancellation.',
      category: Category.Tech,
      incart: 0
    },
    {
      id: 2,
      name: 'Organic Bananas',
      price: 1.50,
      quantity: 10,
      description: 'Fresh organic bananas sourced from sustainable farms.',
      category: Category.Grocery,
      incart: 0
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1500.00,
      quantity: 10,
      description: 'High-performance gaming laptop with top-tier specs.',
      category: Category.Tech,
      incart: 0
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();
  
  constructor() {
    this.saveProductsToLocalStorage(); 
  }

  private loadProductsFromLocalStorage(): Product[] | null {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    return storedProducts ? JSON.parse(storedProducts) : null;
  }

  private saveProductsToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  // Validation function to ensure the product meets the criteria
  validateProduct(product: Product): string | null {
    if (product.name.length > 50) {
      return 'Product name cannot exceed 50 characters.';
    }

    const wordCount = product.description.trim().split(/\s+/).length;
    if (wordCount < 10) {
      return 'Product description must contain at least 10 words.';
    }

    if (product.price < 0) {
      return 'Product price cannot be negative.';
    }

    if (product.quantity < 0) {
      return 'Product quantity cannot be negative.';
    }

    return null; // No validation errors
  }

  addProduct(product: Product): void {
    const validationError = this.validateProduct(product);
    if (validationError) {
      throw new Error(validationError); // Throw error if validation fails
    }

    this.products.push(product);
    this.productsSubject.next(this.products);
    this.saveProductsToLocalStorage();
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.productsSubject.next(this.products);
    this.saveProductsToLocalStorage();
  }

  editProduct(updatedProduct: Product): void {
    const validationError = this.validateProduct(updatedProduct);
    if (validationError) {
      throw new Error(validationError); // Throw error if validation fails
    }

    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products);
      this.saveProductsToLocalStorage();
    }
  }
}