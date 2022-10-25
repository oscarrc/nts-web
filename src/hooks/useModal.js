import { Suspense, createContext, useContext, useEffect, useRef, useState } from 'react'

const ModalContext = createContext();

const ModalProvider = ({children}) => {
    const overlay = useRef(null);
    const [ modal, setModal ] = useState(false); 
    const [ isFullWidth, setIsFullWidth ] = useState(false);
    const [ modalContent, setModalContent ] = useState(false);
    
    const modalOpen = "fixed top-0 left-0 right-0 bottom-0 min-w-screen min-h-screen bg-neutral bg-opacity-75 z-50 opacity-100 visible";

    const handleModal = (content = false, fullWidth = false ) => {
        setModal(content ? true : false);
        setIsFullWidth(fullWidth);
        setModalContent(content || null );
    }  
    
    const toggleModal = (event) => {
        if(event.target === overlay.current || event.key === "Escape") handleModal();
    }

    useEffect(() => {
        document.addEventListener("keydown", toggleModal, false);
        return () =>  document.removeEventListener("keydown", toggleModal, false);
    })

    useEffect(() => {
        if(modal) document.body.classList.add("overflow-hidden");
        else document.body.classList.remove("overflow-hidden");
    })

    return (
        <ModalContext.Provider value={{ handleModal }}>
            { children }
            <div ref={overlay} className={`flex items-center justify-center transition-all duration-50 ease-in ${modal ? modalOpen  : 'opacity-0 modal'}`} onClick={ (e) => toggleModal(e) }>
                <div className={`modal-box ${ isFullWidth && "max-w-none" } transition-all duration-200 ease-in-out overflow-visible bg-transparent shadow-none`}>   
                <Suspense fallback={<div></div>}>
                    { modal ? modalContent : null }
                </Suspense>
                </div>
            </div>
        </ ModalContext.Provider>
    )
}

const useModal = () => {
    const context = useContext(ModalContext);
    if(context === undefined) throw new Error("useModal must be used within a ModalProvider")
    return context;
}

export { ModalProvider, useModal }