import 'intro.js/introjs.css';

import { Suspense, createContext, useContext, useEffect, useRef, useState } from "react";

import { Steps } from 'intro.js-react';
import { intro } from "../config/tour";

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
    const [ modal, setModal ] = useState(false); 
    const [ isFullWidth, setIsFullWidth ] = useState(false);
    const [ modalContent, setModalContent ] = useState(false);
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const [tourEnabled, setTourEnabled] = useState(false);

    const overlay = useRef(null);
    const modalOpen = "fixed top-0 left-0 right-0 bottom-0 min-w-screen min-h-screen bg-neutral bg-opacity-75 z-50 opacity-100 visible";

    const handleModal = (content = false, fullWidth = false ) => {
        setModal(content ? true : false);
        setIsFullWidth(fullWidth);
        setModalContent(content || null );
    }  
    
    const toggleModal = (event) => {
      if(event.target === overlay.current || event.key === "Escape") handleModal();
    }
    
    const installPWA = evt => {
      evt.preventDefault();
      if(promptInstall) promptInstall.prompt();
      promptInstall.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') setSupportsPWA(false);
      });
    };

    useEffect(() => {
      const handler = e => {
          e.preventDefault();
          setSupportsPWA(true);
          setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);
    }, []);

    useEffect(() => {
      document.addEventListener("keydown", toggleModal, false);
      return () =>  document.removeEventListener("keydown", toggleModal, false);
    })

    useEffect(() => {
      if(modal) document.body.classList.add("overflow-hidden");
      else document.body.classList.remove("overflow-hidden");
    }, [modal])

    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
        setBreakpoint(getCurrentBreakpoint());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <LayoutContext.Provider value={{ getWindowDimensions, windowDimensions, bottomDrawer, setBottomDrawer, breakpoint, getCurrentBreakpoint, handleModal, supportsPWA, installPWA, setTourEnabled }}>
        {
          windowDimensions.width < 380 ?
            <div className="flex flex-1 flex-col gap-8 items-center justify-center">
              <h1 className="text-2xl text-center upercase font-bold">Window is to small!!</h1>
              <p className="text-center text-secondary">Make your window wider or get a device with a bigger screen</p>
            </div> :                
            <>
              { children }
              <div ref={overlay} className={`flex items-center justify-center transition-all duration-50 ease-in ${modal ? modalOpen  : 'opacity-0 modal'}`} onClick={ (e) => toggleModal(e) }>
                  <div className={`modal-box ${ isFullWidth && "max-w-none" } transition-all duration-200 ease-in-out overflow-visible bg-transparent shadow-none`}>   
                    <Suspense fallback={<div></div>}>
                        { modal ? modalContent : null }
                    </Suspense>
                  </div>
              </div>
              <Steps
                enabled={ tourEnabled }
                steps={intro}
                initialStep={0}                
                options={{ hideNext: false, nextToDone: true }}
                onExit={() => setTourEnabled(false) }
              />
            </>
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