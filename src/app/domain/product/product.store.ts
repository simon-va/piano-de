import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { MOCK_PRODUCTS } from './product.mock';
import { brandLabels, BrandOption, CategoryInfo, conditionLabels, ConditionOption, Product, ProductBrand, ProductCategory, ProductCondition } from './product.model';

interface ProductState {
  products: Product[];
  selectedCategory: ProductCategory | null;
  selectedBrands: ProductBrand[];
  selectedConditions: ProductCondition[];
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: null,
  selectedBrands: [],
  selectedConditions: [],
  sortBy: 'default',
  loading: false
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, selectedCategory, selectedBrands, selectedConditions, sortBy }) => ({
    // Gefilterte und sortierte Produkte
    filteredProducts: computed(() => {
      let filtered = products();

      // Nach Kategorie filtern
      if (selectedCategory()) {
        filtered = filtered.filter(p => p.category === selectedCategory());
      }

      // Nach Marken filtern (nur wenn Marken ausgewählt sind)
      if (selectedBrands().length > 0) {
        filtered = filtered.filter(p => selectedBrands().includes(p.brand));
      }

      // Nach Zustand filtern (nur wenn Zustände ausgewählt sind)
      if (selectedConditions().length > 0) {
        filtered = filtered.filter(p => p.specs?.condition && selectedConditions().includes(p.specs.condition));
      }

      // Sortieren
      const sorted = [...filtered];
      switch (sortBy()) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }

      return sorted;
    }),

    // Verfügbare Hersteller mit Produktanzahl für die aktuelle Kategorie
    availableBrands: computed((): BrandOption[] => {
      let relevantProducts = products();

      // Nur Produkte der aktuellen Kategorie berücksichtigen
      if (selectedCategory()) {
        relevantProducts = relevantProducts.filter(p => p.category === selectedCategory());
      }

      // Zähle Produkte pro Hersteller
      const brandCounts = new Map<ProductBrand, number>();
      relevantProducts.forEach(product => {
        const count = brandCounts.get(product.brand) || 0;
        brandCounts.set(product.brand, count + 1);
      });

      // Erstelle sortierte Liste der verfügbaren Hersteller
      const options: BrandOption[] = Array.from(brandCounts.entries())
        .map(([brand, count]) => ({
          brand,
          label: brandLabels[brand],
          count
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      return options;
    }),

    // Verfügbare Zustände mit Produktanzahl für die aktuelle Kategorie
    availableConditions: computed((): ConditionOption[] => {
      let relevantProducts = products();

      // Nur Produkte der aktuellen Kategorie berücksichtigen
      if (selectedCategory()) {
        relevantProducts = relevantProducts.filter(p => p.category === selectedCategory());
      }

      // Zähle Produkte pro Zustand
      const conditionCounts = new Map<ProductCondition, number>();
      relevantProducts.forEach(product => {
        if (product.specs?.condition) {
          const count = conditionCounts.get(product.specs.condition) || 0;
          conditionCounts.set(product.specs.condition, count + 1);
        }
      });

      // Erstelle sortierte Liste der verfügbaren Zustände
      const options: ConditionOption[] = Array.from(conditionCounts.entries())
        .map(([condition, count]) => ({
          condition,
          label: conditionLabels[condition],
          count
        }))
        .sort((a, b) => {
          // Sortierung: Neu, Gebraucht, Restauriert
          const order = { 'Neu': 0, 'Gebraucht': 1, 'Restauriert': 2 };
          return order[a.condition] - order[b.condition];
        });

      return options;
    }),

    // Produkte nach Kategorie
    klaviere: computed(() => products().filter(p => p.category === 'klaviere')),
    fluegel: computed(() => products().filter(p => p.category === 'fluegel')),
    digitalpianos: computed(() => products().filter(p => p.category === 'digitalpianos')),

    // Highlights für Startseite (je 3)
    klaviereHighlights: computed(() => 
      products().filter(p => p.category === 'klaviere').slice(0, 3)
    ),
    fluegelHighlights: computed(() => 
      products().filter(p => p.category === 'fluegel').slice(0, 3)
    ),
    digitalpianosHighlights: computed(() => 
      products().filter(p => p.category === 'digitalpianos').slice(0, 3)
    ),

    // Kategorie-Info
    categoryInfo: computed((): CategoryInfo | null => {
      const cat = selectedCategory();
      if (!cat) return null;

      const infos: Record<ProductCategory, CategoryInfo> = {
        klaviere: {
          title: 'Klaviere',
          description: 'Traditionelle akustische Klaviere vereinen zeitlose Eleganz mit außergewöhnlicher Klangqualität. Entdecke Instrumente von Weltklasse-Herstellern für jeden Anspruch und jedes Budget.',
          slug: 'klaviere'
        },
        fluegel: {
          title: 'Flügel',
          description: 'Erlebe die Königsklasse der Tasteninstrumente. Unsere Flügel bieten unvergleichliche Klangfülle und Ausdruckskraft für höchste musikalische Ansprüche und repräsentative Räume.',
          slug: 'fluegel'
        },
        digitalpianos: {
          title: 'Digitalpianos',
          description: 'Moderne Technik trifft authentisches Spielgefühl. Unsere Digitalpianos kombinieren den Klang und die Haptik akustischer Instrumente mit den Vorteilen digitaler Technologie.',
          slug: 'digitalpianos'
        }
      };

      return infos[cat];
    }),

    // Ergebnis-Count
    resultCount: computed(() => {
      const count = computed(() => {
        let filtered = products();
        if (selectedCategory()) {
          filtered = filtered.filter(p => p.category === selectedCategory());
        }
        if (selectedBrands().length > 0) {
          filtered = filtered.filter(p => selectedBrands().includes(p.brand));
        }
        if (selectedConditions().length > 0) {
          filtered = filtered.filter(p => p.specs?.condition && selectedConditions().includes(p.specs.condition));
        }
        return filtered.length;
      });
      return count();
    })
  })),
  withMethods((store) => ({
    // Produkte laden
    loadProducts(): void {
      patchState(store, { loading: true });

      patchState(store, { 
        products: MOCK_PRODUCTS,
        loading: false 
      });
    },

    // Kategorie setzen
    setCategory(category: ProductCategory | null): void {
      patchState(store, { selectedCategory: category });
    },

    // Brand hinzufügen oder entfernen (Toggle)
    toggleBrand(brand: ProductBrand): void {
      const currentBrands = store.selectedBrands();
      const isSelected = currentBrands.includes(brand);
      
      const newBrands = isSelected
        ? currentBrands.filter(b => b !== brand)
        : [...currentBrands, brand];
      
      patchState(store, { selectedBrands: newBrands });
    },

    // Alle Brands setzen
    setBrands(brands: ProductBrand[]): void {
      patchState(store, { selectedBrands: brands });
    },

    // Alle Brands löschen
    clearBrands(): void {
      patchState(store, { selectedBrands: [] });
    },

    // Condition hinzufügen oder entfernen (Toggle)
    toggleCondition(condition: ProductCondition): void {
      const currentConditions = store.selectedConditions();
      const isSelected = currentConditions.includes(condition);
      
      const newConditions = isSelected
        ? currentConditions.filter(c => c !== condition)
        : [...currentConditions, condition];
      
      patchState(store, { selectedConditions: newConditions });
    },

    // Alle Conditions setzen
    setConditions(conditions: ProductCondition[]): void {
      patchState(store, { selectedConditions: conditions });
    },

    // Alle Conditions löschen
    clearConditions(): void {
      patchState(store, { selectedConditions: [] });
    },

    // Sortierung setzen
    setSortBy(sortBy: ProductState['sortBy']): void {
      patchState(store, { sortBy });
    },

    // Filter zurücksetzen
    resetFilters(): void {
      patchState(store, {
        selectedBrands: [],
        selectedConditions: [],
        sortBy: 'default'
      });
    },

    // Produkt nach ID finden
    getProductById(id: string): Product | undefined {
      return store.products().find(p => p.id === id);
    },
  }))
);