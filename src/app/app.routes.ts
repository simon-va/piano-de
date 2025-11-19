import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventsOverviewComponent } from './components/events-overview/events-overview.component';
import { HomeComponent } from './components/home/home.component';
import { PianobuehneComponent } from './components/pianobuehne/pianobuehne.component';
import { ProductDetailComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Piano-Center Kleinhenz - Ihr Spezialist für Tasteninstrumente'
  },
  {
    path: 'kategorie/:category',
    component: CategoryComponent,
    title: (route) => `${route.params['category']} - Piano-Center Kleinhenz`
  },
  {
    path: 'produkt/:id',
    component: ProductDetailComponent,
    title: 'Produktdetails - Piano-Center Kleinhenz'
  },
  {
    path: 'pianobuehne',
    component: PianobuehneComponent,
    title: 'Pianobühne - Piano-Center Kleinhenz'
  },
  {
    path: 'konzertbericht/:id',
    component: EventDetailsComponent,
    title: 'Event Details - Piano-Center Kleinhenz'
  },
  {
    path: 'konzertberichte',
    component: EventsOverviewComponent,
    title: 'Alle Events - Piano-Center Kleinhenz'
  },
  {
    path: '**',
    redirectTo: ''
  }
];