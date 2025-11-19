export type ProductCategory = 'klaviere' | 'fluegel' | 'digitalpianos';

export type ProductBrand =
  | 'berdux'
  | 'bechstein'
  | 'feurich'
  | 'steinberg'
  | 'kawai'
  | 'schimmel'
  | 'steinway'
  | 'blüthner'
  | 'mendelson'
  | 'steinweg'
  | 'pfeiffer'
  | 'seiler'
  | 'bösendorfer'
  | 'fazioli'
  | 'ibach'
  | 'sauter'
  | 'steingräber'
  | 'yamaha'

export type ProductCondition = 'Neu' | 'Gebraucht' | 'Restauriert';

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  subCategory: string;
  price: number;
  priceDisplay: string;
  description: string;
  images: string[];
  badge?: 'Bestseller' | 'Premium' | 'Neu';
  badgeClass?: string;
  longDescription?: string;
  specs?: ProductSpecs;
}

export interface ProductSpecs {
  condition?: ProductCondition;
  originalPrice?: string;
  buildYear?: string;
  height?: string;
  width?: string;
  depth?: string;
  weight?: string;
  pedals?: string;
  finish?: string;
}

export interface CategoryInfo {
  title: string;
  description: string;
  slug: ProductCategory;
}

export interface BrandOption {
  brand: ProductBrand;
  label: string;
  count: number;
}

export interface ConditionOption {
  condition: ProductCondition;
  label: string;
  count: number;
}

export const brandLabels: Record<ProductBrand, string> = {
  'berdux': 'Berdux',
  'bechstein': 'C.Bechstein',
  'feurich': 'Feurich',
  'steinberg': 'G.Steinberg',
  'kawai': 'Kawai',
  'schimmel': 'Schimmel',
  'steinway': 'Steinway & Sons',
  'blüthner': 'Blüthner',
  'mendelson': 'Ed. Mendelson',
  'steinweg': 'Grotrian Steinweg',
  'pfeiffer': 'Pfeiffer',
  'seiler': 'Seiler',
  'bösendorfer': 'Bösendorfer',
  'fazioli': 'Fazioli',
  'ibach': 'Ibach',
  'sauter': 'Sauter',
  'steingräber': 'Steingräber & Söhne',
  'yamaha': 'Yamaha'
};

export const conditionLabels: Record<ProductCondition, string> = {
  'Neu': 'Neu',
  'Gebraucht': 'Gebraucht',
  'Restauriert': 'Restauriert'
};