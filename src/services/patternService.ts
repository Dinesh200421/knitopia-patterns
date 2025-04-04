
import { toast } from "sonner";
import { Pattern, PatternGenerationOptions, Stitch, StitchType } from "@/types/pattern";

// This would be replaced with real API calls in a production environment
export const generatePattern = async (options: PatternGenerationOptions): Promise<Pattern | null> => {
  try {
    // Here we would make an API call with the API key and options
    // For now, we'll simulate this with a mock implementation
    
    // Validate the API key
    if (!options.apiKey || options.apiKey.trim().length < 5) {
      toast.error("Please provide a valid API key");
      return null;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random pattern based on the options
    return createMockPattern(options);
  } catch (error) {
    console.error("Error generating pattern:", error);
    toast.error("Failed to generate pattern. Please try again.");
    return null;
  }
};

// Mock function to create a pattern without an actual API
const createMockPattern = (options: PatternGenerationOptions): Pattern => {
  const id = `pattern-${Math.random().toString(36).substring(2, 9)}`;
  const stitches: Stitch[] = [];
  
  // Generate an array of stitches based on the options
  const stitchTypes: StitchType[] = ['knit', 'purl'];
  
  if (options.includeLace) {
    stitchTypes.push('yo');
  }
  
  if (options.includeTexture) {
    stitchTypes.push('k2tog', 'ssk');
  }
  
  // Create a pattern based on the width and height
  for (let y = 0; y < options.height; y++) {
    for (let x = 0; x < options.width; x++) {
      // Simple logic to create a mock pattern
      let type: StitchType = 'knit';
      
      // Create a checkerboard pattern for textured patterns
      if (options.includeTexture && (x + y) % 2 === 0) {
        type = 'purl';
      }
      
      // Add some yarn overs for lace patterns
      if (options.includeLace && (x % 5 === 2 && y % 4 === 1)) {
        type = 'yo';
      }
      
      // Add some decreases for textured patterns
      if (options.includeTexture && x % 7 === 3 && y % 5 === 2) {
        type = 'k2tog';
      }
      
      stitches.push({
        id: `stitch-${x}-${y}`,
        type,
        x,
        y
      });
    }
  }
  
  const patternTypes = [
    "Celtic Cable", "Nordic Star", "Fisherman's Rib", 
    "Basketweave", "Feather and Fan", "Moss Stitch",
    "Honeycomb", "Diamond Lace", "Broken Rib"
  ];
  
  const randomPatternType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
  
  return {
    id,
    name: `${options.style} ${randomPatternType} Pattern`,
    description: options.description || `A beautiful ${options.style.toLowerCase()} pattern featuring ${randomPatternType.toLowerCase()} stitches.`,
    width: options.width,
    height: options.height,
    stitches,
    yarnWeight: options.yarnWeight || 'Medium (4)',
    needleSize: getNeedleSizeForYarnWeight(options.yarnWeight || 'Medium (4)'),
    difficulty: getPatternDifficulty(options),
    category: options.category,
    instructions: generateInstructions(options),
    createdAt: new Date(),
  };
};

// Helper function to determine needle size based on yarn weight
const getNeedleSizeForYarnWeight = (yarnWeight: string): string => {
  switch(yarnWeight) {
    case 'Lace (0)': return 'US 0-3 (2.0-3.25mm)';
    case 'Super Fine (1)': return 'US 1-3 (2.25-3.25mm)';
    case 'Fine (2)': return 'US 3-5 (3.25-3.75mm)';
    case 'Light (3)': return 'US 5-7 (3.75-4.5mm)';
    case 'Medium (4)': return 'US 7-9 (4.5-5.5mm)';
    case 'Bulky (5)': return 'US 9-11 (5.5-8mm)';
    case 'Super Bulky (6)': return 'US 11-13 (8-9mm)';
    case 'Jumbo (7)': return 'US 13-17 (9-12.75mm)';
    default: return 'US 7-9 (4.5-5.5mm)';
  }
};

// Helper function to determine pattern difficulty
const getPatternDifficulty = (options: PatternGenerationOptions): 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' => {
  let difficultyScore = options.complexity;
  
  if (options.includeLace) difficultyScore += 2;
  if (options.includeColorwork) difficultyScore += 2;
  if (options.includeTexture) difficultyScore += 1;
  
  if (difficultyScore <= 3) return 'Beginner';
  if (difficultyScore <= 5) return 'Easy';
  if (difficultyScore <= 8) return 'Intermediate';
  return 'Advanced';
};

// Generate basic knitting instructions
const generateInstructions = (options: PatternGenerationOptions): string => {
  let instructions = `Cast on ${options.width} stitches.\n\n`;
  
  if (options.includeTexture && options.includeLace) {
    instructions += `Row 1 (RS): *K2, p2, yo, k2tog; repeat from * to end.\n`;
    instructions += `Row 2 (WS): *P3, k1; repeat from * to end.\n`;
    instructions += `Row 3: *K1, p1, k2, yo, ssk; repeat from * to end.\n`;
    instructions += `Row 4: *P2, k2; repeat from * to end.\n`;
    instructions += `Repeat these 4 rows for pattern.\n`;
  } else if (options.includeTexture) {
    instructions += `Row 1 (RS): *K2, p2; repeat from * to end.\n`;
    instructions += `Row 2 (WS): *P2, k2; repeat from * to end.\n`;
    instructions += `Repeat these 2 rows for pattern.\n`;
  } else if (options.includeLace) {
    instructions += `Row 1 (RS): *K3, yo, k2tog; repeat from * to end.\n`;
    instructions += `Row 2 (WS): Purl all stitches.\n`;
    instructions += `Row 3: *K2, k2tog, yo, k1; repeat from * to end.\n`;
    instructions += `Row 4: Purl all stitches.\n`;
    instructions += `Repeat these 4 rows for pattern.\n`;
  } else {
    instructions += `Row 1: Knit all stitches.\n`;
    instructions += `Row 2: Purl all stitches.\n`;
    instructions += `Repeat these 2 rows for stockinette stitch pattern.\n`;
  }
  
  instructions += `\nContinue until piece measures ${options.height} inches, then bind off all stitches.`;
  
  return instructions;
};

export const exportPatternToPDF = (pattern: Pattern): void => {
  // In a real application, this would generate a PDF file with the pattern
  // For now, we'll just show a toast notification
  toast.success("Pattern downloaded successfully!");
  console.log("Pattern to export:", pattern);
};
