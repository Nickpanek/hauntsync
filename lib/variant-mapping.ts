/**
 * Lemon Squeezy variant ID → asset slug mapping.
 *
 * Sync this file whenever you create or modify variants in LS Dashboard.
 * To find variant IDs: Products → [Product] → Variants → copy the numeric ID.
 *
 * Keeping these IDs separate from inventory.ts means you can update LS
 * variant IDs without touching asset metadata (descriptions, specs, etc.).
 */

/** Maps LS variant ID (string) → asset slug (matches Asset.id in inventory.ts) */
export const VARIANT_TO_ASSET_MAP: Record<string, string> = {
  // A-la-carte variants — replace with real IDs from LS Dashboard
  "111001": "haunted-hallway",
  "111002": "graveyard-mist",
  "111003": "zombie-horde",
  "111004": "spider-descent",
  "111005": "lightning-storm",
  "111006": "floating-ghosts",
  "111007": "cauldron-bubbling",
  "111008": "clown-popup",
  "111009": "ambient-horror-score",
  "111010": "scream-sfx-pack",
};

/**
 * Variant ID for the 2024 Season Pass.
 * Replace with the real ID from: LS Dashboard → Products → Season Pass → Variants
 */
export const SEASON_PASS_VARIANT_ID = "999999";

/** Look up asset slug by LS variant ID (accepts number or string) */
export function getAssetIdForVariant(variantId: number | string): string | undefined {
  return VARIANT_TO_ASSET_MAP[String(variantId)];
}

/** Look up LS variant ID string by asset slug */
export function getVariantIdForAsset(assetId: string): string | undefined {
  const entry = Object.entries(VARIANT_TO_ASSET_MAP).find(
    ([, slug]) => slug === assetId
  );
  return entry?.[0];
}
