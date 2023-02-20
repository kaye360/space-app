
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'space' : ['Rajdhani']
      },
      animation: {
        'planet-in' : 'planet-in 1.5s ease-in-out both',
        'planet-out' : 'planet-out 1.5s ease-in-out',
        'loader-grid' : 'loader-grid 5s linear both',
        'loader' : 'loader 5s linear both',
        'loading-text' : 'loading-text 5s linear both'
      },
      keyframes: {
        'planet-in' : {
          '0%' : { opacity : '0%', transform : 'translateX(10vw) rotate(5deg) scale(0.8)' },
          '50%' : { opacity : '50%', transform : 'translateX(0) rotate(0)' },
          '100%' : { opacity : '100%', transform : 'translateX(0)'}
        },
        'planet-out' : {
          '0%' : { opacity : '100%' },
          '100%' : { opacity : '0%', transform : 'translateX(-10vw) rotate(5deg) scale(0.8)'}
        },
        'loader-grid' : {
          '0%' : { clipPath : 'polygon(0 81%, 100% 81%, 100% 100%, 0% 100%)' },
          '50%' : { clipPath : 'polygon(0 43%, 100% 26%, 100% 76%, 0 65%)', transform : 'skewX(15deg)'  },
          '90%' : { clipPath : 'polygon(0 0, 100% 0, 100% 33%, 0 32%)', opacity : '1'  },
          '100%' : { clipPath : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity : '0.1' },
        },
        'loader' : {
          '0%' : { opacity : '1' },
          '90%' : { opacity : '1', background : '#080b12' },
          '100%' : { opacity : '0.9', background : 'transparent' }
        },
        'loading-text' : {
          '100%' : { opacity : '0' }
        }
      }
    },
  },
  plugins: [],
}
