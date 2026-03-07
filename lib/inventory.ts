/**
 * Hardcoded asset inventory (replace with CMS / DB query later).
 *
 * Each asset maps to:
 *   - A Lemon Squeezy variant ID (for a-la-carte ownership checks)
 *   - An R2 object key prefix (used by assetIdToR2Key)
 *   - Metadata for the dashboard and product pages
 */

export type AssetType = "video" | "audio" | "bundle";

export interface Asset {
  id: string; // stable slug used as R2 key base and LS variant lookup
  name: string;
  description: string;
  type: AssetType;
  /** File size string shown in UI */
  fileSize: string;
  /** Duration in seconds */
  durationSeconds: number;
  /** Resolution label */
  resolution: string;
  /** Loop type descriptor */
  loopType: string;
  /** Restoration technique */
  technique: string;
  /** Lemon Squeezy variant ID for a-la-carte purchase */
  lsVariantId: string;
  /** Price in USD cents */
  priceCents: number;
  /** 480p watermarked preview path (served from /public/previews/) */
  previewPath: string;
  /** Thumbnail image path */
  thumbnailPath: string;
  /** Whether this asset is included in the season pass */
  inSeasonPass: boolean;
  /** Tags for search */
  tags: string[];
}

export const ASSETS: Asset[] = [
  {
    id: "haunted-hallway",
    name: "Haunted Hallway",
    description:
      "Victorian corridor with flickering candelabras and ghostly apparitions drifting through fog.",
    type: "video",
    fileSize: "1.8 GB",
    durationSeconds: 180,
    resolution: "1920×1080",
    loopType: "Seamless loop",
    technique: "Real-ESRGAN 4× upscale, black crush correction, hue normalization",
    lsVariantId: "ls_var_haunted_hallway",
    priceCents: 1499,
    previewPath: "/previews/haunted-hallway-480p.mp4",
    thumbnailPath: "/previews/haunted-hallway-thumb.jpg",
    inSeasonPass: true,
    tags: ["hallway", "ghost", "Victorian", "fog", "candle"],
  },
  {
    id: "graveyard-mist",
    name: "Graveyard Mist",
    description:
      "Moonlit cemetery with rolling ground fog and gnarled silhouetted trees. Seamless 3-minute loop.",
    type: "video",
    fileSize: "2.1 GB",
    durationSeconds: 180,
    resolution: "1920×1080",
    loopType: "Seamless loop",
    technique: "Real-ESRGAN 4×, temporal noise reduction, mist color grading",
    lsVariantId: "ls_var_graveyard_mist",
    priceCents: 1499,
    previewPath: "/previews/graveyard-mist-480p.mp4",
    thumbnailPath: "/previews/graveyard-mist-thumb.jpg",
    inSeasonPass: true,
    tags: ["graveyard", "cemetery", "mist", "fog", "moon", "tree"],
  },
  {
    id: "zombie-horde",
    name: "Zombie Horde",
    description:
      "Shambling undead crowd slowly filling the frame from all sides. Perfect for projection-mapped windows.",
    type: "video",
    fileSize: "1.6 GB",
    durationSeconds: 120,
    resolution: "1920×1080",
    loopType: "Ping-pong loop",
    technique: "Real-ESRGAN 4×, motion deblur, skin-tone correction",
    lsVariantId: "ls_var_zombie_horde",
    priceCents: 1499,
    previewPath: "/previews/zombie-horde-480p.mp4",
    thumbnailPath: "/previews/zombie-horde-thumb.jpg",
    inSeasonPass: true,
    tags: ["zombie", "undead", "window", "crowd"],
  },
  {
    id: "spider-descent",
    name: "Spider Descent",
    description:
      "Giant arachnid lowering from above on a silk strand. Alpha-channel ready for overlay compositing.",
    type: "video",
    fileSize: "980 MB",
    durationSeconds: 90,
    resolution: "1920×1080",
    loopType: "One-shot + idle loop",
    technique: "Real-ESRGAN 4×, green-screen key, edge refinement",
    lsVariantId: "ls_var_spider_descent",
    priceCents: 1499,
    previewPath: "/previews/spider-descent-480p.mp4",
    thumbnailPath: "/previews/spider-descent-thumb.jpg",
    inSeasonPass: true,
    tags: ["spider", "arachnid", "descent", "overlay"],
  },
  {
    id: "lightning-storm",
    name: "Lightning Storm",
    description:
      "Relentless lightning strikes over a gothic castle silhouette. High-contrast for maximum impact.",
    type: "video",
    fileSize: "1.4 GB",
    durationSeconds: 150,
    resolution: "1920×1080",
    loopType: "Seamless loop",
    technique: "Real-ESRGAN 4×, exposure correction, lightning bloom enhancement",
    lsVariantId: "ls_var_lightning_storm",
    priceCents: 1499,
    previewPath: "/previews/lightning-storm-480p.mp4",
    thumbnailPath: "/previews/lightning-storm-thumb.jpg",
    inSeasonPass: true,
    tags: ["lightning", "storm", "castle", "gothic", "rain"],
  },
  {
    id: "floating-ghosts",
    name: "Floating Ghosts",
    description:
      "Translucent spirits drifting through darkness, fading in and out of visibility.",
    type: "video",
    fileSize: "1.2 GB",
    durationSeconds: 210,
    resolution: "1920×1080",
    loopType: "Seamless loop",
    technique: "Real-ESRGAN 4×, transparency mask correction, luminance boost",
    lsVariantId: "ls_var_floating_ghosts",
    priceCents: 1499,
    previewPath: "/previews/floating-ghosts-480p.mp4",
    thumbnailPath: "/previews/floating-ghosts-thumb.jpg",
    inSeasonPass: true,
    tags: ["ghost", "spirit", "translucent", "dark"],
  },
  {
    id: "cauldron-bubbling",
    name: "Cauldron Bubbling",
    description:
      "Witch's cauldron with swirling green smoke and mystical bubbling brew. Loop-perfect for prop projection.",
    type: "video",
    fileSize: "760 MB",
    durationSeconds: 60,
    resolution: "1920×1080",
    loopType: "Seamless loop",
    technique: "Real-ESRGAN 4×, green-channel boost, smoke simulation sharpening",
    lsVariantId: "ls_var_cauldron_bubbling",
    priceCents: 1499,
    previewPath: "/previews/cauldron-bubbling-480p.mp4",
    thumbnailPath: "/previews/cauldron-bubbling-thumb.jpg",
    inSeasonPass: true,
    tags: ["cauldron", "witch", "potion", "smoke", "green"],
  },
  {
    id: "clown-popup",
    name: "Clown Pop-Up",
    description:
      "Deranged clown bursting from a jack-in-the-box. Triggered scare effect with ambient idle loop.",
    type: "video",
    fileSize: "1.1 GB",
    durationSeconds: 120,
    resolution: "1920×1080",
    loopType: "Triggered scare + idle",
    technique: "Real-ESRGAN 4×, saturation correction, motion sharpening",
    lsVariantId: "ls_var_clown_popup",
    priceCents: 1499,
    previewPath: "/previews/clown-popup-480p.mp4",
    thumbnailPath: "/previews/clown-popup-thumb.jpg",
    inSeasonPass: true,
    tags: ["clown", "scare", "jack-in-the-box", "triggered"],
  },
  {
    id: "ambient-horror-score",
    name: "Ambient Horror Score",
    description:
      "90-minute seamless horror ambient track — low drones, distant screams, unsettling textures.",
    type: "audio",
    fileSize: "1.6 GB",
    durationSeconds: 5400,
    resolution: "WAV 24-bit / 48 kHz",
    loopType: "Seamless loop",
    technique: "AI noise reduction, spatial widening, dynamic range expansion",
    lsVariantId: "ls_var_ambient_horror_score",
    priceCents: 1499,
    previewPath: "/previews/ambient-horror-score-preview.mp3",
    thumbnailPath: "/previews/ambient-horror-score-thumb.jpg",
    inSeasonPass: true,
    tags: ["audio", "ambient", "drone", "score", "music"],
  },
  {
    id: "scream-sfx-pack",
    name: "Scream SFX Pack",
    description:
      "50 individually-triggered scream and jump-scare stingers. WAV stems for easy board integration.",
    type: "audio",
    fileSize: "340 MB",
    durationSeconds: 600,
    resolution: "WAV 24-bit / 48 kHz",
    loopType: "One-shots",
    technique: "AI noise reduction, transient sharpening, loudness normalization",
    lsVariantId: "ls_var_scream_sfx_pack",
    priceCents: 1499,
    previewPath: "/previews/scream-sfx-pack-preview.mp3",
    thumbnailPath: "/previews/scream-sfx-pack-thumb.jpg",
    inSeasonPass: true,
    tags: ["audio", "sfx", "scream", "stinger", "one-shot"],
  },
];

/** Lemon Squeezy product ID for the season pass */
export const SEASON_PASS_LS_PRODUCT_ID = "ls_prod_season_pass_2024";

/** Season pass price */
export const SEASON_PASS_PRICE_CENTS = 19999;

/** All assets included in the season pass */
export const SEASON_PASS_ASSETS = ASSETS.filter((a) => a.inSeasonPass);

export function getAssetById(id: string): Asset | undefined {
  return ASSETS.find((a) => a.id === id);
}
