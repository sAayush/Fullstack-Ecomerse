import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  // Remove an item from the cart (or decrease quantity)
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.incart, 0);
  }
}