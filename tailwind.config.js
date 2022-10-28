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
      require("@tailwindcss/forms"),
      require("daisyui")
    ]
}