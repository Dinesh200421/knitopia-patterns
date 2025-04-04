
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pattern, Stitch } from '@/types/pattern';
import { exportPatternToPDF } from '@/services/patternService';

interface PatternPreviewProps {
  pattern: Pattern | null;
  isLoading: boolean;
}

const PatternPreview: React.FC<PatternPreviewProps> = ({ pattern, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-lavender/20 h-full flex items-center justify-center">
        <CardContent>
          <div className="w-16 h-16 relative mx-auto mb-4">
            <div className="absolute inset-0 bg-lavender rounded-full animate-knit"></div>
            <div className="absolute inset-2 bg-wool rounded-full"></div>
          </div>
          <p className="text-center text-muted-foreground">Generating your pattern...</p>
        </CardContent>
      </Card>
    );
  }

  if (!pattern) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-lavender/20 h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-16">
          <div className="text-center space-y-2 max-w-md">
            <h3 className="text-xl font-semibold text-lavender-dark">Preview Your Pattern</h3>
            <p className="text-muted-foreground">
              Configure your pattern options and click "Generate Pattern" to see a preview here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStitchColor = (stitch: Stitch) => {
    switch (stitch.type) {
      case 'knit': return 'bg-lavender';
      case 'purl': return 'bg-lavender-light';
      case 'yo': return 'bg-wool-light border border-lavender';
      case 'k2tog': return 'bg-lavender-dark';
      case 'ssk': return 'bg-lavender-dark';
      default: return 'bg-wool-light';
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-lavender/20 h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lavender-dark">{pattern.name}</CardTitle>
            <CardDescription>{pattern.description}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-lavender/10">
            {pattern.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium">Yarn Weight</p>
              <p className="text-sm text-muted-foreground">{pattern.yarnWeight}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Needle Size</p>
              <p className="text-sm text-muted-foreground">{pattern.needleSize}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Size</p>
              <p className="text-sm text-muted-foreground">{pattern.width}w × {pattern.height}h</p>
            </div>
            <div>
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm text-muted-foreground">{pattern.category}</p>
            </div>
          </div>
          
          <div className="border border-lavender/20 rounded-md p-3 bg-wool-light flex-grow overflow-auto">
            <h4 className="text-sm font-medium mb-2">Pattern Preview</h4>
            <div className="pattern-grid" style={{ 
              gridTemplateColumns: `repeat(${pattern.width}, minmax(16px, 1fr))` 
            }}>
              {pattern.stitches.map((stitch) => (
                <div 
                  key={stitch.id} 
                  className={`aspect-square rounded-sm ${getStitchColor(stitch)}`}
                  title={`Row ${stitch.y + 1}, Stitch ${stitch.x + 1}: ${stitch.type}`}
                />
              ))}
            </div>
          </div>
        
          {pattern.instructions && (
            <div className="mt-4 border border-lavender/20 rounded-md p-3 bg-wool-light max-h-36 overflow-y-auto">
              <h4 className="text-sm font-medium mb-1">Instructions</h4>
              <pre className="text-xs whitespace-pre-wrap">{pattern.instructions}</pre>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-lavender/10 pt-4">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={() => window.print()}
            className="border-lavender/30 hover:bg-lavender/10"
          >
            Print
          </Button>
          <Button 
            onClick={() => exportPatternToPDF(pattern)}
            className="bg-lavender hover:bg-lavender-dark text-white"
          >
            Download PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatternPreview;
