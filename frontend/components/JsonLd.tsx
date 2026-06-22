/**
 * JsonLd – renders a JSON-LD <script> tag for structured data.
 * Use this in any Server Component (layout or page).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
