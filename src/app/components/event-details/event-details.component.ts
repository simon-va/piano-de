import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MOCK_EVENTS } from '../../domain/event/event.mocks';
import { Event } from '../../domain/event/event.model';
import { EventStore } from '../../domain/event/event.store';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="konzertbericht-detail-page">
      @if (event()) {
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <div class="container">
            <a routerLink="/">Startseite</a> > 
            <a routerLink="/konzertberichte">Konzertberichte</a> > 
            <span>{{ event()!.reportTitle || event()!.title }}</span>
          </div>
        </div>

        <!-- Header -->
        <section class="header-section">
          <div class="container">
            <div class="header-content">
              <div class="event-badge">{{ event()!.subtitle }}</div>
              <h1>{{ event()!.reportTitle || event()!.title }}</h1>
              <div class="event-meta">
                <span class="meta-item">
                  <strong>Veranstaltung:</strong> {{ event()!.title }}
                </span>
                <span class="meta-item">
                  <strong>Datum:</strong> {{ formatDate(event()!.date) }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Image Gallery -->
        @if (hasReportImages()) {
          <section class="gallery-section">
            <div class="container">
              <div class="main-gallery-image">
                <img [src]="currentImage()" [alt]="event()!.reportTitle || event()!.title">
              </div>
              
              @if (event()!.reportImages!.length > 1) {
                <div class="thumbnail-gallery">
                  @for (img of event()!.reportImages; track $index) {
                    <img 
                      [src]="img" 
                      [alt]="'Bild ' + ($index + 1)"
                      class="thumbnail"
                      [class.active]="currentImage() === img"
                      (click)="selectImage(img)">
                  }
                </div>
              }
            </div>
          </section>
        }

        <!-- Report Content -->
        <section class="content-section">
          <div class="container">
            <article class="report-content report-description" [innerHTML]="event()!.reportContent">
            </article>
          </div>
        </section>

        <!-- Event Info Box -->
        <section class="event-info-section">
          <div class="container">
            <div class="event-info-box">
              <h3>Über diese Veranstaltung</h3>
              <div class="info-grid">
                <div class="info-item">
                  <strong>Veranstaltung:</strong>
                  <span>{{ event()!.title }}</span>
                </div>
                <div class="info-item">
                  <strong>Genre:</strong>
                  <span>{{ event()!.subtitle }}</span>
                </div>
                <div class="info-item">
                  <strong>Datum:</strong>
                  <span>{{ formatDate(event()!.date) }}</span>
                </div>
                <div class="info-item">
                  <strong>Uhrzeit:</strong>
                  <span>{{ event()!.time }}</span>
                </div>
              </div>

              @if (event()!.artists.length > 0) {
                <div class="artists-list">
                  <h4>Künstler</h4>
                  <ul>
                    @for (artist of event()!.artists; track artist.name) {
                      <li>{{ artist.name }} ({{ artist.instrument }})</li>
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <section class="navigation-section">
          <div class="container">
            <div class="navigation-links">
              <a routerLink="/konzertberichte" class="nav-link back">
                ← Alle Konzertberichte
              </a>
              <a routerLink="/pianobuehne" class="nav-link forward">
                Kommende Events →
              </a>
            </div>
          </div>
        </section>

      } @else {
        <div class="container" style="padding: 4rem 0; text-align: center;">
          <h2>Konzertbericht nicht gefunden</h2>
          <p>Der gesuchte Bericht existiert nicht oder wurde noch nicht erstellt.</p>
          <a routerLink="/konzertberichte" class="cta-button">Zu allen Berichten</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .konzertbericht-detail-page {
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Breadcrumb */
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

    /* Header Section */
    .header-section {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 4rem 0;
    }

    .header-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
    }

    .event-badge {
      display: inline-block;
      background-color: #c5a572;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .header-section h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .event-meta {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      font-size: 1.05rem;
    }

    .meta-item {
      color: rgba(255, 255, 255, 0.9);
    }

    .meta-item strong {
      color: #c5a572;
    }

    /* Gallery Section */
    .gallery-section {
      padding: 4rem 0;
      background-color: #f8f9fa;
    }

    .main-gallery-image {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      margin-bottom: 2rem;
      aspect-ratio: 16/9;
    }

    .main-gallery-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .thumbnail-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      max-width: 1000px;
      margin: 0 auto;
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

    /* Content Section */
    .content-section {
      padding: 5rem 0;
      background: white;
    }

    .report-content {
      max-width: 800px;
      margin: 0 auto;
      font-size: 1.1rem;
      line-height: 1.8;
      color: #333;
    }

    .report-content :deep(h2) {
      font-size: 2rem;
      color: #1a1a2e;
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .report-content :deep(h3) {
      font-size: 1.5rem;
      color: #1a1a2e;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .report-content :deep(p) {
      margin-bottom: 1.5rem;
    }

    .report-content :deep(p:first-child) {
      font-size: 1.25rem;
      color: #555;
      font-weight: 500;
    }

    .report-content :deep(strong) {
      color: #1a1a2e;
      font-weight: 600;
    }

    /* Event Info Section */
    .event-info-section {
      padding: 4rem 0;
      background-color: #f8f9fa;
    }

    .event-info-box {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .event-info-box h3 {
      font-size: 1.8rem;
      color: #1a1a2e;
      margin-bottom: 2rem;
      font-weight: 700;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-item strong {
      color: #c5a572;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    .info-item span {
      color: #1a1a2e;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .artists-list {
      padding-top: 2rem;
      border-top: 2px solid #e0e0e0;
    }

    .artists-list h4 {
      font-size: 1.3rem;
      color: #1a1a2e;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .artists-list ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.75rem;
    }

    .artists-list li {
      padding: 0.75rem 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      color: #333;
    }

    /* Navigation Section */
    .navigation-section {
      padding: 4rem 0 5rem;
      background: white;
    }

    .navigation-links {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .nav-link {
      color: #c5a572;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .nav-link.back:hover {
      transform: translateX(-5px);
    }

    .nav-link.forward:hover {
      transform: translateX(5px);
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
      font-size: 1rem;
    }

    .cta-button:hover {
      background-color: #a88d5f;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header-section h1 {
        font-size: 2rem;
      }

      .event-meta {
        flex-direction: column;
        gap: 0.5rem;
      }

      .report-content {
        font-size: 1rem;
      }

      .report-content :deep(h2) {
        font-size: 1.6rem;
      }

      .report-content :deep(h3) {
        font-size: 1.3rem;
      }

      .event-info-box {
        padding: 2rem;
      }

      .navigation-links {
        flex-direction: column;
        align-items: center;
      }

      .thumbnail-gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class EventDetailsComponent implements OnInit {
  protected readonly eventStore = inject(EventStore);
  private readonly route = inject(ActivatedRoute);

  event = signal<Event | undefined>(undefined);
  currentImage = signal<string>('');

  ngOnInit(): void {
    // Lade Mock-Events falls noch nicht geladen
    if (this.eventStore.events().length === 0) {
      this.eventStore.loadEvents(MOCK_EVENTS);
    }

    this.route.params.subscribe(params => {
      const eventId = params['id'];
      const foundEvent = this.eventStore.getEventById(eventId);
      
      if (foundEvent && foundEvent.reportContent) {
        this.event.set(foundEvent);
        
        // Setze das erste Bild als aktuelles Bild
        if (foundEvent.reportImages && foundEvent.reportImages.length > 0) {
          this.currentImage.set(foundEvent.reportImages[0]);
        } else if (foundEvent.images && foundEvent.images.length > 0) {
          this.currentImage.set(foundEvent.images[0]);
        }
      }
    });
  }

  selectImage(image: string): void {
    this.currentImage.set(image);
  }

  hasReportImages(): boolean {
    return !!(this.event()?.reportImages && (this.event()!.reportImages?.length ?? 0) > 0);
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
}