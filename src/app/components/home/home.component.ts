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
            <div class="action-card-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 32V16C4 14.8954 4.89543 14 6 14H42C43.1046 14 44 14.8954 44 16V32C44 33.1046 43.1046 34 42 34H6C4.89543 34 4 33.1046 4 32Z" stroke="#c5a572" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 14V34M16 14V34M22 14V34M28 14V34M34 14V34M40 14V34" stroke="#c5a572" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 14V28M18 14V28M30 14V28M36 14V28" stroke="#c5a572" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="action-card-content">
              <h3>Pianobühne</h3>
              <p>Erlebe Live-Konzerte und besondere Auftritte auf unserer Bühne</p>
            </div>
            <div class="action-card-arrow">→</div>
          </a>
          
          <a routerLink="/konzertberichte" class="action-card">
            <div class="action-card-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6C8 4.89543 8.89543 4 10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z" stroke="#c5a572" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30 4V14H40" stroke="#c5a572" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 24H32M16 32H32M16 40H26" stroke="#c5a572" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
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
            <div class="service-icon">
              <svg width="48" height="48" viewBox="0 0 640 640" fill="#c5a572" xmlns="http://www.w3.org/2000/svg">
                <path d="M96 144C87.2 144 80 151.2 80 160L80 448C80 456.8 87.2 464 96 464L99.3 464C109.7 427.1 143.7 400 184 400C224.3 400 258.2 427.1 268.7 464L371.3 464C376.2 446.6 386.4 431.3 400 420.1L400 160C400 151.2 392.8 144 384 144L96 144zM99.3 512L96 512C60.7 512 32 483.3 32 448L32 160C32 124.7 60.7 96 96 96L384 96C419.3 96 448 124.7 448 160L448 192L503.4 192C520.4 192 536.7 198.7 548.7 210.7L589.3 251.3C601.3 263.3 608 279.6 608 296.6L608 448C608 483.3 579.3 512 544 512L540.7 512C530.3 548.9 496.3 576 456 576C415.7 576 381.8 548.9 371.3 512L268.7 512C258.3 548.9 224.3 576 184 576C143.7 576 109.8 548.9 99.3 512zM448 320L560 320L560 296.6C560 292.4 558.3 288.3 555.3 285.3L514.7 244.7C511.7 241.7 507.6 240 503.4 240L448 240L448 320zM448 368L448 400.4C450.6 400.2 453.3 400 456 400C496.3 400 530.2 427.1 540.7 464L544 464C552.8 464 560 456.8 560 448L560 368L448 368zM184 528C206.1 528 224 510.1 224 488C224 465.9 206.1 448 184 448C161.9 448 144 465.9 144 488C144 510.1 161.9 528 184 528zM456 528C478.1 528 496 510.1 496 488C496 465.9 478.1 448 456 448C433.9 448 416 465.9 416 488C416 510.1 433.9 528 456 528z"/>
              </svg>
            </div>
            <h3>Lieferung & Aufbau</h3>
            <p>Professionelle Lieferung und fachgerechter Aufbau bei dir zu Hause.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <svg width="48" height="48" viewBox="0 0 640 640" fill="#c5a572" xmlns="http://www.w3.org/2000/svg">
                <path d="M532 71C539.6 77.1 544 86.3 544 96L544 400C544 444.2 501 480 448 480C395 480 352 444.2 352 400C352 355.8 395 320 448 320C459.2 320 470 321.6 480 324.6L480 207.9L256 257.7L256 464C256 508.2 213 544 160 544C107 544 64 508.2 64 464C64 419.8 107 384 160 384C171.2 384 182 385.6 192 388.6L192 160C192 145 202.4 132 217.1 128.8L505.1 64.8C514.6 62.7 524.5 65 532.1 71.1z"/>
              </svg>
            </div>
            <h3>Stimmservice</h3>
            <p>Regelmäßige Wartung und Stimmung durch erfahrene Klavierbauer.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <svg width="48" height="48" viewBox="0 0 640 640" fill="#c5a572" xmlns="http://www.w3.org/2000/svg">
                <path d="M392 176L248 176L210.7 101.5C208.9 97.9 208 93.9 208 89.9C208 75.6 219.6 64 233.9 64L406.1 64C420.4 64 432 75.6 432 89.9C432 93.9 431.1 97.9 429.3 101.5L392 176zM233.6 224L406.4 224L455.1 264.6C521.6 320 560 402 560 488.5C560 536.8 520.8 576 472.5 576L167.4 576C119.2 576 80 536.8 80 488.5C80 402 118.4 320 184.9 264.6L233.6 224zM324 288C313 288 304 297 304 308L304 312C275.2 312.3 252 335.7 252 364.5C252 390.2 270.5 412.1 295.9 416.3L337.6 423.3C343.6 424.3 348 429.5 348 435.6C348 442.5 342.4 448.1 335.5 448.1L280 448C269 448 260 457 260 468C260 479 269 488 280 488L304 488L304 492C304 503 313 512 324 512C335 512 344 503 344 492L344 487.3C369 483.2 388 461.6 388 435.5C388 409.8 369.5 387.9 344.1 383.7L302.4 376.7C296.4 375.7 292 370.5 292 364.4C292 357.5 297.6 351.9 304.5 351.9L352 351.9C363 351.9 372 342.9 372 331.9C372 320.9 363 311.9 352 311.9L344 311.9L344 307.9C344 296.9 335 287.9 324 287.9z"/>
              </svg>
            </div>
            <h3>Finanzierung</h3>
            <p>Flexible Finanzierungsmöglichkeiten für dein Trauminstrument.</p>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <svg width="48" height="48" viewBox="0 0 640 640" fill="#c5a572" xmlns="http://www.w3.org/2000/svg">
                <path d="M216.3 124C262.5 44 378 44 424.2 124L461.5 188.6L489.2 172.6C497.6 167.7 508.1 168.4 515.8 174.3C523.5 180.2 526.9 190.2 524.4 199.6L500.9 287C497.5 299.8 484.3 307.4 471.5 304L384.1 280.6C374.7 278.1 367.8 270.2 366.5 260.6C365.2 251 369.9 241.5 378.3 236.7L406 220.7L368.7 156.1C347.1 118.8 293.3 118.8 271.7 156.1L266.4 165.2C257.6 180.5 238 185.7 222.7 176.9C207.4 168.1 202.2 148.5 211 133.1L216.3 124zM513.7 343.1C529 334.3 548.6 339.5 557.4 354.8L562.7 363.9C608.9 443.9 551.2 543.9 458.8 543.9L384.2 543.9L384.2 575.9C384.2 585.6 378.4 594.4 369.4 598.1C360.4 601.8 350.1 599.8 343.2 592.9L279.2 528.9C269.8 519.5 269.8 504.3 279.2 495L343.2 431C350.1 424.1 360.4 422.1 369.4 425.8C378.4 429.5 384.2 438.3 384.2 448L384.2 480L458.8 480C501.9 480 528.9 433.3 507.3 396L502 386.9C493.2 371.6 498.4 352 513.7 343.2zM115 299.4L87.3 283.4C78.9 278.5 74.2 269.1 75.5 259.5C76.8 249.9 83.7 242 93.1 239.5L180.5 216C193.3 212.6 206.5 220.2 209.9 233L233.3 320.4C235.8 329.8 232.4 339.7 224.7 345.7C217 351.7 206.5 352.3 198.1 347.4L170.4 331.4L133.1 396C111.5 433.3 138.5 480 181.6 480L192.2 480C209.9 480 224.2 494.3 224.2 512C224.2 529.7 209.9 544 192.2 544L181.6 544C89.3 544 31.6 444 77.8 364L115 299.4z"/>
              </svg>
            </div>
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
      flex-shrink: 0;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
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
      display: flex;
      align-items: center;
      justify-content: center;
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