# Image to Image AI Generator

A modern, responsive web application built with React, Vite, Tailwind CSS, and Shadcn UI components that mimics an AI image generation interface.

## Features

- 🎨 **Image Upload**: Drag and drop or click to upload images
- 🎭 **Style Selection**: Choose from Anime, Oil Painting, and Cyberpunk styles
- 🖼️ **Gallery View**: Browse generated AI images in a responsive grid
- 🔍 **Search Functionality**: Search through the gallery
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ✨ **Modern UI**: Glass morphism effects, gradient backgrounds, and smooth animations

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: CSS animations and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, Input)
│   ├── Header.jsx    # Navigation header
│   ├── ImageGenerator.jsx  # Main image generation interface
│   └── Gallery.jsx   # Image gallery component
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main application component
├── main.jsx          # Application entry point
└── index.css         # Global styles and Tailwind imports
```

## Responsive Design

The application is fully responsive and adapts to different screen sizes:

- **Desktop** (1024px+): Full layout with side-by-side panels
- **Tablet** (768px-1023px): Stacked layout with adjusted spacing
- **Mobile** (< 768px): Single column layout with touch-friendly controls

## Customization

### Colors and Theming

The application uses a purple-to-pink gradient theme. You can customize colors in:
- `src/index.css` - CSS custom properties
- `tailwind.config.cjs` - Tailwind color scheme

### Adding New Styles

To add new image generation styles, modify the `styles` array in `src/components/ImageGenerator.jsx`:

```javascript
const styles = [
  {
    id: 'new-style',
    name: 'New Style',
    image: 'path-to-preview-image',
  },
  // ... other styles
];
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes.
