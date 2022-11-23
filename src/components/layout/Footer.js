import { FaBug, FaDownload, FaHeart, FaInfo } from "react-icons/fa"

import { SiKofi } from "react-icons/si";
import { lazy } from "react";
import { useLayout } from "../../hooks/useLayout";
import { usePWA } from "../../hooks/usePWA";

const Footer = () => {
    const { handleModal } = useLayout();
    const { supportsPWA, installPWA } = usePWA();
    
    const openInfo = () => {
        const Info = lazy(() => import('../../views/modals/Info'));
        handleModal(<Info />);
    }

    return (
        <footer className="footer items-center justify-items-center	 md:justify-between p-2 gap-y-4">
            <p className="inline text-center">Made with <FaHeart className="text-accent h-3 w-3 inline" /> by <a className="font-semibold hover:text-accent transition-all transition-200" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
            <p className="text-secondary text-center italic">This page is not affiliated or endorsed by Korg</p>
            <div className="flex flex-col items-center sm:flex-row gap-2">
                <a href="https://ko-fi.com/oscarrc" rel="noreferrer noopener" target="_blank" className="btn btn-primary btn-outline btn-xs"><SiKofi className="h-3 w-3 mr-2" /> Buy me a coffee</a>
                <div className="flex gap-2">
                    <div className="tooltip" data-tip="Info">
                        <button onClick={openInfo} aria-label="Info and help" className="btn btn-primary btn-outline btn-xs"><FaInfo className="h-3 w-3" /></button>
                    </div>
                    { supportsPWA && 
                        <div className="tooltip" data-tip="Install the app">
                            <button aria-label="Install the app" onClick={ installPWA } className="btn btn-primary btn-outline btn-xs"><FaDownload className="h-3 w-3" /></button>
                        </div> 
                    }
                    <div className="tooltip" data-tip="Report a bug"><a role="button" aria-label="Report a bug" href="https://github.com/oscarrc/nts-web/issues" rel="noreferrer noopener" target="_blank" className="btn btn-primary btn-outline btn-xs"><FaBug className="h-3 w-3" /></a></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer