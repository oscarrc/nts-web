import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Keyboard from "./components/controls/Keyboard";
import { ModalProvider } from "./hooks/useModal";
import { NTSProvider } from "./hooks/useNTS";
import Synth from "./views/Synth";
import { useMidi } from "./hooks/useMidi";

const App = () => {
  const { enabled } = useMidi();
  
  return (
    <div className="flex flex-col min-h-screen px-8">
      <ModalProvider>
        <Header />
        <main className="flex flex-col flex-1 min-h-full justify-between py-8">
          <NTSProvider>              
            <Synth />
            <Keyboard />
          </NTSProvider>
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}

export default App;
