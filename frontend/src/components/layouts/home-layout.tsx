"use client";
import { SiteFooter } from "./site-footer";
import MainNav from "./main-nav";

export const mainNavItems = [
  {
    title: "Explore",
    href: "/explore"
  },
  {
    title: "Features",
    href: "/#features"
  }
];

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function HomeLayout({ hideNav, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideNav && (
        <header className="container z-40 bg-background">
          <MainNav />
        </header>
      )}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
