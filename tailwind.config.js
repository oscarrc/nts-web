module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"],
            dotMatrix: ["Dot Matrix", "monospace"]
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
                    "neutral": "#212122", 
                    "--rounded-btn": "0.2rem"
                }
            }
        ]
    },
    plugins: [      
      require('@tailwindcss/forms'),
      require("daisyui")
    ]
}