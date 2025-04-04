
export type StitchType = 'knit' | 'purl' | 'yo' | 'k2tog' | 'ssk' | 'blank';

export interface Stitch {
  id: string;
  type: StitchType;
  x: number;
  y: number;
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  stitches: Stitch[];
  yarnWeight: YarnWeight;
  needleSize: string;
  difficulty: Difficulty;
  category: PatternCategory;
  instructions?: string;
  author?: string;
  createdAt: Date;
}

export type YarnWeight = 
  | 'Lace (0)' 
  | 'Super Fine (1)' 
  | 'Fine (2)' 
  | 'Light (3)' 
  | 'Medium (4)' 
  | 'Bulky (5)' 
  | 'Super Bulky (6)' 
  | 'Jumbo (7)';

export type Difficulty = 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced';

export type PatternCategory = 
  | 'Sweater' 
  | 'Scarf' 
  | 'Hat' 
  | 'Socks' 
  | 'Blanket' 
  | 'Accessories'
  | 'Home Decor'
  | 'Toy'
  | 'Other';

export interface PatternGenerationOptions {
  style: string;
  complexity: number;
  width: number;
  height: number;
  category: PatternCategory;
  description?: string;
  includeColorwork: boolean;
  includeLace: boolean;
  includeTexture: boolean;
  yarnWeight?: YarnWeight;
  apiKey: string;
}
