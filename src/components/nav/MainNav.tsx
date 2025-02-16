import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Plans' },
  { href: '/under-construction', label: 'Bespoke Hosting' },
  { href: '/under-construction', label: 'Support' },
];

export function MainNav() {
  return (
    <nav className="nav-blur border-b border-border sticky top-0 z-50 w-full">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <Image
              src="/searlogo-nobg.svg"
              alt="S"
              width={35}
              height={35}
              className="h-8 w-auto"
              priority
            />
            <span className="text-xl font-medium">
              <span className="text-[#5e008d]">ear</span>{" "}
              <span className="text-foreground">Hosting</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground-secondary hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/plans">
            <Button className="bg-primary hover:bg-primary-hover text-foreground">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-surface/20">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] glass-effect border-l border-border-strong">
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground-secondary hover:text-foreground transition-colors font-medium text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/under-construction">
                <Button className="bg-primary hover:bg-primary-hover text-foreground w-full">Get Started</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}