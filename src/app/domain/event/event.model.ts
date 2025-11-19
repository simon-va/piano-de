export interface EventArtist {
  name: string;
  instrument: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: Date;
  time: string;
  price: number;
  description: string;
  artists: EventArtist[];
  jamSession?: string;
  images: string[];
  
  // Optional: Nach dem Konzert hinzugefügt
  reportTitle?: string;
  reportContent?: string; // HTML-Content für den Bericht
  reportImages?: string[];
}