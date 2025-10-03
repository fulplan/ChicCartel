import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navLinks = [
    { label: 'New Arrivals', href: '#new' },
    { label: 'Women', href: '#women' },
    { label: 'Men', href: '#men' },
    { label: 'Accessories', href: '#accessories' },
    { label: 'Sale', href: '#sale' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-md" data-testid="nav-mobile">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif font-light">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-8">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-lg hover-elevate rounded-md transition-colors"
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              © 2024 LUXE
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
