# STRANGE EVENTS 🩸

> "Join the Revolution. Discover, Participate, Excel."

A visually immersive, horror-themed event management platform built for hackathons, workshops, and campus competitions. Inspired by the "Stranger Things" aesthetic, this project combines modern 3D web technologies with a retro-dark vibe to create a unique user experience.

![Project Status](https://img.shields.io/badge/status-active-crimson?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## 🌟 Features

- **Immersive UI/UX**: Custom cursor effects, film grain overlays, and fog animations for a spooky atmosphere.
- **3D Elements**: Interactive 3D models and text using `Three.js` and `@react-three/fiber`.
- **Smooth Animations**: Powered by `GSAP` (GreenSock) for scroll-triggered reveals and complex timeline animations.
- **Authentication**: Secure user authentication integrated with **Clerk**.
- **Event Management**: Browse tracks, featured events, and detailed event pages.
- **Registration System**: 
  - Seamless multi-step registration forms.
  - Form validation using `Zod` and `React Hook Form`.
  - *Note: Currently running in Mock Mode for demonstration.*
- **Responsive Design**: Fully responsive layouts built with **Tailwind CSS**.

## 🛠️ Tech Stack

### Core
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Animations & 3D
- **GSAP**: Advanced animations and ScrollTrigger effects.
- **Three.js / React Three Fiber**: 3D scene rendering.
- **Framer Motion**: Component-level transitions.

### UI Components & Icons
- **Radix UI**: Accessible primitives for dialogs, accordions, and more.
- **Lucide React**: Beautiful, consistent icons.
- **Shadcn/ui**: Re-usable component patterns.

### Authentication & Forms
- **Clerk**: User management and authentication.
- **React Hook Form**: Performant form handling.
- **Zod**: Schema validation.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/GFG-HACK.git
   cd GFG-HACK
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Clerk keys:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📂 Project Structure

```
src/
├── assets/          # Images, fonts, and media files
├── components/
│   ├── 3d/          # Three.js 3D components
│   ├── effects/     # Visual effects (Fog, Grain, Cursor)
│   ├── sections/    # Landing page sections (Hero, About, Tracks...)
│   ├── ui/          # Reusable UI components (Buttons, Inputs...)
│   └── ...
├── context/         # React Context providers (Lenis Scroll)
├── data/            # Static data for events and content
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helper functions
├── pages/           # Route pages (Index, EventDetail)
└── ...
```

## 🎨 Design System

The project uses a custom "Crimson" theme defined in `tailwind.config.ts`.
- **Primary Color**: Crimson (`#DC143C`)
- **Backgrounds**: Zinc/Black gradients
- **Fonts**: Custom "Kraken", "Stranger Things", and "Empire" fonts for headings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ by the Strange Events Team
</p>
