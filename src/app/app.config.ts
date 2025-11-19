import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { ProductStore } from './domain/product/product.store';

export function initializeApp() {
  return () => {
    const store = inject(ProductStore);
    store.loadProducts();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      // Scrollt immer nach oben bei Navigation
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
};
