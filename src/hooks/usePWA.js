import { useEffect, useState } from "react";

const usePWA = () => {    
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    
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

      return { supportsPWA, installPWA }
}

export { usePWA }