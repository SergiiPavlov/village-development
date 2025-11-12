// rebuilt to ensure a single parent element and correct preconnect order
export default function Head() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  )
}