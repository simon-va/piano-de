import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductStore } from '../../domain/product/product.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h2>Größte Gebrauchtflügel-Ausstellung Deutschlands</h2>
        <p>Hochwertige Instrumente für Anfänger und Profis</p>
        <button class="cta-button" (click)="scrollToKlaviere()">
          Unsere Auswahl entdecken
        </button>
      </div>
    </section>

    <!-- Action Cards Section -->
    <section class="action-cards-section">
      <div class="container">
        <div class="action-cards-grid">
          <a routerLink="/pianobuehne" class="action-card">
            <div class="action-card-icon">🎹</div>
            <div class="action-card-content">
              <h3>Pianobühne</h3>
              <p>Erlebe Live-Konzerte und besondere Auftritte auf unserer Bühne</p>
            </div>
            <div class="action-card-arrow">→</div>
          </a>
          
          <a routerLink="/konzertberichte" class="action-card">
            <div class="action-card-icon">📰</div>
            <div class="action-card-content">
              <h3>Konzertberichte</h3>
              <p>Berichte und Impressionen vergangener Veranstaltungen</p>
            </div>
            <div class="action-card-arrow">→</div>
          </a>
        </div>
      </div>
    </section>

    <!-- Flügel Section -->
    <section class="products-section alternate" id="fluegel">
      <div class="container">
        <h2 class="section-title">Flügel</h2>
        <p class="section-subtitle">
          Eleganz und Klangfülle für besondere Momente
        </p>
        
        <div class="product-grid">
          @for (product of store.fluegelHighlights(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
        <div class="more-button-container">
          <a routerLink="/kategorie/fluegel" class="cta-button">
            Alle Flügel ansehen
          </a>
        </div>
      </div>
    </section>

    <!-- Klaviere Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Klaviere</h2>
        <p class="section-subtitle">
          Traditionelle akustische Klaviere für höchste Ansprüche
        </p>
        
        <div class="product-grid">
          @for (product of store.klaviereHighlights(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
        <div class="more-button-container">
          <a routerLink="/kategorie/klaviere" class="cta-button">
            Alle Klaviere ansehen
          </a>
        </div>
      </div>
    </section>

    <!-- Digitalpianos Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Digitalpianos</h2>
        <p class="section-subtitle">
          Moderne Technik trifft authentisches Spielgefühl
        </p>
        
        <div class="product-grid">
          @for (product of store.digitalpianosHighlights(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
        <div class="more-button-container">
          <a routerLink="/kategorie/digitalpianos" class="cta-button">
            Alle Digitalpianos ansehen
          </a>
        </div>
      </div>
    </section>

    <!-- Service Section -->
    <section class="service-section">
      <div class="container">
        <h2 class="section-title">Unser Service</h2>
        <div class="service-grid">
          <div class="service-card">
            <div class="service-icon">🚚</div>
            <h3>Lieferung & Aufbau</h3>
            <p>Professionelle Lieferung und fachgerechter Aufbau bei dir zu Hause.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🎵</div>
            <h3>Stimmservice</h3>
            <p>Regelmäßige Wartung und Stimmung durch erfahrene Klavierbauer.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">💰</div>
            <h3>Finanzierung</h3>
            <p>Flexible Finanzierungsmöglichkeiten für dein Trauminstrument.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🔄</div>
            <h3>Inzahlungnahme</h3>
            <p>Wir nehmen dein altes Instrument fair in Zahlung.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Besuche uns</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Piano-Center Kleinhenz</h3>
            <p>Hans-Bördlein-Str. 1<br>97723 Oberthulba/Kr. Bad Kissingen</p>
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
    .hero {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 8rem 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h100v100H0z" fill="none"/><path d="M50 10v80M10 50h80" stroke="rgba(197,165,114,0.1)" stroke-width="2"/></svg>');
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero h2 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero p {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .action-cards-section {
      padding: 4rem 0 2rem;
      background-color: #fff;
    }

    .action-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(197, 165, 114, 0.1) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .action-card:hover::before {
      opacity: 1;
    }

    .action-card-icon {
      font-size: 3rem;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .action-card-content {
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .action-card-content h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      color: #c5a572;
    }

    .action-card-content p {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.5;
      margin: 0;
    }

    .action-card-arrow {
      font-size: 2rem;
      color: #c5a572;
      transition: transform 0.3s ease;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .action-card:hover .action-card-arrow {
      transform: translateX(5px);
    }

    .products-section {
      padding: 5rem 0;
    }

    .products-section.alternate {
      background-color: #f8f9fa;
    }

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      color: #1a1a2e;
    }

    .section-subtitle {
      font-size: 1.1rem;
      text-align: center;
      color: #666;
      margin-bottom: 3rem;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .more-button-container {
      text-align: center;
      margin-top: 3rem;
    }

    .cta-button {
      display: inline-block;
      background-color: #c5a572;
      color: white;
      padding: 1rem 2.5rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .cta-button:hover {
      background-color: #a88d5f;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .service-section {
      background-color: #f8f9fa;
      padding: 5rem 0;
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }

    .service-card:hover {
      transform: translateY(-5px);
    }

    .service-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .service-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }

    .service-card p {
      color: #666;
      line-height: 1.6;
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

    .contact-cta .cta-button {
      width: 100%;
      padding: 1.2rem 3rem;
      font-size: 1.1rem;
    }

    @media (max-width: 968px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      
      .action-cards-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .hero h2 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .product-grid {
        grid-template-columns: 1fr;
      }

      .service-grid {
        grid-template-columns: 1fr;
      }

      .action-card {
        flex-direction: column;
        text-align: center;
      }

      .action-card-arrow {
        transform: rotate(90deg);
      }

      .action-card:hover .action-card-arrow {
        transform: rotate(90deg) translateX(5px);
      }
    }
  `]
})
export class HomeComponent {
  protected readonly store = inject(ProductStore);

  onAppointmentClick(): void {
    alert('Vielen Dank für dein Interesse! In der finalen Version würde hier ein Kontaktformular erscheinen.');
  }

  scrollToKlaviere(): void {
    const el = document.getElementById('fluegel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}