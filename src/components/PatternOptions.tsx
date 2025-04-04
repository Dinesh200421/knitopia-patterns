
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PatternCategory, PatternGenerationOptions, YarnWeight } from '@/types/pattern';

interface PatternOptionsProps {
  options: PatternGenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<PatternGenerationOptions>>;
  isLoading: boolean;
}

const PatternOptions: React.FC<PatternOptionsProps> = ({ options, setOptions, isLoading }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleBooleanChange = (
    name: string,
    checked: boolean
  ) => {
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSliderChange = (
    name: string,
    value: number[]
  ) => {
    setOptions((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleSelectChange = (
    name: string,
    value: string
  ) => {
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-lavender/20">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="style">Style Name</Label>
              <Input
                id="style"
                name="style"
                placeholder="e.g., Rustic, Modern, Elegant"
                value={options.style}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Pattern Category</Label>
              <Select
                value={options.category}
                onValueChange={(value) => handleSelectChange("category", value as PatternCategory)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sweater">Sweater</SelectItem>
                  <SelectItem value="Scarf">Scarf</SelectItem>
                  <SelectItem value="Hat">Hat</SelectItem>
                  <SelectItem value="Socks">Socks</SelectItem>
                  <SelectItem value="Blanket">Blanket</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Home Decor">Home Decor</SelectItem>
                  <SelectItem value="Toy">Toy</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Brief description of the pattern you want"
              value={options.description || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Pattern Complexity ({options.complexity})</Label>
            <Slider
              value={[options.complexity]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => handleSliderChange("complexity", value)}
              disabled={isLoading}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (stitches)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                min={10}
                max={50}
                value={options.width}
                onChange={handleNumberChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (rows)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                min={10}
                max={50}
                value={options.height}
                onChange={handleNumberChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yarnWeight">Yarn Weight</Label>
            <Select
              value={options.yarnWeight || "Medium (4)"}
              onValueChange={(value) => handleSelectChange("yarnWeight", value as YarnWeight)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select yarn weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lace (0)">Lace (0)</SelectItem>
                <SelectItem value="Super Fine (1)">Super Fine (1)</SelectItem>
                <SelectItem value="Fine (2)">Fine (2)</SelectItem>
                <SelectItem value="Light (3)">Light (3)</SelectItem>
                <SelectItem value="Medium (4)">Medium (4)</SelectItem>
                <SelectItem value="Bulky (5)">Bulky (5)</SelectItem>
                <SelectItem value="Super Bulky (6)">Super Bulky (6)</SelectItem>
                <SelectItem value="Jumbo (7)">Jumbo (7)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="includeLace" className="cursor-pointer">Include Lace Stitches</Label>
              <Switch
                id="includeLace"
                checked={options.includeLace}
                onCheckedChange={(checked) => handleBooleanChange("includeLace", checked)}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="includeTexture" className="cursor-pointer">Include Texture Stitches</Label>
              <Switch
                id="includeTexture"
                checked={options.includeTexture}
                onCheckedChange={(checked) => handleBooleanChange("includeTexture", checked)}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="includeColorwork" className="cursor-pointer">Include Colorwork</Label>
              <Switch
                id="includeColorwork"
                checked={options.includeColorwork}
                onCheckedChange={(checked) => handleBooleanChange("includeColorwork", checked)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2 border-t border-lavender/10 pt-4 mt-4">
            <Label htmlFor="apiKey" className="text-lavender-dark">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={options.apiKey}
              onChange={handleChange}
              disabled={isLoading}
              className="border-lavender/30 focus:border-lavender"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your API key is required to generate patterns. It is never stored on our servers.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatternOptions;
