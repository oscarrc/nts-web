import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { ModalProvider } from "./hooks/useModal";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen px-8">
      <ModalProvider>
        <Header />
        <main className="flex-1 min-h-full">
          
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
}

export default App;
