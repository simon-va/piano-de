import { Event } from './event.model';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'Al Jones Blues Band',
    subtitle: 'American Blues',
    date: new Date('2026-01-16T20:00:00'),
    time: '20:00 Uhr',
    price: 40,
    description: `Al Jones war der Mann der ersten Stunde, der den amerikanischen Blues in Deutschland populär machte. Seit jeher assoziiert man den Namen "Al Jones" mit Blues. Für Bluesmusiker und Bluesfreunde legte Al Jones, der Gitarrist und Sänger, den Grundstein für die deutsch-amerikanische Bluesgeschichte.

Im Laufe der Zeit entwickelte Al Jones seinen Bluesstil stetig weiter und spannt einen Bogen von legendären Originalen bis hin zu modernen Eigenkompositionen.`,
    artists: [
      { name: 'Matthias Bublath', instrument: 'Hammond, Fender Steinway-Piano' },
      { name: 'Guido May', instrument: 'Drums' },
      { name: 'Christoph Böhm', instrument: 'Gitarre' },
      { name: 'Uli Lehmann', instrument: 'Bass' }
    ],
    jamSession: 'Joe Dietz, Lutz König, Vladi Strecker und Peter Kleinhenz',
    images: [
      'assets/images/events/event_1/image_1.jpg',
      'assets/images/events/event_1/image_2.jpg',
      'assets/images/events/event_1/image_3.jpg',
      'assets/images/events/event_1/image_4.jpg',
      'assets/images/events/event_1/image_5.jpg'
    ]
  },
  {
    id: 'event-2',
    title: 'Jazz Trio Deluxe',
    subtitle: 'Modern Jazz',
    date: new Date('2026-03-20T20:00:00'),
    time: '20:00 Uhr',
    price: 35,
    description: 'Ein Abend voller improvisierter Klänge und harmonischer Überraschungen. Das Jazz Trio Deluxe präsentiert eine Mischung aus Klassikern und eigenen Kompositionen.',
    artists: [
      { name: 'Maria Schmidt', instrument: 'Piano' },
      { name: 'Thomas Weber', instrument: 'Bass' },
      { name: 'Stefan Klein', instrument: 'Drums' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 'event-3',
    title: 'Soul Night Special',
    subtitle: 'Soul & R&B',
    date: new Date('2025-11-15T20:00:00'),
    time: '20:00 Uhr',
    price: 45,
    description: 'Eine unvergessliche Nacht voller Soul und R&B mit den besten Künstlern der Szene.',
    artists: [
      { name: 'Diana Jones', instrument: 'Vocals' },
      { name: 'Marcus Brown', instrument: 'Keyboards' },
      { name: 'Paul Davis', instrument: 'Guitar' },
      { name: 'Mike Johnson', instrument: 'Bass' }
    ],
    images: [
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop'
    ],
    reportTitle: 'Jazziger Funky Soul-Jazz und Blues der Extraklasse mit Ron Williams und der jungen Profi-Band von Julian Williams',
    reportContent: `
      <p>Ron Williams der Münchner Amerikaner zeigte alle Facetten des Genre Soul, Blues und Jazz. Seine einzigartige, coole Stimme und seine Körpersprache wurden mit  frenetischen Beifall  der vielen Fans belohnt. Den Opener „Mercy Mercy spielte die Band mit Rons Sohn Julian Williams am Gesangsmikro. Dann kam unter tosendem Beifall der Star des Abends, Ron Williams, auf die Bühne und heizte mit „Mustang Sally“ und Oberthulba-Anfeuerungen den Saal an. Es folgten die Titel " Don’t Let the Green Grass Fool You  und „ I don’t need a doctor”!</p>
      <p>Der verrückt, wahnsinnig creative ,bärtige Keyboarder ,Andre Schwager,  improvisierte trotz „Tonstörung“ genial am Fender, Nord und Steinway. Der New Yorker Bassist Raul Walton spielt die absolut schwersten und rhythmischcoolen Basslinien in bester Manier und stellt zusammen mit dem excellenten  Drummer, Shuffle King, Peter Kraus den nötigen Groove des tollen Konzerts. Es folgten die Titl the thril is gone von B.B. King und „sitting on a Dock oft he bay“ von Otis Redding.</p>
      <p>Im zweiten Set sangen Ron und Julian zusammen den Titel „Aint no sunshine“ und whats going on! Beim Jam-Teil mit Peter Kleinhenz am Fender und Sebastian Mahr am Sax wurde“ Isnt she lovely“ mit Julian Williams in grosser Ton-Höhe genial mit modernem Groove gespielt. Den bühnenobligatorischen Jam-Titel „Every Day weh ave the Blues” sang Ron Williams in Perfektion und glänzender Bühnenpräsenz! Weiter kamen dann noch die Titel „Whats going on , Do I do, I got a woman im bewährtem Stil des Abends. Der von Ron gefühlvoll vorgetragene Titel „George on my Mind“  und die Zugabe „Stormy Weather“ beendeten eine spektakulären, soulig blueseigen Jazz.Night! Am Barflügel spielten Jo Dietz, Lutz König und Sebastian Mahr am Sax die Cool-down Session.</p>
      <p>Ron Williams bedankt sich bei den Bühnenfans ausdrücklich auch hier für die fantastische Unterstützung und das Mitgrooven am Konzertabend! !</p>
      <a href="https://youtu.be/1tRszg0gxCs?si=aG21ICM5zXvNMze9" target="_blank" rel="noopener noreferrer">https://youtu.be/1tRszg0gxCs?si=aG21ICM5zXvNMze9</a></br>
      <a href="https://youtu.be/JL4YgnAdcCE?si=pJBqK-OyzuvZpP53" target="_blank" rel="noopener noreferrer">https://youtu.be/JL4YgnAdcCE?si=pJBqK-OyzuvZpP53</a>
    `,
    reportImages: [
      'assets/images/events/event_2/image_1.jpg',
      'assets/images/events/event_2/image_2.jpg',
      'assets/images/events/event_2/image_3.jpg'
    ]
  }
];