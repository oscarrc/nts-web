module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"],
            sevenSegment: ["Seven Segment", "monospace"],            
            dotMatrix: ["Dot Matrix", "monospace"]
        },
        fontSize: {
          "sm": "0.8rem",
          "base": "1rem",
          "xl": "1.25rem",
          "2xl": "1.563rem",
          "3xl": "1.953rem",
          "4xl": "2.441rem",
          "5xl": "3.052rem",
        },
        translate: {
          '5/4': '125%',
        },
        animation: {
          'blink': 'blink 1000ms linear infinite',
        },
        keyframes: {
          'blink': {
            '0%': { backgroundColor: 'transparent' },
            '50%': { 
              backgroundColor: 'hsl(var(--af, var(--a)) / var(--tw-bg-opacity))',
              color: 'hsl(var(--ac) / var(--tw-text-opacity))',
              borderColor: 'hsl(var(--af, var(--a)) / var(--tw-border-opacity))'
            },
            '100%': { backgroundColor: 'transparent' }
          }
        }
      },
    },
    daisyui:{
        themes: [
            {
                nts: {
                    "primary": "#f3cc62",          
                    "secondary": "#b4b4b4",                             
                    "accent": "#d32029",                             
                    "neutral": "#212121", 
                    "base-100": "#434343",
                    "--rounded-btn": "0.25rem"
                }
            }
        ]
    },
    plugins: [      
      require("daisyui")
    ]
}