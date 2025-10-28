"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCart from "@/components/hooks/useCart";
import useAuth from "@/components/hooks/useAuth";
import { ShoppingCart } from "lucide-react";

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  onSignInClick?: () => void;
  cartHref?: string;
  onCartClick?: () => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Product" },
  { href: "/about", label: "About" },
];

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "/login",
      cartHref = "/checkout",
      onSignInClick,
      onCartClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileTriggerRef = useRef<HTMLButtonElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { totalItems } = useCart();
    const { isAuthenticated, user, logout } = useAuth();

    const navigateToHref = React.useCallback(
      (href?: string) => {
        if (!href) {
          return;
        }

        if (href.startsWith("#")) {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: "smooth" });
          return;
        }

        navigate(href);
      },
      [navigate]
    );

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
      if (!isMobile) {
        setIsMobileMenuOpen(false);
      }
    }, [isMobile]);

    useEffect(() => {
      if (!isMobileMenuOpen) {
        return;
      }

      const handlePointerDown = (event: MouseEvent) => {
        const target = event.target as Node;

        if (
          mobileMenuRef.current?.contains(target) ||
          mobileTriggerRef.current?.contains(target)
        ) {
          return;
        }

        setIsMobileMenuOpen(false);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isMobileMenuOpen]);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="relative flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <>
                <Button
                  ref={mobileTriggerRef}
                  aria-controls="navbar01-mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-haspopup="true"
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    setIsMobileMenuOpen((prev) => !prev);
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <HamburgerIcon />
                </Button>
                {isMobileMenuOpen ? (
                  <div
                    ref={mobileMenuRef}
                    id="navbar01-mobile-menu"
                    className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border bg-popover p-2 text-popover-foreground shadow-md"
                  >
                    <ul className="flex flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <li key={index} className="w-full">
                          <NavLink
                            to={link.href}
                            end={link.href === "/"}
                            className={({ isActive }) =>
                              cn(
                                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground no-underline",
                                isActive || link.active
                                  ? "bg-accent text-accent-foreground"
                                  : "text-foreground/80"
                              )
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link
                to={logoHref}
                className="flex items-center space-x-2 text-primary transition-colors hover:text-primary/90"
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden text-xl font-bold sm:inline-block">
                  LexxStore{" "}
                </span>
              </Link>
              {/* Navigation menu */}
              {!isMobile && (
                <nav className="flex">
                  <ul className="flex items-center gap-1">
                    {navigationLinks.map((link, index) => (
                      <li key={index}>
                        <NavLink
                          to={link.href}
                          end={link.href === "/"}
                          className={({ isActive }) =>
                            cn(
                              "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 no-underline",
                              isActive || link.active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80 hover:text-foreground"
                            )
                          }
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <span className="hidden text-sm text-muted-foreground sm:inline-block">
                  Halo,{" "}
                  <span className="font-semibold text-foreground">
                    {user.username}
                  </span>
                </span>
                {user.role === "admin" ? (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : null}
              </>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();

                if (isAuthenticated) {
                  logout();
                  navigateToHref("/");
                  return;
                }

                if (onSignInClick) {
                  onSignInClick();
                  return;
                }

                navigateToHref(signInHref);
              }}
            >
              {isAuthenticated ? "Logout" : signInText}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Keranjang belanja${totalItems ? `, ${totalItems} item` : ""}`}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                if (onCartClick) {
                  onCartClick();
                  return;
                }

                navigateToHref(cartHref);
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                  {totalItems}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Navbar01.displayName = "Navbar01";

export { Logo, HamburgerIcon };
