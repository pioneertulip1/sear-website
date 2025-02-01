import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, MessageSquareMore } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/plans', label: 'Plans' },
    { href: '/bespoke', label: 'Bespoke Hosting' },
    { href: '/support', label: 'Support' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="/searlogo-nobg.svg"
                  alt="S"
                  width={40}
                  height={40}
                  className="h-9 w-auto"
                />
                <span className="text-xl font-medium">
                  <span className="text-[#5e008d]">ear</span>{" "}
                  <span className="text-foreground">Hosting</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Next-generation Minecraft hosting with undeniable savings and reliability.
            </p>
            <div className="flex space-x-4">
              <Link href="https://discord.gg/sear" className="text-foreground/60 hover:text-primary transition-colors">
                <MessageSquareMore className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="https://twitter.com/searhosting" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com/searhosting" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sear Hosting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}