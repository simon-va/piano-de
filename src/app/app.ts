import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <footer>
      <div class="container">
        <p>&copy; 2025 Piano-Center Kleinhenz. Alle Rechte vorbehalten.</p>
        <p>Impressum | Datenschutz | AGB</p>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    main {
      min-height: calc(100vh - 200px);
    }

    footer {
      background-color: #1a1a2e;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    footer p {
      margin-bottom: 0.5rem;
    }

    footer p:last-child {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  `]
})
export class AppComponent {
  title = 'klavierhaus-hannover';
}