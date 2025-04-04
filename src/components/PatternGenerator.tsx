
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PatternOptions from './PatternOptions';
import PatternPreview from './PatternPreview';
import { Pattern, PatternGenerationOptions } from '@/types/pattern';
import { generatePattern } from '@/services/patternService';

const PatternGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [options, setOptions] = useState<PatternGenerationOptions>({
    style: '',
    complexity: 5,
    width: 20,
    height: 20,
    category: 'Scarf',
    includeColorwork: false,
    includeLace: false,
    includeTexture: false,
    apiKey: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!options.style) {
      toast.error("Please enter a style name");
      return;
    }
    
    if (!options.apiKey) {
      toast.error("Please enter your API key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const generatedPattern = await generatePattern(options);
      
      if (generatedPattern) {
        setPattern(generatedPattern);
        toast.success("Pattern generated successfully!");
      }
    } catch (error) {
      console.error("Error generating pattern:", error);
      toast.error("Failed to generate pattern. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearPattern = () => {
    setPattern(null);
    toast.info("Pattern cleared");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-white/80 backdrop-blur-sm border-lavender/20 mb-8">
        <CardHeader>
          <CardTitle className="text-lavender-dark">Pattern Generator</CardTitle>
          <CardDescription>
            Create unique knitting patterns with our AI-powered generator. 
            Customize your options and see the pattern preview in real-time.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PatternOptions 
              options={options} 
              setOptions={setOptions} 
              isLoading={isLoading} 
            />
            
            <div className="flex space-x-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="flex-1 bg-lavender hover:bg-lavender-dark text-white"
              >
                {isLoading ? "Generating..." : "Generate Pattern"}
              </Button>
              
              {pattern && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={clearPattern}
                  disabled={isLoading}
                  className="border-lavender/30 hover:bg-lavender/10"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="h-full">
            <PatternPreview pattern={pattern} isLoading={isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatternGenerator;
