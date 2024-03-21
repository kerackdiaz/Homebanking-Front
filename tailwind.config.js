/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg-login': "url('./assets/bg-login.jpg')",
        'card-titanium-f': "url('./assets/titanium-front.png')",
        'card-titanium-b': "url('./assets/titanium-back.png')",
        'card-gold-f': "url('./assets/gold-front.png')",
        'card-gold-b': "url('./assets/gold-back.png')",
        'card-silver-f': "url('./assets/silver-front.png')",
        'card-silver-b': "url('./assets/silver-back.png')",
        'banner01': "url('./assets/banner01.jpg')",
        'banner02': "url('./assets/banner02.jpg')",
        'banner03': "url('./assets/banner03.jpg')",
      },
      fontFamily: {
        'gemunu': ['Gemunu Libre', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
    screens: {
      'movil': '320px',
      
      'tablet': '640px',

      'laptop': '1024px',

      'desktop': '1280px',

    },
  },
  plugins: [],
};

