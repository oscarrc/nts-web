import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { LayoutProvider } from "./hooks/useLayout";
import Live from "./views/Live";
import { MidiProvider } from "./hooks/useMidi";
import { NTSProvider } from "./hooks/useNTS";
import Synth from "./views/Synth";

const App = () => {
  // eslint-disable-next-line no-unused-vars
    
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden xl:px-8 sm:px-4 px-2">
      <MidiProvider>
        <NTSProvider>        
          <LayoutProvider>
            <Header />
            <Synth />
            <Live />
            <Footer />
          </LayoutProvider>
        </NTSProvider>
      </MidiProvider>
    </div>
  );
}

export default App;
