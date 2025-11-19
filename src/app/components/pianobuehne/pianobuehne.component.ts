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
              <div class="booking-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 6C12.3431 6 11 7.34315 11 9V39C11 40.6569 12.3431 42 14 42H34C35.6569 42 37 40.6569 37 39V9C37 7.34315 35.6569 6 34 6H14Z" stroke="#c5a572" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11 11H37M11 37H37" stroke="#c5a572" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="24" cy="38" r="1.5" fill="#c5a572"/>
                  <path d="M20 8H28" stroke="#c5a572" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>Telefon</h3>
              <p><a href="tel:09736657">09736/657</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">
                <svg width="48" height="48" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" fill="#c5a572"/>
                </svg>
              </div>
              <h3>WhatsApp</h3>
              <p><a href="https://wa.me/491702982742">0170/2982742</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">
                <svg width="48" height="48" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" fill="#c5a572"/>
                </svg>
              </div>
              <h3>E-Mail</h3>
              <p><a href="mailto:info@piano.de">info@piano.de</a></p>
            </div>
            
            <div class="booking-card">
              <div class="booking-icon">
                <svg width="48" height="48" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M335.9 84.2C326.1 78.6 314 78.6 304.1 84.2L80.1 212.2C67.5 219.4 61.3 234.2 65 248.2C68.7 262.2 81.5 272 96 272L128 272L128 480L128 480L76.8 518.4C68.7 524.4 64 533.9 64 544C64 561.7 78.3 576 96 576L544 576C561.7 576 576 561.7 576 544C576 533.9 571.3 524.4 563.2 518.4L512 480L512 272L544 272C558.5 272 571.2 262.2 574.9 248.2C578.6 234.2 572.4 219.4 559.8 212.2L335.8 84.2zM464 272L464 480L400 480L400 272L464 272zM352 272L352 480L288 480L288 272L352 272zM240 272L240 480L176 480L176 272L240 272zM320 160C337.7 160 352 174.3 352 192C352 209.7 337.7 224 320 224C302.3 224 288 209.7 288 192C288 174.3 302.3 160 320 160z" fill="#c5a572"/>
                </svg>
              </div>
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
            <div class="hotel-icon">
              <svg width="64" height="64" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 88C80 74.7 90.7 64 104 64L536 64C549.3 64 560 74.7 560 88C560 101.3 549.3 112 536 112L528 112L528 528L536 528C549.3 528 560 538.7 560 552C560 565.3 549.3 576 536 576L104 576C90.7 576 80 565.3 80 552C80 538.7 90.7 528 104 528L112 528L112 112L104 112C90.7 112 80 101.3 80 88zM288 176L288 208C288 216.8 295.2 224 304 224L336 224C344.8 224 352 216.8 352 208L352 176C352 167.2 344.8 160 336 160L304 160C295.2 160 288 167.2 288 176zM192 160C183.2 160 176 167.2 176 176L176 208C176 216.8 183.2 224 192 224L224 224C232.8 224 240 216.8 240 208L240 176C240 167.2 232.8 160 224 160L192 160zM288 272L288 304C288 312.8 295.2 320 304 320L336 320C344.8 320 352 312.8 352 304L352 272C352 263.2 344.8 256 336 256L304 256C295.2 256 288 263.2 288 272zM416 160C407.2 160 400 167.2 400 176L400 208C400 216.8 407.2 224 416 224L448 224C456.8 224 464 216.8 464 208L464 176C464 167.2 456.8 160 448 160L416 160zM176 272L176 304C176 312.8 183.2 320 192 320L224 320C232.8 320 240 312.8 240 304L240 272C240 263.2 232.8 256 224 256L192 256C183.2 256 176 263.2 176 272zM416 256C407.2 256 400 263.2 400 272L400 304C400 312.8 407.2 320 416 320L448 320C456.8 320 464 312.8 464 304L464 272C464 263.2 456.8 256 448 256L416 256zM352 448L395.8 448C405.7 448 413.3 439 409.8 429.8C396 393.7 361 368 320.1 368C279.2 368 244.2 393.7 230.4 429.8C226.9 439 234.5 448 244.4 448L288.2 448L288.2 528L352.2 528L352.2 448z" fill="#c5a572"/>
              </svg>
            </div>
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
      display: flex;
      align-items: center;
      justify-content: center;
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
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
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