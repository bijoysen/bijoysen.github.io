import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | ${profile.role}`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F3ED",
    theme_color: "#1F5C56",
    icons: [
      {
        src: "/portrait.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
