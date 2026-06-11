# HostelHub

Student hostel discovery and booking mobile app for campuses in Nairobi and across East Africa.

Built with **React Native**, **Expo**, and **NativeWind** (Tailwind CSS), matching the [Figma design](https://www.figma.com/design/eP9TdxrkQRcmZJRanpFVe4/HostelHub-Mobile-App-Design).

## Tech Stack

- React Native + Expo SDK 54
- Expo Router (file-based navigation)
- NativeWind v4 (Tailwind CSS)
- TypeScript
- Lucide React Native icons

## Features

- Splash, login, register, forgot password
- Home with search, categories, location picker
- Hostel details with gallery and amenities
- Booking flow with confirmation
- Favorites / saved hostels
- Bookings history
- User profile and logout

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- [Expo Go](https://expo.dev/go) on your phone, or Android Studio / Xcode emulator

### Install

```bash
cd HostelHub
npm install
```

### Run

```bash
npm start
```

Then press `a` for Android emulator, `i` for iOS simulator, or scan the QR code with Expo Go.

## Project Structure

```
app/           # Screens (Expo Router)
components/    # Reusable UI components
contexts/      # React context (auth, favorites)
data/          # Static hostel & location data
models/        # TypeScript interfaces
services/      # Auth, hostel, booking services
assets/        # App icons and splash
```

## Demo Login

Use any email with `@` and a password of at least 6 characters.

Example: `student@uon.ac.ke` / `password123`
