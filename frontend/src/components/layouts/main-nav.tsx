import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Link } from "@/lib/router-events";
import ChangeThemeButton from "./change-theme-button";
import { TypographyH4, TypographyMedium, TypographySmall } from "../ui/typography";
import React from "react";
import { cn } from "@/lib/utils";
import { ConnectKitButton } from "connectkit";

const mainNavItems = [
  {
    title: "Features",
    href: "/#features",
    desc: "Learn more about letsgho.xyz features."
  }
];

export default function MainNav() {
  return (
    <div className="flex w-full fixed top-4 left-0 items-center justify-center">
      <NavigationMenu className="py-2 px-6 border-2 border-gray-100 rounded-full bg-white dark:bg-black dark:border-gray-600">
        <NavigationMenuList className="items-center gap-2">
          <NavigationMenuItem className="items-center border-gray-100 h-full base:hidden md:flex">
            <Link href="/">
              <TypographyH4 className="cursor-pointer">letsgho.xyz</TypographyH4>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="base: block md:hidden">
            <NavigationMenuTrigger>letsgho.xyz</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">letsgho.xyz</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        VISA of web3 - The future of crpyto payment
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {mainNavItems.map((item) => (
                  <ListItem key={item.href} href={item.href} title={item.title} className="col-span-2 md:col-span-1">
                    {item.desc}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <div className="items-center justify-center gap-2 base:hidden md:flex">
            <TypographySmall>|</TypographySmall>
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.href} className="flex items-center">
                <Link href={item.href} className="flex items-center transition-colors hover:text-foreground/80">
                  <TypographyMedium className="cursor-pointer">{item.title}</TypographyMedium>
                </Link>
              </NavigationMenuItem>
            ))}
            <TypographySmall>|</TypographySmall>
          </div>
          <NavigationMenuItem className="flex items-center">
            <ChangeThemeButton />
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center">
            <ConnectKitButton />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
