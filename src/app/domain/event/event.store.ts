import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Event } from './event.model';

interface EventState {
  events: Event[];
  loading: boolean;
}

const initialState: EventState = {
  events: [],
  loading: false
};

export const EventStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    // Nächstes Event (zukünftiges Event mit frühestem Datum)
    nextEvent: computed(() => {
      const now = new Date();
      const futureEvents = store.events()
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      return futureEvents.length > 0 ? futureEvents[0] : null;
    }),

    // Alle zukünftigen Events sortiert nach Datum
    upcomingEvents: computed(() => {
      const now = new Date();
      return store.events()
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }),

    // Vergangene Events mit Berichten (sortiert nach Datum absteigend)
    pastEventsWithReports: computed(() => {
      const now = new Date();
      return store.events()
        .filter(event => new Date(event.date) < now && event.reportContent)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }),

    // Alle vergangenen Events (sortiert nach Datum absteigend)
    pastEvents: computed(() => {
      const now = new Date();
      return store.events()
        .filter(event => new Date(event.date) < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })
  })),
  withMethods((store) => ({
    // Events laden
    loadEvents(events: Event[]): void {
      patchState(store, { events, loading: false });
    },

    // Einzelnes Event hinzufügen
    addEvent(event: Event): void {
      patchState(store, { 
        events: [...store.events(), event] 
      });
    },

    // Event aktualisieren
    updateEvent(eventId: string, updates: Partial<Event>): void {
      patchState(store, {
        events: store.events().map(event =>
          event.id === eventId ? { ...event, ...updates } : event
        )
      });
    },

    // Bericht zu Event hinzufügen
    addReportToEvent(
      eventId: string, 
      reportTitle: string, 
      reportContent: string, 
      reportImages?: string[]
    ): void {
      patchState(store, {
        events: store.events().map(event =>
          event.id === eventId 
            ? { ...event, reportTitle, reportContent, reportImages } 
            : event
        )
      });
    },

    // Event nach ID finden
    getEventById(eventId: string): Event | undefined {
      return store.events().find(event => event.id === eventId);
    },

    // Event löschen
    deleteEvent(eventId: string): void {
      patchState(store, {
        events: store.events().filter(event => event.id !== eventId)
      });
    },

    // Loading-Status setzen
    setLoading(loading: boolean): void {
      patchState(store, { loading });
    }
  }))
);