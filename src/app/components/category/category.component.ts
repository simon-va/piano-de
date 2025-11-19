import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductBrand, ProductCategory, ProductCondition } from '../../domain/product/product.model';
import { ProductStore } from '../../domain/product/product.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, RouterLink],
  template: `
    <div class="breadcrumb">
      <div class="container">
        <a routerLink="/">Startseite</a> > 
        <span>{{ store.categoryInfo()?.title || 'Kategorie' }}</span>
      </div>
    </div>

    <section class="category-header">
      <div class="container">
        <h1>{{ store.categoryInfo()?.title }}</h1>
        <p class="category-intro">{{ store.categoryInfo()?.description }}</p>
      </div>
    </section>

    <section class="filter-section">
      <div class="container">
        <div class="filter-bar">
          <div class="filter-group sort-filter">
            <label>Sortieren nach:</label>
            <div class="sort-dropdown">
              <div class="multiselect-trigger" (click)="toggleSortDropdown()">
                <span class="selected-text">
                  {{ getSortLabel(selectedSort) }}
                </span>
                <span class="dropdown-arrow" [class.open]="isSortDropdownOpen">▼</span>
              </div>
              
              @if (isSortDropdownOpen) {
                <div class="multiselect-dropdown">
                  <div class="dropdown-options">
                    <div class="option-item" (click)="onSortChange('default')">
                      <span class="option-label" [class.selected]="selectedSort === 'default'">
                        Empfohlen
                      </span>
                    </div>
                    <div class="option-item" (click)="onSortChange('price-asc')">
                      <span class="option-label" [class.selected]="selectedSort === 'price-asc'">
                        Preis aufsteigend
                      </span>
                    </div>
                    <div class="option-item" (click)="onSortChange('price-desc')">
                      <span class="option-label" [class.selected]="selectedSort === 'price-desc'">
                        Preis absteigend
                      </span>
                    </div>
                    <div class="option-item" (click)="onSortChange('name-asc')">
                      <span class="option-label" [class.selected]="selectedSort === 'name-asc'">
                        Name A-Z
                      </span>
                    </div>
                    <div class="option-item" (click)="onSortChange('name-desc')">
                      <span class="option-label" [class.selected]="selectedSort === 'name-desc'">
                        Name Z-A
                      </span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="filter-group brand-filter">
            <label>Hersteller:</label>
            <div class="brand-multiselect">
              <div class="multiselect-trigger" (click)="toggleBrandDropdown()">
                <span class="selected-text">
                  @if (store.selectedBrands().length === 0) {
                    Alle Hersteller
                  } @else if (store.selectedBrands().length === 1) {
                    {{ getBrandLabel(store.selectedBrands()[0]) }}
                  } @else {
                    {{ store.selectedBrands().length }} Hersteller
                  }
                </span>
                <span class="dropdown-arrow" [class.open]="isBrandDropdownOpen">▼</span>
              </div>
              
              @if (isBrandDropdownOpen) {
                <div class="multiselect-dropdown">
                  <div class="dropdown-header">
                    <button 
                      type="button"
                      class="clear-button" 
                      (click)="clearAllBrands()"
                      [disabled]="store.selectedBrands().length === 0">
                      Alle abwählen
                    </button>
                  </div>
                  
                  <div class="dropdown-options">
                    @for (brandOption of store.availableBrands(); track brandOption.brand) {
                      <label class="option-item">
                        <input 
                          type="checkbox"
                          [checked]="isBrandSelected(brandOption.brand)"
                          (change)="onBrandToggle(brandOption.brand)">
                        <span class="option-label">
                          {{ brandOption.label }} ({{ brandOption.count }})
                        </span>
                      </label>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="filter-group condition-filter">
            <label>Zustand:</label>
            <div class="condition-multiselect">
              <div class="multiselect-trigger" (click)="toggleConditionDropdown()">
                <span class="selected-text">
                  @if (store.selectedConditions().length === 0) {
                    Alle Zustände
                  } @else if (store.selectedConditions().length === 1) {
                    {{ store.selectedConditions()[0] }}
                  } @else {
                    {{ store.selectedConditions().length }} Zustände
                  }
                </span>
                <span class="dropdown-arrow" [class.open]="isConditionDropdownOpen">▼</span>
              </div>
              
              @if (isConditionDropdownOpen) {
                <div class="multiselect-dropdown">
                  <div class="dropdown-header">
                    <button 
                      type="button"
                      class="clear-button" 
                      (click)="clearAllConditions()"
                      [disabled]="store.selectedConditions().length === 0">
                      Alle abwählen
                    </button>
                  </div>
                  
                  <div class="dropdown-options">
                    @for (conditionOption of store.availableConditions(); track conditionOption.condition) {
                      <label class="option-item">
                        <input 
                          type="checkbox"
                          [checked]="isConditionSelected(conditionOption.condition)"
                          (change)="onConditionToggle(conditionOption.condition)">
                        <span class="option-label">
                          {{ conditionOption.label }} ({{ conditionOption.count }})
                        </span>
                      </label>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="filter-results">
            <span>{{ store.filteredProducts().length }} 
              {{ store.filteredProducts().length === 1 ? 'Instrument' : 'Instrumente' }} gefunden
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="products-section">
      <div class="container">
        @if (store.filteredProducts().length > 0) {
          <div class="product-grid">
            @for (product of store.filteredProducts(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        } @else {
          <div class="no-results">
            <h3>Keine Instrumente gefunden</h3>
            <p>Versuche es mit anderen Filtereinstellungen.</p>
          </div>
        }
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Besuche uns</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Piano-Center Kleinhenz</h3>
            <p>Hans-Böckler-Str. 1<br>97723 Oberthulba/Kr. Bad Kissingen</p>
            <p>
              <strong>Telefon:</strong> 09736/657<br>
              <strong>E-Mail:</strong> info@piano.de
            </p>
            <p>
              <strong>Öffnungszeiten:</strong><br>
              Mo-Fr: 09:00 - 17:30 Uhr<br>
              Sa: 09:30 - 14:00 Uhr
            </p>
          </div>
          <div class="contact-cta">
            <h3>Vereinbare einen Termin</h3>
            <p>Lass dich persönlich beraten und teste unsere Instrumente in Ruhe.</p>
            <button class="cta-button" (click)="onAppointmentClick()">
              Jetzt Termin vereinbaren
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .breadcrumb {
      background-color: #f8f9fa;
      padding: 1rem 0;
      font-size: 0.9rem;
    }

    .breadcrumb a {
      color: #c5a572;
      text-decoration: none;
    }

    .breadcrumb a:hover {
      text-decoration: underline;
    }

    .breadcrumb span {
      color: #666;
    }

    .category-header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 3rem 0;
      text-align: center;
    }

    .category-header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .category-intro {
      font-size: 1.1rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.9);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .filter-section {
      background-color: #f8f9fa;
      padding: 2rem 0;
      border-bottom: 2px solid #e0e0e0;
    }

    .filter-bar {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .filter-group.brand-filter,
    .filter-group.condition-filter,
    .filter-group.sort-filter {
      position: relative;
    }

    .filter-group label {
      font-weight: 600;
      color: #333;
      white-space: nowrap;
    }

    .filter-select {
      padding: 0.7rem 1.2rem;
      border: 2px solid #e0e0e0;
      border-radius: 5px;
      background-color: white;
      font-size: 1rem;
      color: #333;
      cursor: pointer;
      transition: border-color 0.3s;
      min-width: 180px;
    }

    .filter-select:hover,
    .filter-select:focus {
      border-color: #c5a572;
      outline: none;
    }

    /* Multiselect Styles */
    .brand-multiselect,
    .condition-multiselect,
    .sort-dropdown {
      position: relative;
      min-width: 200px;
    }

    .multiselect-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.7rem 1.2rem;
      border: 2px solid #e0e0e0;
      border-radius: 5px;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.3s;
      user-select: none;
    }

    .multiselect-trigger:hover {
      border-color: #c5a572;
    }

    .selected-text {
      font-size: 1rem;
      color: #333;
    }

    .dropdown-arrow {
      margin-left: 0.5rem;
      font-size: 0.8rem;
      color: #666;
      transition: transform 0.3s;
    }

    .dropdown-arrow.open {
      transform: rotate(180deg);
    }

    .multiselect-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      max-height: 400px;
      display: flex;
      flex-direction: column;
    }

    .dropdown-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e0e0e0;
      background-color: #f8f9fa;
    }

    .clear-button {
      background: none;
      border: none;
      color: #c5a572;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      font-size: 0.9rem;
    }

    .clear-button:hover:not(:disabled) {
      text-decoration: underline;
    }

    .clear-button:disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    .dropdown-options {
      overflow-y: auto;
      max-height: 320px;
    }

    .option-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      user-select: none;
    }

    .option-item:hover {
      background-color: #f8f9fa;
    }

    .option-item input[type="checkbox"] {
      margin-right: 0.75rem;
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #c5a572;
    }

    .option-label {
      font-size: 1rem;
      color: #333;
    }

    .option-label.selected {
      font-weight: 600;
      color: #c5a572;
    }

    .filter-results {
      margin-left: auto;
      font-weight: 600;
      color: #666;
    }

    .products-section {
      padding: 5rem 0;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 0;
    }

    .no-results h3 {
      font-size: 1.8rem;
      color: #1a1a2e;
      margin-bottom: 1rem;
    }

    .no-results p {
      color: #666;
    }

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      color: #1a1a2e;
    }

    .contact-section {
      background-color: #f8f9fa;
      padding: 5rem 0;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }

    .contact-info h3,
    .contact-cta h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }

    .contact-info p {
      margin-bottom: 1rem;
      line-height: 1.8;
    }

    .contact-cta {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .contact-cta p {
      margin-bottom: 1.5rem;
      color: #666;
    }

    .cta-button {
      display: inline-block;
      background-color: #c5a572;
      color: white;
      padding: 1.2rem 3rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      width: 100%;
    }

    .cta-button:hover {
      background-color: #a88d5f;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 968px) {
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-select,
      .brand-multiselect,
      .condition-multiselect,
      .sort-dropdown {
        width: 100%;
      }

      .filter-results {
        margin-left: 0;
        text-align: center;
      }

      .contact-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .category-header h1 {
        font-size: 2rem;
      }

      .product-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CategoryComponent implements OnInit {
  protected readonly store = inject(ProductStore);
  private readonly route = inject(ActivatedRoute);

  selectedSort: string = 'default';
  isSortDropdownOpen = false;
  isBrandDropdownOpen = false;
  isConditionDropdownOpen = false;
  private currentCategory: ProductCategory | null = null;

  ngOnInit(): void {
    // Kategorie aus Route-Parameter laden
    this.route.params.subscribe(params => {
      const category = params['category'] as ProductCategory;
      
      // Filter nur zurücksetzen, wenn sich die Kategorie geändert hat
      if (this.currentCategory !== null && this.currentCategory !== category) {
        this.store.resetFilters();
        this.selectedSort = 'default';
      }
      
      this.currentCategory = category;
      this.store.setCategory(category);
    });
  }

  onSortChange(sortBy: string): void {
    this.selectedSort = sortBy;
    this.store.setSortBy(sortBy as any);
    this.isSortDropdownOpen = false;
  }

  getSortLabel(sortBy: string): string {
    const labels: Record<string, string> = {
      'default': 'Empfohlen',
      'price-asc': 'Preis aufsteigend',
      'price-desc': 'Preis absteigend',
      'name-asc': 'Name A-Z',
      'name-desc': 'Name Z-A'
    };
    return labels[sortBy] || 'Empfohlen';
  }

  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    if (this.isSortDropdownOpen) {
      this.isBrandDropdownOpen = false;
      this.isConditionDropdownOpen = false;
    }
  }

  // Brand-Methoden
  onBrandToggle(brand: ProductBrand): void {
    this.store.toggleBrand(brand);
  }

  isBrandSelected(brand: ProductBrand): boolean {
    return this.store.selectedBrands().includes(brand);
  }

  getBrandLabel(brand: ProductBrand): string {
    const brandOption = this.store.availableBrands().find(b => b.brand === brand);
    return brandOption?.label || brand;
  }

  clearAllBrands(): void {
    this.store.clearBrands();
  }

  toggleBrandDropdown(): void {
    this.isBrandDropdownOpen = !this.isBrandDropdownOpen;
    if (this.isBrandDropdownOpen) {
      this.isSortDropdownOpen = false;
      this.isConditionDropdownOpen = false;
    }
  }

  // Condition-Methoden
  onConditionToggle(condition: ProductCondition): void {
    this.store.toggleCondition(condition);
  }

  isConditionSelected(condition: ProductCondition): boolean {
    return this.store.selectedConditions().includes(condition);
  }

  clearAllConditions(): void {
    this.store.clearConditions();
  }

  toggleConditionDropdown(): void {
    this.isConditionDropdownOpen = !this.isConditionDropdownOpen;
    if (this.isConditionDropdownOpen) {
      this.isSortDropdownOpen = false;
      this.isBrandDropdownOpen = false;
    }
  }

  onAppointmentClick(): void {
    alert('Vielen Dank für dein Interesse! In der finalen Version würde hier ein Kontaktformular erscheinen.');
  }
}