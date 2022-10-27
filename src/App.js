import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { LayoutProvider } from "./hooks/useLayout";
import Live from "./views/Live";
import { ModalProvider } from "./hooks/useModal";
import { NTSProvider } from "./hooks/useNTS";
import Synth from "./views/Synth";

const App = () => {
  // eslint-disable-next-line no-unused-vars
    
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden xl:px-8 sm:px-4 px-2">
      <ModalProvider>
        <Header />
        <main className="flex flex-col flex-1 min-h-full justify-between items-center py-8">
          <NTSProvider>
            <LayoutProvider>
              <Synth />
              <Live />
            </LayoutProvider>
          </NTSProvider>
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}

export default App;
