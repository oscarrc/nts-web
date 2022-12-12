import { AiFillWindows } from "react-icons/ai";
import { SiLinux } from "react-icons/si";
import { useLayout } from "../../hooks/useLayout";

const Download = () => {
    const { handleModal, supportsPWA, installPWA } = useLayout();

    return(
        <div className="card w-full max-w-lg bg-neutral shadow-xl overflow-visible">
            <div className="card-body">
                <h2 className="card-title divider divider-primary mb-8">Download the app</h2>
                <div className="flex flex-1 flex-col w-full">
                    <div className="flex w-full items-center justify-center">
                        <a className="inline" href="https://play.google.com/store/apps/details?id=me.oscarrc.nts_web.twa" target="_BLANK" rel="noreferrer noopener">
                            <img width="200" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Play Store"/>
                        </a>     
                        {
                            supportsPWA &&               
                            <buton className="p-3 cursor-pointer" onClick={ installPWA } aria-label="install pwa" href="https://nts-web.oscarrc.me" target="_BLANK" rel="noreferrer noopener">
                                <img width="175" src="https://user-images.githubusercontent.com/3104648/28969264-d14f6178-791b-11e7-9399-e7820d6aaa39.png" alt="PWA" />
                            </buton>
                        }
                    </div>
                    <span className="divider divider-secondary my-8 text-secondary">OR</span>                        
                    <div className="flex w-full items-center justify-center">
                        <div className="dropdown m-4 flex-1">
                            <label role="button" tabIndex="0" className="btn btn-info btn-outline w-full" >
                                <AiFillWindows className="h-6 w-6 mr-1" /> Windows
                            </label>
                            <ul tabIndex="0" className="dropdown-content menu menu-info p-2 shadow rounded p-0 -top-px w-full">
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_win-x64-${process.env.REACT_APP_VERSION}.exe`} target="_BLANK" rel="noreferrer noopener">Installer 64 bits</a></li>
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_win-ia32-${process.env.REACT_APP_VERSION}.exe`} target="_BLANK" rel="noreferrer noopener">Installer 32 bits</a></li>
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_win-x64-${process.env.REACT_APP_VERSION}_portable.exe`} target="_BLANK" rel="noreferrer noopener">Portable 64 bits</a></li>
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_win-ia32-${process.env.REACT_APP_VERSION}_portable.exe`} target="_BLANK" rel="noreferrer noopener">Portable 32 bits</a></li>
                            </ul>
                        </div>                            
                        <div className="dropdown m-4 flex-1">                                
                            <label role="button" tabIndex="0" className="btn btn-secondary w-full">
                                <SiLinux className="h-6 w-6 mr-1" /> Linux
                            </label>
                            <ul tabIndex="0" className="dropdown-content menu menu-secondary p-2 shadow rounded p-0 -top-px w-full">
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_linux-amd64-${process.env.REACT_APP_VERSION}.deb`} target="_BLANK" rel="noreferrer noopener">Deb 64 bits</a></li>
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_linux-x86_64-${process.env.REACT_APP_VERSION}.rpm`} target="_BLANK" rel="noreferrer noopener">RPM 64 bits</a></li>
                                <li><a href={`https://github.com/oscarrc/nts-web/releases/latest/download/NTS-web_linux-x86_64-${process.env.REACT_APP_VERSION}.AppImage`} target="_BLANK" rel="noreferrer noopener">AppImage</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-actions justify-end gap-2 mt-4 col-span-2">
                    <button onClick={ () => handleModal() } className="btn btn-sm btn-primary btn-outline">Close</button>
                </div>
            </div>            
        </div>
    )
}

export default Download;