#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$ROOT/public/photos/places" "$ROOT/public/photos/news"

echo "Downloading Wikimedia images…"
curl -fL "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ukr_Kharkobl_Zmiivrayon_Mokhnach_River_Siverskyi_Donets_1_2021_%28SU-HS%29.jpg" -o "$ROOT/public/photos/places/donets.jpg"
curl -fL "https://upload.wikimedia.org/wikipedia/commons/4/45/Ukr_Kharkobl_Zmiivrayon_Mokhnach_Ruda_krynyca_1_2021_%28SU-HS%29.jpg" -o "$ROOT/public/photos/places/blue-well.jpg"
curl -fL "https://upload.wikimedia.org/wikipedia/commons/0/04/Ukr_Kharkobl_Zmiivrayon_Mokhnach_Forest_2_2021_%28SU-HS%29.jpg" -o "$ROOT/public/photos/places/oak.jpg"

# Optional: fair/cleanup from Wikimedia (public domain / CC)
curl -fL "https://upload.wikimedia.org/wikipedia/commons/6/6a/%D0%A1%D0%BE%D1%80%D0%BE%D1%87%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D1%8F%D1%80%D0%BC%D0%B0%D1%80%D0%BE%D0%BA.jpg" -o "$ROOT/public/photos/news/fair.jpg"
curl -fL "https://upload.wikimedia.org/wikipedia/commons/a/ad/Volunteers_cleaning_up_the_grounds_of_the_park._%289878f75d-1dd8-b71b-0b02-711f0d856e60%29.JPG" -o "$ROOT/public/photos/news/cleanup.jpg"

echo "Done. You can now run: npm run dev"
