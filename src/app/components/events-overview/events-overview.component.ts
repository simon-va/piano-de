import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_EVENTS } from '../../domain/event/event.mocks';
import { EventStore } from '../../domain/event/event.store';

@Component({
  selector: 'app-events-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="konzertberichte-page">
      <!-- Header -->
      <section class="header-section">
        <div class="container">
          <h1>Konzertberichte</h1>
          <p class="subtitle">Erlebnisse und Impressionen vergangener Veranstaltungen</p>
        </div>
      </section>

      <!-- Reports List -->
      <section class="reports-section">
        <div class="container">
          @if (reportsWithContent().length > 0) {
            <div class="reports-list">
              @for (event of reportsWithContent(); track event.id) {
                <article class="report-item">
                  <a [routerLink]="['/konzertbericht', event.id]" class="report-link">
                    <div class="report-image">
                      @if (event.reportImages && event.reportImages.length > 0) {
                        <img [src]="event.reportImages[0]" [alt]="event.reportTitle || event.title">
                      } @else if (event.images && event.images.length > 0) {
                        <img [src]="event.images[0]" [alt]="event.title">
                      }
                      <div class="image-overlay">
                        <span class="read-more">Bericht lesen →</span>
                      </div>
                    </div>
                    
                    <div class="report-content">
                      <div class="report-meta">
                        <span class="report-date">{{ formatDate(event.date) }}</span>
                        <span class="report-category">{{ event.subtitle }}</span>
                      </div>
                      
                      <h2 class="report-title">{{ event.reportTitle || event.title }}</h2>
                      
                      <p class="report-excerpt">{{ getExcerpt(event.reportContent!) }}</p>
                      
                      <div class="report-footer">
                        <div class="event-info">
                          <span class="event-title">{{ event.title }}</span>
                        </div>
                        <span class="read-link">Weiterlesen →</span>
                      </div>
                    </div>
                  </a>
                </article>
              }
            </div>
          } @else {
            <div class="no-reports">
              <div class="no-reports-icon">📝</div>
              <h2>Noch keine Konzertberichte verfügbar</h2>
              <p>Berichte über vergangene Veranstaltungen werden hier erscheinen.</p>
              <a routerLink="/pianobuehne" class="cta-button">Zu den kommenden Events</a>
            </div>
          }
        </div>
      </section>

      <!-- Back to Events -->
      <section class="back-section">
        <div class="container">
          <a routerLink="/pianobuehne" class="back-link">
            ← Zurück zur Piano-Bühne
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .konzertberichte-page {
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Header Section */
    .header-section {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 5rem 0 4rem;
      text-align: center;
    }

    .header-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #c5a572;
    }

    .subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }

    /* Reports Section */
    .reports-section {
      padding: 5rem 0;
    }

    .reports-list {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .report-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .report-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .report-link {
      display: grid;
      grid-template-columns: 400px 1fr;
      text-decoration: none;
      color: inherit;
    }

    .report-image {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      aspect-ratio: 4/3;
    }

    .report-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .report-item:hover .report-image img {
      transform: scale(1.1);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
      display: flex;
      align-items: flex-end;
      padding: 1.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .report-item:hover .image-overlay {
      opacity: 1;
    }

    .read-more {
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .report-content {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .report-meta {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      font-size: 0.9rem;
    }

    .report-date {
      color: #c5a572;
      font-weight: 600;
    }

    .report-category {
      color: #666;
      padding: 0.25rem 0.75rem;
      background-color: #f0f0f0;
      border-radius: 15px;
      font-size: 0.85rem;
    }

    .report-title {
      font-size: 2rem;
      color: #1a1a2e;
      margin: 0;
      font-weight: 700;
      line-height: 1.3;
    }

    .report-excerpt {
      color: #555;
      font-size: 1.05rem;
      line-height: 1.7;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .report-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .event-info {
      display: flex;
      flex-direction: column;
    }

    .event-title {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }

    .read-link {
      color: #c5a572;
      font-weight: 600;
      font-size: 1rem;
      transition: transform 0.3s ease;
      display: inline-block;
    }

    .report-item:hover .read-link {
      transform: translateX(5px);
    }

    /* No Reports */
    .no-reports {
      text-align: center;
      padding: 5rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .no-reports-icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
    }

    .no-reports h2 {
      font-size: 2rem;
      color: #1a1a2e;
      margin-bottom: 1rem;
    }

    .no-reports p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
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

    /* Back Section */
    .back-section {
      padding: 3rem 0 5rem;
    }

    .back-link {
      color: #c5a572;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: transform 0.3s ease;
      display: inline-block;
    }

    .back-link:hover {
      transform: translateX(-5px);
    }

    /* Responsive */
    @media (max-width: 968px) {
      .report-link {
        grid-template-columns: 1fr;
      }

      .report-image {
        aspect-ratio: 16/9;
      }

      .header-section h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      .report-title {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .reports-section {
        padding: 3rem 0;
      }

      .report-content {
        padding: 1.5rem;
      }

      .report-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class EventsOverviewComponent implements OnInit {
  protected readonly eventStore = inject(EventStore);

  ngOnInit(): void {
    // Lade Mock-Events falls noch nicht geladen
    if (this.eventStore.events().length === 0) {
      this.eventStore.loadEvents(MOCK_EVENTS);
    }
  }

  // Nur Events mit Berichten
  reportsWithContent() {
    return this.eventStore.pastEventsWithReports();
  }

  formatDate(date: Date): string {
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    
    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day}. ${month} ${year}`;
  }

  getExcerpt(html: string): string {
    // Entferne HTML-Tags für den Auszug
    const text = html.replace(/<[^>]*>/g, '');
    // Begrenze auf 180 Zeichen
    return text.length > 180 ? text.substring(0, 180) + '...' : text;
  }
}