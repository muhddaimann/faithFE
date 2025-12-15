# 🗺️ TravelTune  
Music-powered travel companion built with **Expo**, **React Native**, and **expo-router**.

---

## Tech

- Expo React Native (TypeScript)
- React Navigation / Expo Router
- React Native Paper (MD3)

```bash

├─ About
│  ├─ Mission — Enrich every trip with culture, emotion, and music.
│  ├─ Problem — Travellers struggle to feel connected, entertained, and emotionally grounded during and after trips.
│  ├─ Outcome — More meaningful travel, deeper cultural appreciation, and lasting emotional memories.
│  ├─ Positioning — A tourism-first music and memory app (not another generic music player).
│
├─ User Persona
│  ├─ Primary — Young travellers seeking cultural immersion & emotional experiences.
│  ├─ Secondary — Solo travellers, backpackers, students on budget trips.
│  ├─ Tertiary — Families & friend groups who want shared music memories.
│
│  ├─ Pain
│  │  ├─ “Travel feels empty during long flights, buses, and waiting time.”
│  │  ├─ Hard to discover music that represents the destination’s culture.
│  │  ├─ Post-vacation sadness; memories fade too quickly.
│  │  ├─ Existing music apps aren’t made for travel or cultural immersion.
│
│  ├─ Goal
│  │  ├─ Enjoy culturally relevant music before, during, and after a trip.
│  │  ├─ Use music to enhance emotional connection to places.
│  │  ├─ Preserve travel memories through songs, photos, notes.
│  │  ├─ Relive trips anytime with a personalized “memory soundtrack.”
│
├─ Core Jobs-to-be-Done
│  ├─ Discover — Find music related to a destination (culture, language, vibe).
│  ├─ Experience — Listen to mood/activity playlists during travel moments.
│  ├─ Capture — Attach songs to photos and notes throughout the trip.
│  ├─ Reflect — Enter Memory Lane: auto-generated recap of the trip with music.
│
├─ Core Features
│  ├─ Destination Playlists
│  │  ├─ Curated music by country/city.
│  │  ├─ Cultural tags (genre, instruments, language).
│  │  ├─ Local-recommended songs (community-curated).
│
│  ├─ Mood & Activity Playlists
│  │  ├─ Airport chill / Road trip / Exploring city / Sunset / Café vibes.
│  │  ├─ Auto-suggestions based on boarding pass dates or location.
│
│  ├─ Memory Capture
│  │  ├─ Attach photos and notes to specific songs.
│  │  ├─ Timeline of places visited + songs listened.
│  │  ├─ Offline mode for flights and remote areas.
│
│  ├─ Memory Lane (AI experience)
│  │  ├─ Auto-generate a trip recap video/slideshow with music.
│  │  ├─ Auto-play photos in sync with emotional beats of soundtrack.
│  │  ├─ “Relive Trip” mode: music + map path + memories.
│
│  ├─ Social & Local
│  │  ├─ Follow local curators / cultural experts.
│  │  ├─ Community-made playlists by destination.
│
├─ Quality-of-life
│  ├─ Lightweight UI for travel use.
│  ├─ Offline listening support.
│  ├─ Multi-trip library (each trip has its own soundtrack).
│  ├─ Light/dark mode for day/night travel.
│
├─ Non-Goals (for now)
│  ├─ No full music streaming library like Spotify.
│  ├─ No messaging or social feed.
│  ├─ No complex travel planning/itineraries.

traveltune/
├─ app/
│  ├─ (modals)/
│  │  └─ _layout.tsx
│  ├─ (tabs)/
│  │  ├─ a/
│  │  │  ├─ _layout.tsx
│  │  │  ├─ browseCity.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ nearbySuggest.tsx
│  │  │  └─ travelMood.tsx
│  │  ├─ b/
│  │  │  ├─ _layout.tsx
│  │  │  └─ index.tsx
│  │  ├─ c/
│  │  │  ├─ _layout.tsx
│  │  │  └─ index.tsx
│  │  ├─ d/
│  │  │  ├─ _layout.tsx
│  │  │  └─ index.tsx
│  │  └─ _layout.tsx
│  ├─ _layout.tsx
│  ├─ goodbye.tsx
│  ├─ index.tsx
│  ├─ land.tsx
│  ├─ signIn.tsx
│  ├─ signUp.tsx
│  └─ welcome.tsx
├─ assets/
├─ components/
│  ├─ a/
│  │  └─ header.tsx
│  ├─ b/
│  └─ shared/
│     ├─ customGrid.tsx
│     ├─ header.tsx
│     ├─ horizontalList.tsx
│     ├─ masonryGrid.tsx
│     ├─ navBar.tsx
│     ├─ promptUI.tsx
│     └─ sectionHeader.tsx
├─ constants/
│  ├─ design.ts
│  └─ theme.ts
├─ contexts/
│  ├─ authContext.tsx
│  ├─ appContext.tsx
│  ├─ designContext.tsx
│  ├─ tabContext.tsx
│  ├─ themeContext.tsx
│  └─ tokenContext.tsx
├─ hooks/
│  ├─ useDiscover.ts
│  ├─ useJourney.ts
│  └─ usePlay.ts
├─ .gitignore
├─ app.json
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json


```
