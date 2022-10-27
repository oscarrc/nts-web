import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Live from "./views/Live";
import { ModalProvider } from "./hooks/useModal";
import { NTSProvider } from "./hooks/useNTS";
import Small from "./views/Small";
import Synth from "./views/Synth";
import { useMidi } from "./hooks/useMidi";
import { useState } from "react";
import { useWindowDimensions } from "./hooks/useWindowDimensions";

const App = () => {
  const { enabled } = useMidi();
  const { width } = useWindowDimensions();

  const [ liveControls, setLiveControls ] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden xl:px-8 sm:px-4 px-2">
      <ModalProvider>
        <Header />
        <main className="flex flex-col flex-1 min-h-full justify-between items-center py-8">
          <NTSProvider>              
            {
              width < 380 ?
                <Small /> :
                <>
                  <Synth />
                  <Live isOpen={ liveControls } toggle={ () => setLiveControls(l => !l) } />
                </>
            }
          </NTSProvider>
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}

export default App;
