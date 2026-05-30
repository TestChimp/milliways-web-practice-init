import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';

const COLOR_MAP: Record<string, string> = {
  brown: '#8B4513',
  green: '#2E7D32',
  orange: '#FF8C00',
  pink: '#E91E63',
  cyan: '#00BCD4',
  yellow: '#FBC02D',
  blue: '#1976D2',
  purple: '#7B1FA2',
};

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly lines = this.cart.lines;
  readonly totalPrice = this.cart.totalPrice;

  orderError = signal<string | null>(null);
  submitting = signal(false);

  itemColor(color?: string): string {
    return COLOR_MAP[color ?? ''] ?? '#607D8B';
  }

  removeLine(lineId: string): void {
    this.cart.removeLine(lineId);
  }

  async placeOrder(): Promise<void> {
    if (this.lines().length === 0) return;
    this.submitting.set(true);
    this.orderError.set(null);
    console.log('Processing payment...');
    const result = await this.cart.submitOrder();
    this.submitting.set(false);
    if (result.ok) {
      await this.router.navigate(['/delivery']);
    } else {
      this.orderError.set(result.error);
    }
  }
}
