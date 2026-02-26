# 🌍 Pays Francophones du Monde / Francophone Countries of the World

A modern, interactive, and visually stunning bilingual (French/English) React website showcasing Francophone countries across different continents.

## ✨ Features

- **Modern React Architecture**: Built with React 18, Vite, and Framer Motion
- **Bilingual Support**: Seamlessly switch between French and English with smooth animations
- **Interactive Animations**: Smooth scroll animations, hover effects, and page transitions
- **Modern Design**: Dark theme with gradient backgrounds, glowing effects, and glassmorphism
- **Responsive Design**: Beautiful on all devices (mobile, tablet, desktop)
- **Component-Based**: Clean, maintainable React components
- **Organized by Continent**: Countries grouped by continent (Africa, Europe, North America, Asia)

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

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

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
- **Responsive Layout**: Adapts beautifully to all screen sizes

## 📁 Project Structure

```
Francophone-countries/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── CountryCard.jsx
│   │   ├── ContinentSection.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── data/
│   │   └── countries.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── assets/
│   └── [images]
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Framer Motion**: Smooth animations and transitions
- **React Router DOM**: (Ready for routing if needed)
- **CSS3**: Modern CSS with gradients, animations, and effects

## 🖼️ Adding Images

Images are stored in the `assets` folder. To add new images:

1. Place images in the `assets` folder
2. Update the `countries.js` file with the image path:
```javascript
city: {
  image: 'assets/your-image.jpg'
}
```

## 🌐 Browser Support

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- French is the default language
- All content is fully bilingual
- Uses Google Fonts (Poppins and Playfair Display)
- Dark theme optimized for visual appeal
- Smooth scroll animations on all elements

## 🎯 Future Enhancements

- Add more countries
- Individual country detail pages
- Interactive world map
- Search and filter functionality
- Image gallery for each country
- Video content integration
- Social media sharing

## 📄 License

This project is open source and available for educational purposes.

---

Created with ❤️ to celebrate Francophonie
