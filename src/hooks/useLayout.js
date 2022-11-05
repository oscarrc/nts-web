import { createContext, useContext, useEffect, useState } from "react";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

const getCurrentBreakpoint = () => {
  let currentBreakpoint = "xs";
  let biggestBreakpointValue = 0;

  const screens = {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px'
  }

  Object.keys(screens).forEach( breakpoint => {
    const breakpointValue = parseInt(screens[breakpoint].slice(0, -2));
    
    if (breakpointValue > biggestBreakpointValue && window.innerWidth >= breakpointValue ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  })
  
  return currentBreakpoint;
}

const LayoutContext = createContext();

const LayoutProvider = ({children}) => {
    const [ windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [ breakpoint, setBreakpoint ] = useState(getCurrentBreakpoint());
    const [ bottomDrawer, setBottomDrawer ] = useState(false);

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        setBreakpoint(getCurrentBreakpoint());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <LayoutContext.Provider value={{ getWindowDimensions, windowDimensions, bottomDrawer, setBottomDrawer, breakpoint, getCurrentBreakpoint }}>
        {
          windowDimensions.width < 380 ?
            <div className="flex flex-1 flex-col gap-8 items-center justify-center">
              <h1 className="text-2xl text-center upercase font-bold">Window is to small!!</h1>
              <p className="text-center text-secondary">Make your window wider or get a device with a bigger screen</p>
            </div> :                
            <main className="flex flex-col flex-1 min-h-full justify-between items-center py-8">
              { children }
            </main>
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