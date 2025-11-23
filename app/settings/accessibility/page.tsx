
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Palette, ArrowLeft, Text, ZapOff } from 'lucide-react';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { useTheme } from 'next-themes';

export default function AccessibilitySettingsPage() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);
  
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
       <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/settings">
            <ArrowLeft className="mr-2" />
            Back to Settings
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-6 h-6" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enjoy a darker color scheme.
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Toggle dark mode"
              />
            </div>
             <div className="space-y-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="font-size" className="text-base flex items-center gap-2">
                        <Text className="w-4 h-4" />
                        Font Size
                    </Label>
                    <p className="text-sm text-muted-foreground">
                    Adjust the font size for better readability.
                    </p>
                </div>
                <Slider
                    id="font-size"
                    defaultValue={[fontSize]}
                    min={80}
                    max={120}
                    step={10}
                    onValueChange={handleFontSizeChange}
                    aria-label="Adjust font size"
                />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="reduce-motion" className="text-base flex items-center gap-2">
                    <ZapOff className="w-4 h-4" />
                    Reduce Motion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Disable animations and complex transitions.
                </p>
              </div>
              <Switch
                id="reduce-motion"
                aria-label="Toggle reduce motion"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
