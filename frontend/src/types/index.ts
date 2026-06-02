export type PatternType = 'flexbox' | 'grid' | 'custom';

export interface Pattern {
  _id?: string;
  name: string;
  type: PatternType;
  css: string;
  html: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatternTemplate {
  name: string;
  type: PatternType;
  css: string;
  html: string;
  description: string;
}
