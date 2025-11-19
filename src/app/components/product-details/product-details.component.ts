import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../domain/product/product.model';
import { ProductStore } from '../../domain/product/product.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    @if (product()) {
      <div class="breadcrumb">
        <div class="container">
          <a routerLink="/">Startseite</a> > 
          <a [routerLink]="['/kategorie', product()!.category]">
            {{ getCategoryName(product()!.category) }}
          </a> > 
          <span>{{ product()!.name }}</span>
        </div>
      </div>

      <section class="product-detail">
        <div class="container">
          <div class="detail-grid">
            <!-- Galerie -->
            <div class="detail-gallery">
              <div class="main-image">
                <img [src]="currentImage()" [alt]="product()!.name">
              </div>
              <div class="thumbnail-gallery">
                @for (img of thumbnails; track $index) {
                  <img 
                    [src]="img" 
                    [alt]="'Ansicht ' + ($index + 1)"
                    class="thumbnail"
                    [class.active]="currentImage() === img"
                    (click)="selectImage(img)">
                }
              </div>
            </div>

            <!-- Info -->
            <div class="detail-info">
              @if (product()!.badge) {
                <div class="product-badge-detail" [class]="product()!.badgeClass || ''">
                  {{ product()!.badge }}
                </div>
              }
              
              <h1>{{ product()!.name }}</h1>
              <p class="product-category-detail">{{ product()!.subCategory }}</p>
              
              <div class="price-box">
                <span class="price-label">Preis</span>
                <span class="price-amount">{{ product()!.priceDisplay }}</span>
                @if (product()!.specs?.originalPrice) {
                  <span class="original-price">Neupreis: {{ product()!.specs!.originalPrice }}</span>
                }
              </div>

              <div class="product-description-long">
                <p>{{ product()!.description }}</p>
                
                <h3>Herausragende Eigenschaften</h3>
                <ul>
                  <li>Höchste Verarbeitungsqualität</li>
                  <li>Exzellente Klangcharakteristik</li>
                  <li>Langlebige Mechanik</li>
                  <li>Erstklassige Materialien</li>
                </ul>

                <h3>Für wen geeignet?</h3>
                <p>Dieses Instrument eignet sich hervorragend für ambitionierte Spieler und Profis gleichermaßen.</p>

                <h3>Service & Garantie</h3>
                <p>Alle unsere Instrumente werden von erfahrenen Technikern optimal eingestellt. 
                   Du erhältst 5 Jahre Garantie und profitierst von unserem Stimmservice.</p>
              </div>

              @if (product()!.specs && hasAnySpecs(product()!.specs)) {
                <div class="product-specs">
                  <h3>Technische Daten</h3>
                  <table>
                    @if (product()!.specs!.condition) {
                      <tr>
                        <td><strong>Zustand:</strong></td>
                        <td>{{ product()!.specs!.condition }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.buildYear) {
                      <tr>
                        <td><strong>Baujahr:</strong></td>
                        <td>{{ product()!.specs!.buildYear }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.height) {
                      <tr>
                        <td><strong>Höhe:</strong></td>
                        <td>{{ product()!.specs!.height }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.width) {
                      <tr>
                        <td><strong>Breite:</strong></td>
                        <td>{{ product()!.specs!.width }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.depth) {
                      <tr>
                        <td><strong>Tiefe:</strong></td>
                        <td>{{ product()!.specs!.depth }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.weight) {
                      <tr>
                        <td><strong>Gewicht:</strong></td>
                        <td>{{ product()!.specs!.weight }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.pedals) {
                      <tr>
                        <td><strong>Pedale:</strong></td>
                        <td>{{ product()!.specs!.pedals }}</td>
                      </tr>
                    }
                    @if (product()!.specs!.finish) {
                      <tr>
                        <td><strong>Finish:</strong></td>
                        <td>{{ product()!.specs!.finish }}</td>
                      </tr>
                    }
                  </table>
                </div>
              }

              <div class="action-buttons">
                <button class="cta-button large" (click)="onAppointmentClick()">
                  Beratungstermin vereinbaren
                </button>
              </div>

              <div class="contact-box">
                <h4>Fragen zu diesem Instrument?</h4>
                <p>
                  Rufe uns an: <strong>09736 / 657</strong><br>
                  oder schreibe an: <strong>info@piano.de</strong>
                </p>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="additional-info">
            <div class="info-tabs">
              <button 
                class="tab-button"
                [class.active]="activeTab() === 'delivery'"
                (click)="setActiveTab('delivery')">
                Lieferung & Aufbau
              </button>
              <button 
                class="tab-button"
                [class.active]="activeTab() === 'financing'"
                (click)="setActiveTab('financing')">
                Finanzierung
              </button>
              <button 
                class="tab-button"
                [class.active]="activeTab() === 'trade'"
                (click)="setActiveTab('trade')">
                Inzahlungnahme
              </button>
            </div>

            @if (activeTab() === 'delivery') {
              <div class="tab-content">
                <h3>Professionelle Lieferung & Aufbau</h3>
                <p>Wir liefern dein neues Instrument sicher und fachgerecht zu dir nach Hause.</p>
                <ul>
                  <li>Lieferung im Umkreis von 50 km inklusive</li>
                  <li>Professioneller Aufbau durch Fachpersonal</li>
                  <li>Stimmung vor Ort</li>
                  <li>Einweisung in die Pflege</li>
                </ul>
              </div>
            }

            @if (activeTab() === 'financing') {
              <div class="tab-content">
                <h3>Flexible Finanzierungsmöglichkeiten</h3>
                <p>Mache dir deinen Traum vom eigenen Instrument noch heute wahr.</p>
                <ul>
                  <li>0% Finanzierung bei 12 Monaten Laufzeit</li>
                  <li>Flexible Laufzeiten bis 60 Monate</li>
                  <li>Auch ohne Anzahlung möglich</li>
                  <li>Schnelle Zusage</li>
                </ul>
              </div>
            }

            @if (activeTab() === 'trade') {
              <div class="tab-content">
                <h3>Dein altes Instrument in Zahlung geben</h3>
                <p>Du möchtest dein bisheriges Instrument gegen ein neues tauschen?</p>
                <ul>
                  <li>Kostenlose Bewertung vor Ort</li>
                  <li>Faire Ankaufspreise</li>
                  <li>Wir übernehmen den Abtransport</li>
                  <li>Alle Marken und Modelle</li>
                </ul>
              </div>
            }
          </div>

          <!-- Ähnliche Produkte -->
          <div class="related-products">
            <h2>Das könnte dich auch interessieren</h2>
            <div class="product-grid">
              @for (relatedProduct of relatedProducts(); track relatedProduct.id) {
                <app-product-card [product]="relatedProduct" />
              }
            </div>
          </div>
        </div>
      </section>
    } @else {
      <div class="container" style="padding: 4rem 0; text-align: center;">
        <h2>Produkt nicht gefunden</h2>
        <p>Das gesuchte Produkt existiert nicht.</p>
        <a routerLink="/" class="cta-button">Zur Startseite</a>
      </div>
    }
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

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .product-detail {
      padding: 3rem 0;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }

    .detail-gallery {
      position: sticky;
      top: 100px;
      height: fit-content;
    }

    .main-image {
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 1rem;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-gallery {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .thumbnail {
      cursor: pointer;
      border-radius: 5px;
      border: 3px solid transparent;
      transition: border-color 0.3s;
      height: 100px;
      width: 100px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .thumbnail:hover {
      border-color: #c5a572;
    }

    .thumbnail.active {
      border-color: #c5a572;
    }

    .detail-info h1 {
      font-size: 2.5rem;
      color: #1a1a2e;
      margin-bottom: 0.5rem;
    }

    .product-category-detail {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .product-badge-detail {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1rem;
      background-color: #c5a572;
      color: white;
    }

    .price-box {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
    }

    .price-label {
      display: block;
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .price-amount {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a2e;
    }

    .original-price {
      display: block;
      font-size: 0.85rem;
      color: #999;
    }

    .product-description-long {
      margin-bottom: 2rem;
      line-height: 1.8;
    }

    .product-description-long h3 {
      font-size: 1.3rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }

    .product-description-long ul {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .product-description-long li {
      margin-bottom: 0.5rem;
    }

    .product-specs {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
    }

    .product-specs h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }

    .product-specs table {
      width: 100%;
      border-collapse: collapse;
    }

    .product-specs td {
      padding: 0.7rem 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .product-specs tr:last-child td {
      border-bottom: none;
    }

    .action-buttons {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .cta-button, .secondary-button {
      padding: 1.2rem 3rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      text-align: center;
    }

    .cta-button {
      background-color: #c5a572;
      color: white;
    }

    .cta-button:hover {
      background-color: #a88d5f;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .secondary-button {
      background-color: transparent;
      color: #c5a572;
      border: 2px solid #c5a572;
    }

    .secondary-button:hover {
      background-color: #c5a572;
      color: white;
    }

    .contact-box {
      background-color: #1a1a2e;
      color: white;
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
    }

    .contact-box h4 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .contact-box strong {
      color: #c5a572;
    }

    .additional-info {
      margin-bottom: 4rem;
    }

    .info-tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 2px solid #e0e0e0;
      margin-bottom: 2rem;
    }

    .tab-button {
      background: none;
      border: none;
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
    }

    .tab-button:hover {
      color: #1a1a2e;
    }

    .tab-button.active {
      color: #1a1a2e;
      border-bottom-color: #c5a572;
    }

    .tab-content {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tab-content h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }

    .tab-content ul {
      margin-left: 1.5rem;
      margin-top: 1rem;
    }

    .tab-content li {
      margin-bottom: 0.5rem;
    }

    .related-products {
      margin-top: 4rem;
    }

    .related-products h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #1a1a2e;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 968px) {
      .detail-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .detail-gallery {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .info-tabs {
        flex-direction: column;
      }

      .tab-button {
        border-bottom: 1px solid #e0e0e0;
        border-left: 3px solid transparent;
      }

      .tab-button.active {
        border-bottom-color: #e0e0e0;
        border-left-color: #c5a572;
      }

      .product-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  protected readonly store = inject(ProductStore);
  private readonly route = inject(ActivatedRoute);

  product = signal<Product | undefined>(undefined);
  currentImage = signal<string>('');
  activeTab = signal<string>('delivery');
  thumbnails: string[] = [];
  relatedProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      const foundProduct = this.store.getProductById(productId);
      
      if (foundProduct) {
        this.product.set(foundProduct);
        this.currentImage.set(foundProduct.images[0] || '');
        this.thumbnails = foundProduct.images && foundProduct.images.length > 0
          ? foundProduct.images
          : [];

        const allInCategory = this.store.products()
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id);
        this.relatedProducts.set(allInCategory.slice(0, 2));
      }
    });
  }

  selectImage(image: string): void {
    this.currentImage.set(image);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  getCategoryName(category: string): string {
    const names: Record<string, string> = {
      'klaviere': 'Klaviere',
      'fluegel': 'Flügel',
      'digitalpianos': 'Digitalpianos'
    };
    return names[category] || category;
  }

  hasAnySpecs(specs: Product['specs']): boolean {
    if (!specs) return false;
    return !!(specs.condition || specs.buildYear || specs.height || specs.width || 
              specs.depth || specs.weight || specs.pedals || specs.finish);
  }

  onAppointmentClick(): void {
    alert('Vielen Dank für dein Interesse! In der finalen Version würde hier ein Terminbuchungs-Widget erscheinen.');
  }
}