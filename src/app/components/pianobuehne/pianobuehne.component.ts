import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MOCK_EVENTS } from '../../domain/event/event.mocks';
import { EventStore } from '../../domain/event/event.store';

interface CarouselImage {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-pianobuehne',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pianobuehne-page">
      <!-- Image Carousel -->
      <section class="carousel-section">
        <div class="carousel-container">
          @if (images().length > 0) {
            <div class="carousel">
              @for (image of images(); track $index) {
                <div 
                  class="carousel-slide"
                  [class.active]="currentSlide() === $index">
                  <img [src]="image.url" [alt]="image.alt">
                </div>
              }
              
              <button 
                class="carousel-button prev" 
                (click)="previousSlide()"
                aria-label="Vorheriges Bild">
                ‹
              </button>
              <button 
                class="carousel-button next" 
                (click)="nextSlide()"
                aria-label="Nächstes Bild">
                ›
              </button>
              
              <div class="carousel-dots">
                @for (image of images(); track $index) {
                  <button
                    class="dot"
                    [class.active]="currentSlide() === $index"
                    (click)="goToSlide($index)"
                    [attr.aria-label]="'Gehe zu Bild ' + ($index + 1)">
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Header Section -->
      <section class="header-section">
        <div class="container">
          <h1>Piano-Bühne</h1>
          <div class="location-info">
            <p class="address">Hans-Bördlein-Str. 1, 97723 Oberthulba</p>
            <p class="phone">Tel. 09736/657</p>
          </div>
        </div>
      </section>

      <!-- Introduction -->
      <section class="intro-section">
        <div class="container">
          <div class="intro-content">
            <p class="highlight">
              Seit 25 Jahren präsentiert die Piano-Bühne bzw. Piano-Jazz-Club Blues, Soul-Jazz, 
              R&B, Comedy und ähnliche Konzerte mit international bekannten Künstlern!
            </p>
            <p>
              Tolles Ambiente, schöne Einrichtung - Piano-Bar, Snacks und Getränke! 
              Beliebt sind die "warm up" und "cool down" Sessions an Bar und Flügeln vor und 
              nach den Konzerten mit vielen begeisterten Musikfans!
            </p>
          </div>
        </div>
      </section>

      <!-- Next Event -->
      <section class="event-section">
        <div class="container">
          @if (nextEvent()) {
            <div class="event-badge">Nächstes Event</div>
            
            <div class="event-grid">
              <!-- Event Gallery -->
              <div class="event-gallery">
                <div class="main-image">
                  <img [src]="currentEventImage()" [alt]="nextEvent()!.title">
                </div>
                <div class="thumbnail-gallery">
                  @for (img of nextEvent()!.images; track $index) {
                    <img 
                      [src]="img" 
                      [alt]="nextEvent()!.title + ' Ansicht ' + ($index + 1)"
                      class="thumbnail"
                      [class.active]="currentEventImage() === img"
                      (click)="selectEventImage(img)">
                  }
                </div>
              </div>

              <!-- Event Info -->
              <div class="event-info">
                <h2 class="event-title">{{ nextEvent()!.title }}</h2>
                <p class="event-subtitle">{{ nextEvent()!.subtitle }}</p>
                
                <div class="event-info-card">
                  <div class="info-item">
                    <span class="info-label">Datum</span>
                    <span class="info-value">{{ formatDate(nextEvent()!.date) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Uhrzeit</span>
                    <span class="info-value">{{ nextEvent()!.time }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Eintritt</span>
                    <span class="info-value">{{ nextEvent()!.price }} € pro Karte</span>
                  </div>
                </div>

                <div class="event-description">
                  <p [innerHTML]="formatDescription(nextEvent()!.description)"></p>
                </div>

                <div class="lineup">
                  <h3>Mit dabei:</h3>
                  <ul>
                    @for (artist of nextEvent()!.artists; track artist.name) {
                      <li>{{ artist.name }} ({{ artist.instrument }})</li>
                    }
                  </ul>
                  @if (nextEvent()!.jamSession) {
                    <p class="jam-session">
                      <strong>Jam mit:</strong> {{ nextEvent()!.jamSession }}
                    </p>
                  }
                </div>
              </div>
            </div>
          } @else {
            <div class="no-events">
              <p>Aktuell sind keine Veranstaltungen geplant. Schaue bald wieder vorbei!</p>
            </div>
          }
        </div>
      </section>

      <!-- Booking Section -->
      <section class="booking-section">
        <div class="container">
          <h2>Kartenbestellung</h2>
          <div class="booking-grid">
            <div class="booking-card">
              <div class="booking-icon">📞</div>
              <h3>Telefon</h3>
              <p><a href="tel:09736657">09736/657</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">💬</div>
              <h3>WhatsApp</h3>
              <p><a href="https://wa.me/491702982742">0170/2982742</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">✉️</div>
              <h3>E-Mail</h3>
              <p><a href="mailto:info@piano.de">info@piano.de</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">🏦</div>
              <h3>Überweisung</h3>
              <p class="bank-info">
                Sparkasse Bad Kissingen<br>
                IBAN: DE29 7935 1010 0810 2616 10<br>
                <small>(Karten werden an die Abendkasse gelegt)</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Hotel Recommendation -->
      <section class="hotel-section">
        <div class="container">
          <div class="hotel-recommendation">
            <div class="hotel-icon">🏨</div>
            <div class="hotel-content">
              <h3>Hotelempfehlung</h3>
              <p>
                <strong>Hotel-Gasthof Kessler</strong><br>
                Nur 800m entfernt<br>
                Tel: <a href="tel:0973681070">09736 81070</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <h2>Kontakt Piano-Bühne</h2>
          <div class="contact-info">
            <div class="contact-item">
              <strong>Adresse:</strong>
              <p>Hans-Bördlein-Str. 1<br>97723 Oberthulba</p>
            </div>
            <div class="contact-item">
              <strong>Telefon:</strong>
              <p><a href="tel:09736657">09736/657</a></p>
            </div>
            <div class="contact-item">
              <strong>E-Mail:</strong>
              <p><a href="mailto:buehne@piano.de">buehne@piano.de</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .pianobuehne-page {
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Carousel Styles */
    .carousel-section {
      background-color: #000;
    }

    .carousel-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .carousel {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
    }

    .carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .carousel-slide.active {
      opacity: 1;
    }

    .carousel-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .carousel-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      font-size: 3rem;
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: background-color 0.3s;
      z-index: 10;
      line-height: 1;
    }

    .carousel-button:hover {
      background-color: rgba(197, 165, 114, 0.8);
    }

    .carousel-button.prev {
      left: 20px;
    }

    .carousel-button.next {
      right: 20px;
    }

    .carousel-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 10;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      border: 2px solid white;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0;
    }

    .dot:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }

    .dot.active {
      background-color: #c5a572;
      border-color: #c5a572;
      width: 14px;
      height: 14px;
    }

    /* Header Section */
    .header-section {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 4rem 0 3rem;
      text-align: center;
    }

    .header-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
      color: #c5a572;
    }

    .location-info {
      font-size: 1.2rem;
    }

    .location-info p {
      margin: 0.5rem 0;
    }

    .address {
      font-weight: 500;
    }

    .phone {
      color: #c5a572;
      font-weight: 600;
    }

    /* Introduction Section */
    .intro-section {
      padding: 4rem 0;
      background-color: #f8f9fa;
    }

    .intro-content {
      max-width: 900px;
      margin: 0 auto;
      font-size: 1.1rem;
      line-height: 1.8;
    }

    .intro-content p {
      margin-bottom: 1.5rem;
    }

    .highlight {
      font-size: 1.3rem;
      font-weight: 600;
      color: #1a1a2e;
      padding: 2rem;
      background: white;
      border-left: 4px solid #c5a572;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    /* Event Section */
    .event-section {
      padding: 5rem 0;
      background: white;
    }

    .event-badge {
      display: inline-block;
      background-color: #c5a572;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      margin-bottom: 2rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .event-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-top: 2rem;
    }

    /* Event Gallery */
    .event-gallery {
      position: sticky;
      top: 100px;
      height: fit-content;
      align-self: start;
    }

    .main-image {
      width: 100%;
      aspect-ratio: 4/3;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      margin-bottom: 1rem;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-gallery {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
    }

    .thumbnail {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      border: 3px solid transparent;
    }

    .thumbnail:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }

    .thumbnail.active {
      border-color: #c5a572;
      opacity: 1;
    }

    /* Event Info */
    .event-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .event-title {
      font-size: 2.5rem;
      color: #1a1a2e;
      margin: 0;
      font-weight: 700;
    }

    .event-subtitle {
      font-size: 1.3rem;
      color: #666;
      margin: 0;
      font-style: italic;
    }

    .event-info-card {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 2rem;
      border-radius: 12px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-label {
      color: #c5a572;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    .info-value {
      color: white;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .event-description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #333;
    }

    .event-description p {
      margin-bottom: 1.5rem;
    }

    .lineup {
      background-color: #f8f9fa;
      padding: 2rem;
      border-radius: 12px;
    }

    .lineup h3 {
      font-size: 1.5rem;
      color: #1a1a2e;
      margin-bottom: 1rem;
    }

    .lineup ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1.5rem;
    }

    .lineup ul li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #ddd;
      font-size: 1.05rem;
    }

    .lineup ul li:last-child {
      border-bottom: none;
    }

    .jam-session {
      padding-top: 1rem;
      border-top: 2px solid #c5a572;
      font-size: 1.05rem;
    }

    .no-events {
      text-align: center;
      padding: 4rem 2rem;
      background-color: #f8f9fa;
      border-radius: 12px;
      margin-top: 2rem;
    }

    .no-events p {
      font-size: 1.2rem;
      color: #666;
    }

    /* Booking Section */
    .booking-section {
      padding: 5rem 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
    }

    .booking-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #c5a572;
    }

    .booking-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .booking-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
      border: 2px solid rgba(197, 165, 114, 0.3);
    }

