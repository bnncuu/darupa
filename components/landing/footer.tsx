// footer.tsx
'use client';

import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 text-sm">
        {/* Layer 1 – Copyright */}
        <span className="text-muted-foreground">
          © {new Date().getFullYear()} YourBrand
        </span>

        {/* Layer 2 – Social icons */}
        <div className="flex items-center gap-2">
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Linkedin, label: 'LinkedIn' },
            { icon: Mail, label: 'Email' },
          ].map(({ icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}