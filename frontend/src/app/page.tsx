"use client";

import ChangeThemeButton from "@/components/layouts/change-theme-button";
import { TypographySmall } from "@/components/ui/typography";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <div>
      <TypographySmall>Home</TypographySmall>
      <ChangeThemeButton />
      <TypographySmall>Home</TypographySmall>
      <ConnectKitButton />
    </div>
  );
}
