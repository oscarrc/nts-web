module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    daisyui:{
        themes: [
            {
                nts: {
                    "primary": "#f3cc62",          
                    "secondary": "#b4b4b4",                             
                    "accent": "#d32029",                             
                    "neutral": "#212122", 
                }
            }
        ]
    },
    plugins: [require("daisyui")]
}