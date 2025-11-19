import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../domain/product/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="product-card" [attr.data-id]="product.id" [routerLink]="['/produkt', product.id]">
      <div class="product-image">
        <img [src]="product.images[0]" [alt]="product.name">
        @if (product.badge) {
          <div class="product-badge" [class]="product.badgeClass || ''">
            {{ product.badge }}
          </div>
        }
      </div>
      
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="product-category">
          {{ product.subCategory }}
          @if (product.specs?.condition) {
            <span> ({{ product.specs?.condition }})</span>
          }
        </p>
        
        @if (product.specs?.buildYear) {
          <p class="product-year">Baujahr: {{ product.specs?.buildYear }}</p>
        }
        
        <p class="product-description">{{ product.description }}</p>
        
        <div class="product-footer">
          <div class="price-container">
            <span class="product-price">{{ product.priceDisplay }}</span>
            @if (product.specs?.originalPrice) {
              <span class="original-price-small">{{ product.specs?.originalPrice }}</span>
            }
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      animation: fadeInUp 0.6s ease forwards;
      cursor: pointer;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      position: relative;
      height: 250px;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: #c5a572;
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 2;
    }

    .product-badge.premium {
      background-color: #8b4513;
    }

    .product-badge.new {
      background-color: #28a745;
    }

    .product-info {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .product-info h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #1a1a2e;
    }

    .product-category {
      font-size: 0.9rem;
      color: #c5a572;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }

    .product-year {
      font-size: 0.85rem;
      color: #888;
      margin-bottom: 1rem;
      font-style: italic;
    }

    .product-description {
      color: #666;
      margin-bottom: 1.5rem;
      flex-grow: 1;
      line-height: 1.5;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .price-container {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }

    .product-price {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a1a2e;
    }

    .original-price-small {
      font-size: 0.85rem;
      color: #999;
      text-decoration: line-through;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}