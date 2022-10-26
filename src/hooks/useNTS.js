import { createContext, useContext, useReducer } from 'react'

const NTSContext = createContext();

const NTSReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const NTSProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NTSReducer);

    return (
        <NTSContext.Provider value={{ state, dispatch }}>{ children }</ NTSContext.Provider>
    )
}

const useNTS = () => {
    const context = useContext(NTSContext);
    if(context === undefined) throw new Error("useNTS must be used within a NTSProvider")
    return context;
}

export { NTSProvider, useNTS };