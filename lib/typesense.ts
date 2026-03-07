/**
 * Typesense search configuration
 *
 * Environment variables:
 *   TYPESENSE_HOST        – cluster host (e.g. xyz.a1.typesense.net)
 *   TYPESENSE_API_KEY     – admin or search-only key
 *   TYPESENSE_SEARCH_KEY  – read-only key safe to expose to the browser
 *   NEXT_PUBLIC_TYPESENSE_SEARCH_KEY – same as above, auto-exposed by Next.js
 *   NEXT_PUBLIC_TYPESENSE_HOST
 */

export const COLLECTION_NAME = "hauntsync_assets";

/** Schema used when seeding / re-indexing the collection */
export const assetSchema = {
  name: COLLECTION_NAME,
  fields: [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "description", type: "string" },
    { name: "type", type: "string", facet: true },
    { name: "tags", type: "string[]", facet: true },
    { name: "priceCents", type: "int32" },
    { name: "inSeasonPass", type: "bool", facet: true },
    { name: "thumbnailPath", type: "string", index: false },
    { name: "previewPath", type: "string", index: false },
    { name: "loopType", type: "string", facet: true },
  ],
  default_sorting_field: "priceCents",
} as const;

/** Typesense instant-search adapter config (for use with react-instantsearch) */
export function getTypesenseAdapterConfig() {
  return {
    server: {
      apiKey: process.env.TYPESENSE_SEARCH_KEY ?? "",
      nodes: [
        {
          host: process.env.TYPESENSE_HOST ?? "localhost",
          port: 443,
          protocol: "https",
        },
      ],
    },
    additionalSearchParameters: {
      query_by: "name,description,tags",
      highlight_full_fields: "name,description",
      num_typos: 1,
    },
  };
}

/** Client-side safe config (uses NEXT_PUBLIC_ vars) */
export function getPublicTypesenseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY ?? "",
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST ?? "localhost",
        port: 443,
        protocol: "https" as const,
      },
    ],
    connectionTimeoutSeconds: 2,
  };
}
