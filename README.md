# 🌍 Pays Francophones du Monde / Francophone Countries of the World

A modern, interactive, and visually stunning bilingual (French/English) React website showcasing Francophone countries across different continents with an engaging interactive game and cinematic map transitions.

## ✨ Features

- **Modern React Architecture**: Built with React 18, Vite, and Framer Motion
- **Bilingual Support**: Seamlessly switch between French and English with smooth animations
- **Interactive Country Game**: 4x4 grid game where users discover countries by clicking cards
- **Cinematic Map Transitions**: Beautiful full-screen world map animations when selecting countries
- **Interactive Animations**: Smooth scroll animations, hover effects, and page transitions
- **Modern Design**: Dark theme with gradient backgrounds, glowing effects, and glassmorphism
- **Fully Responsive**: Beautiful on all devices (mobile, tablet, desktop) with mobile-first approach
- **Component-Based**: Clean, maintainable React components
- **Organized by Continent**: Countries grouped by continent (Africa, Europe, North America, Asia)
- **Performance Optimized**: Vercel Speed Insights integration

## 🌍 Countries Featured

### Africa
- 🇸🇳 Senegal (Dakar, Thiébou Dieune)
- 🇲🇦 Morocco (Marrakech, Couscous)

### Europe
- 🇨🇭 Switzerland (Geneva, Fondue)
- 🇧🇪 Belgium (Brussels, Moules-frites)

### North America
- 🇨🇦 Canada (Montreal, Poutine)
- 🇭🇹 Haiti (Port-au-Prince, Griot)

### Asia
- 🇻🇳 Vietnam (Hanoi, Phở)
- 🇱🇧 Lebanon (Beirut, Mezze)

## 🎮 Interactive Features

### Country Discovery Game
- **4x4 Interactive Grid**: Click cards to reveal countries and educational messages
- **Card Flip Animation**: Cards start hidden and flip to reveal content
- **Progress Tracking**: Track visited countries with localStorage persistence
- **Educational Messages**: Learn about Francophonie while exploring

### Cinematic Map Transitions
- **Full-Screen World Map**: Beautiful OpenStreetMap integration
- **Multi-Stage Animation**: World view → Continent zoom → Country location
- **Stage Indicators**: Clear visual feedback during transitions
- **Country Markers**: Animated pins with pulsing effects
- **Smooth Navigation**: Seamless transition to country detail pages

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Francophone-countries
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design Features

- **Dark Theme**: Modern dark background with gradient accents
- **Animated Backgrounds**: Floating gradient orbs and animated grid patterns
- **Glassmorphism**: Frosted glass effects on cards and navigation
- **Smooth Animations**: Framer Motion powered animations throughout
- **Interactive Elements**: Hover effects, scale animations, and smooth transitions
- **Gradient Text**: Beautiful gradient text effects on headings
- **Glowing Effects**: Subtle glow effects on interactive elements
- **Responsive Layout**: Mobile-first design that adapts beautifully to all screen sizes
- **Cinematic Transitions**: Netflix/Apple-style map animations

## 📁 Project Structure

```
Francophone-countries/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Top navigation bar with language toggle
│   │   ├── Landing.jsx             # Landing page with game
│   │   ├── CountryGame.jsx         # Interactive 4x4 grid game
│   │   ├── WorldMapTransition.jsx  # Cinematic map transition component
│   │   ├── CountryCard.jsx         # Individual country display card
│   │   ├── InteractiveStats.jsx    # Statistics display
│   │   ├── Footer.jsx              # Footer component
│   │   └── ParticleBackground.jsx  # Animated particle background
│   ├── pages/
│   │   └── ContinentPage.jsx      # Continent detail page
│   ├── context/
│   │   └── LanguageContext.jsx     # Language state management
│   ├── data/
│   │   └── countries.js            # Country data and information
│   ├── styles/
│   │   └── App.css                 # Global styles
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # Entry point
├── public/
│   └── assets/                     # Image assets
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                     # Vercel deployment config
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Framer Motion**: Smooth animations and transitions
- **React Router DOM**: Client-side routing
- **React Leaflet**: Interactive map components (OpenStreetMap)
- **Leaflet**: Map library
- **CSS3**: Modern CSS with gradients, animations, and effects
- **Vercel Speed Insights**: Performance monitoring

## 🗺️ Map Integration

The project uses **OpenStreetMap** via React Leaflet for the cinematic map transitions. This provides:
- Free, no API key required
- Detailed world maps
- Smooth zoom animations
- Custom markers and styling
- Full mobile responsiveness

## 🖼️ Adding Images

Images are stored in the `public/assets` folder. To add new images:

1. Place images in the `public/assets` folder
2. Update the `countries.js` file with the image path:
```javascript
city: {
  image: '/assets/your-image.jpg'  // Note: absolute path from public folder
}
```

## 📱 Mobile Optimization

- **Full-Screen Map Transitions**: Portal-based rendering for true full-screen experience
- **Responsive Navigation**: Hamburger menu on mobile devices
- **Touch-Friendly**: Large tap targets and smooth touch interactions
- **Dynamic Viewport Height**: Uses `100dvh` for proper mobile browser support
- **Optimized Animations**: Reduced animation complexity on mobile for better performance

## 🌐 Browser Support

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The project is configured for Vercel deployment:

1. Push to your repository
2. Connect to Vercel
3. Deploy automatically

The `vercel.json` file ensures proper routing and asset handling.

## 📝 Notes

- French is the default language
- All content is fully bilingual
- Uses Google Fonts (Poppins and Playfair Display)
- Dark theme optimized for visual appeal
- Smooth scroll animations on all elements
- Game progress is saved in localStorage
- Map transitions use React Portal for full-screen rendering

## 🎯 Key Features Explained

### Interactive Game
- Cards are hidden initially and reveal on click
- Fixed 4x4 grid layout (not randomized)
- Mix of country cards and educational message cards
- Progress tracking with visited countries counter

### Map Transitions
- Full-screen overlay using React Portal
- Three-stage animation: World → Continent → Country
- Loading overlay while map tiles load
- Stage indicators show current progress
- Smooth navigation to country pages after transition

## 📄 License

This project is open source and available for educational purposes.

---

Created with ❤️ to celebrate Francophonie