    .booking-card:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #c5a572;
      transform: translateY(-5px);
    }

    .booking-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .booking-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #c5a572;
    }

    .booking-card p {
      font-size: 1.1rem;
      margin: 0;
    }

    .booking-card a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }

    .booking-card a:hover {
      color: #c5a572;
    }

    .bank-info {
      line-height: 1.8;
    }

    .bank-info small {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #c5a572;
    }

    /* Hotel Section */
    .hotel-section {
      padding: 4rem 0;
      background-color: #f8f9fa;
    }

    .hotel-recommendation {
      max-width: 700px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 2rem;
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .hotel-icon {
      font-size: 4rem;
      flex-shrink: 0;
    }

    .hotel-content h3 {
      font-size: 1.5rem;
      color: #1a1a2e;
      margin-bottom: 0.5rem;
    }

    .hotel-content p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin: 0;
    }

    .hotel-content a {
      color: #c5a572;
      text-decoration: none;
      font-weight: 600;
    }

    .hotel-content a:hover {
      text-decoration: underline;
    }

    /* Contact Section */
    .contact-section {
      padding: 5rem 0;
      background: white;
    }

    .contact-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #1a1a2e;
    }

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .contact-item {
      text-align: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 12px;
    }

    .contact-item strong {
      display: block;
      color: #c5a572;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-item p {
      margin: 0;
      font-size: 1.1rem;
      line-height: 1.8;
    }

    .contact-item a {
      color: #1a1a2e;
      text-decoration: none;
      font-weight: 600;
    }

    .contact-item a:hover {
      color: #c5a572;
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .event-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .event-gallery {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .carousel {
        height: 300px;
      }

      .carousel-button {
        font-size: 2rem;
        padding: 0.5rem 1rem;
      }

      .carousel-button.prev {
        left: 10px;
      }

      .carousel-button.next {
        right: 10px;
      }

      .header-section h1 {
        font-size: 2.5rem;
      }

      .location-info {
        font-size: 1rem;
      }

      .highlight {
        font-size: 1.1rem;
        padding: 1.5rem;
      }

      .event-title {
        font-size: 2rem;
      }

      .event-subtitle {
        font-size: 1.2rem;
      }

      .event-info-card {
        grid-template-columns: 1fr;
      }

      .hotel-recommendation {
        flex-direction: column;
        text-align: center;
      }

      .booking-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PianobuehneComponent implements OnInit, OnDestroy {
  protected readonly eventStore = inject(EventStore);
  
  currentSlide = signal(0);
  currentEventImage = signal<string>('');
  private intervalId?: number;

  // Computed: Nächstes Event aus dem Store
  nextEvent = computed(() => this.eventStore.nextEvent());

  // Platzhalter für Bilder - diese werden später dynamisch geladen
  images = signal<CarouselImage[]>([
    {
      url: 'assets/images/pianobuehne/image_1.png',
      alt: 'Piano-Bühne Konzert 1'
    },
    {
      url: 'assets/images/pianobuehne/image_2.png',
      alt: 'Piano-Bühne Konzert 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&h=500&fit=crop',
      alt: 'Piano-Bühne Konzert 3'
    },
    {
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=500&fit=crop',
      alt: 'Piano-Bühne Konzert 4'
    }
  ]);

  ngOnInit(): void {
    // Lade Mock-Events
    this.eventStore.loadEvents(MOCK_EVENTS);
    
    this.startAutoPlay();
    
    // Setze das erste Event-Bild als aktuelles Bild
    const next = this.nextEvent();
    if (next && next.images.length > 0) {
      this.currentEventImage.set(next.images[0]);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    const nextIndex = (this.currentSlide() + 1) % this.images().length;
    this.currentSlide.set(nextIndex);
  }

  previousSlide(): void {
    const prevIndex = this.currentSlide() === 0 
      ? this.images().length - 1 
      : this.currentSlide() - 1;
    this.currentSlide.set(prevIndex);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  selectEventImage(image: string): void {
    this.currentEventImage.set(image);
  }

  formatDate(date: Date): string {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    
    const d = new Date(date);
    const dayName = days[d.getDay()];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${dayName}, ${day}. ${month} ${year}`;
  }

  formatDescription(description: string): string {
    // Wandelt Zeilenumbrüche in <p> Tags um
    return description.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }
}