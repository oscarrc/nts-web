import { createContext, useContext, useEffect, useState } from "react";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

const LayoutContext = createContext();

const LayoutProvider = ({children}) => {
    const [windowDimensions, setLayout] = useState(getWindowDimensions());
    const [ bottomDrawer, setBottomDrawer ] = useState(false);

    useEffect(() => {
      function handleResize() {
        setLayout(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <LayoutContext.Provider value={{ getWindowDimensions, windowDimensions, bottomDrawer, setBottomDrawer }}>
        {
              windowDimensions.width < 380 ?
                <div className="flex flex-1 flex-col gap-8 items-center justify-center">
                  <h1 class="text-2xl text-center upercase font-bold">Window is to small!!</h1>
                  <p class="text-center text-secondary">Make your window wider or get a device with a bigger screen</p>
                </div> :
                children
        }
      </ LayoutContext.Provider>
  )
}

const useLayout = () => {
  const context = useContext(LayoutContext);
  if(context === undefined) throw new Error("useLayout must be used within a LayoutProvider")
  return context;
}

export { useLayout, LayoutProvider };