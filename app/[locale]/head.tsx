
export default function Head() {
  return (
    <>
      {/* Performance hints */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* LCP image */}
      <link rel="preload" as="image" href="/og-hero.png" />
    </>
  )
}
