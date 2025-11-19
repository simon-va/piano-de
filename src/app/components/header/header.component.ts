import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled">
      <div class="container">
        <div class="logo" [routerLink]="['/']">
          <h1>Piano-Center Kleinhenz</h1>
          <p class="tagline">Tradition trifft Moderne</p>
        </div>
        
        <nav>
          <ul class="nav-links">
            <li>
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                piano.de
              </a>
            </li>
            <li class="dropdown" (mouseenter)="isInstrumenteDropdownOpen = true" (mouseleave)="isInstrumenteDropdownOpen = false">
              <a class="dropdown-toggle">Instrumente</a>
              <ul class="dropdown-menu" [class.active]="isInstrumenteDropdownOpen">
                <li>
                  <a routerLink="/kategorie/fluegel" routerLinkActive="active">
                    Flügel
                  </a>
                </li>
                <li>
                  <a routerLink="/kategorie/klaviere" routerLinkActive="active">
                    Klaviere
                  </a>
                </li>
                <li>
                  <a routerLink="/kategorie/digitalpianos" routerLinkActive="active">
                    Digitalpianos
                  </a>
                </li>
              </ul>
            </li>
            <li class="dropdown" (mouseenter)="isVeranstaltungenDropdownOpen = true" (mouseleave)="isVeranstaltungenDropdownOpen = false">
              <a class="dropdown-toggle">Veranstaltungen</a>
              <ul class="dropdown-menu" [class.active]="isVeranstaltungenDropdownOpen">
                <li>
                  <a routerLink="/pianobuehne" routerLinkActive="active">
                    Pianobühne
                  </a>
                </li>
                <li>
                  <a routerLink="/konzertberichte" routerLinkActive="active">
                    Konzertberichte
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a routerLink="/service" routerLinkActive="active">Service</a>
            </li>
            <li>
              <a routerLink="/kontakt" routerLinkActive="active">Kontakt</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      background-color: #1a1a2e;
      color: white;
      padding: 1.5rem 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      padding: 0.8rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logo h1 {
      font-size: 1.8rem;
      font-weight: 600;
      color: white;
      margin: 0 0 0.2rem 0;
      transition: all 0.3s ease;
    }

    .navbar.scrolled .logo h1 {
      font-size: 1.4rem;
      margin: 0;
    }

    .tagline {
      font-size: 0.9rem;
      color: #c5a572;
      font-style: italic;
      margin: 0;
      opacity: 1;
      max-height: 20px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .navbar.scrolled .tagline {
      opacity: 0;
      max-height: 0;
      margin: 0;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
      cursor: pointer;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #c5a572;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-toggle {
      cursor: pointer;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #16213e;
      list-style: none;
      padding: 0.5rem 0;
      margin: 0.5rem 0 0 0;
      border-radius: 5px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .dropdown-menu.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-menu li {
      padding: 0;
    }

    .dropdown-menu a {
      display: block;
      padding: 0.7rem 1.5rem;
      color: white;
      transition: background-color 0.3s;
    }

    .dropdown-menu a:hover,
    .dropdown-menu a.active {
      background-color: rgba(197, 165, 114, 0.2);
      color: #c5a572;
    }

    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        gap: 1rem;
        font-size: 0.9rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        margin-top: 0.5rem;
        display: none;
      }

      .dropdown-menu.active {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  isInstrumenteDropdownOpen = false;
  isVeranstaltungenDropdownOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    
    // Hysterese: Verschiedene Schwellenwerte für rauf und runter scrollen
    if (!this.isScrolled && scrollPosition > 80) {
      this.isScrolled = true;
    } else if (this.isScrolled && scrollPosition < 30) {
      this.isScrolled = false;
    }
  }
}