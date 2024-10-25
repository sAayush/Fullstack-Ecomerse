import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = this.loadCartFromLocalStorage() || [];

  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  // Adds a product to the cart, stacking it if already present
  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.incart += 1; // Increment quantity if already in cart
      existingProduct.quantity -= 1; // Decrease available quantity
    } else {
      product.incart = 1; // Set initial quantity for new product
      product.quantity -= 1; // Decrease available quantity
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems); // Update the cart
    this.saveCartToLocalStorage(); // Save to local storage
  }

  // Removes a product or decreases quantity
  removeFromCart(productId: number): void {
    const existingProduct = this.cartItems.find(item => item.id === productId);
    if (existingProduct && existingProduct.incart > 1) {
      existingProduct.incart -= 1; // Decrease quantity if more than 1
      existingProduct.quantity += 1; // Increase available quantity
    }
    else if (existingProduct && existingProduct.incart == 1) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      existingProduct.quantity += 1; // Increase available quantity
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems$;
  }

  private loadCartFromLocalStorage(): Product[] | null {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : null;
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
