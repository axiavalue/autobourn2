'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  inventory: [
    { label: 'Browse Collection', href: '/inventory' },
    { label: 'Mercedes-Benz', href: '/inventory?brand=mercedes-benz' },
    { label: 'BMW', href: '/inventory?brand=bmw' },
    { label: 'Audi', href: '/inventory?brand=audi' },
    { label: 'Land Rover', href: '/inventory?brand=land-rover' },
    { label: 'Jaguar', href: '/inventory?brand=jaguar' },
  ],
  services: [
    { label: 'Finance', href: '/finance' },
    { label: 'Insurance', href: '/insurance' },
    { label: 'Sell Your Car', href: '/sell' },
    { label: 'Trade-In', href: '/sell' },
    { label: 'Warranty', href: '/about' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Testimonials', href: '/about#testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer
      id="site-footer"
      style={{
        background: '#FAFAFA',
        borderTop: '1px solid #ECECEC',
      }}
    >
      {/* Main Footer */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '320px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}>
                <Image
                  src="/logo.jpg"
                  alt="Auto Bourn Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="42px"
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#2A2A2A',
              }}>
                AUTO <span style={{ color: '#E10613' }}>BOURN</span>
              </span>
            </Link>
            <p style={{
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: '#8A8A8A',
              marginBottom: '1.5rem',
            }}>
              India&apos;s premier luxury pre-owned automotive platform. 
              Every vehicle curated, certified, and presented with museum-quality precision.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/autobourn/' },
                { label: 'YouTube',   href: 'https://www.youtube.com/@autobourn' },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/autobourn' },
                { label: 'WhatsApp',  href: 'https://wa.me/917677772222' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href} target="_blank" rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #DADADA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: '#8A8A8A',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 600,
                    fontFamily: 'var(--font-secondary)',
                  }}
                  className="social-icon"
                >
                  {social.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#2A2A2A',
              marginBottom: '1.25rem',
            }}>
              Inventory
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.inventory.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.625rem' }}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      textDecoration: 'none',
                      color: '#8A8A8A',
                      fontSize: '0.9375rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#2A2A2A',
              marginBottom: '1.25rem',
            }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.services.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.625rem' }}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      textDecoration: 'none',
                      color: '#8A8A8A',
                      fontSize: '0.9375rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#2A2A2A',
              marginBottom: '1.25rem',
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.label} style={{ marginBottom: '0.625rem' }}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      textDecoration: 'none',
                      color: '#8A8A8A',
                      fontSize: '0.9375rem',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid #ECECEC',
          padding: '1.5rem clamp(1.5rem, 4vw, 3rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{
          fontSize: '0.8125rem',
          color: '#B0B0B0',
        }}>
          © {new Date().getFullYear()} Auto Bourn. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy" className="footer-link" style={{
            textDecoration: 'none',
            color: '#B0B0B0',
            fontSize: '0.8125rem',
            transition: 'color 0.3s ease',
          }}>
            Privacy Policy
          </Link>
          <Link href="/terms" className="footer-link" style={{
            textDecoration: 'none',
            color: '#B0B0B0',
            fontSize: '0.8125rem',
            transition: 'color 0.3s ease',
          }}>
            Terms & Conditions
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .footer-link:hover {
          color: #E10613 !important;
        }
        .social-icon:hover {
          border-color: #E10613 !important;
          color: #E10613 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
