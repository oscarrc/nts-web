import { AiFillWindows } from "react-icons/ai";
import { BsCaretRightFill } from "react-icons/bs";
import { SiLinux } from "react-icons/si";
import { useLayout } from "../../hooks/useLayout";
import { useState } from "react";

const Info = () => {
    const { handleModal, supportsPWA, installPWA } = useLayout();

    const [ active, setActive ] = useState(0);
    const sections = ["How it works", "Compatibility", "Installation"]

    return(
        <div className="card w-full max-w-lg bg-neutral shadow-xl overflow-visible">
            <div className="card-body gap-4 mt-2 justify-center">
                <div className="tabs">
                    { sections.map((s, i) => <button onClick={ () => setActive(i) } key={i} aria-label={s} className={`flex-1 tab tab-bordered ${ i === active ? "tab-active" : ""}`}>{s}</button>) }
                </div>
                <div className="flex text-secondary mt-4 justify-center items-center min-h-[16rem]">
                    <div className={`${active === 0 ? "visible" : "hidden" } flex-1`}>
                        <video controls className="w-full h-auto">
                            <source src="static/media/explainer.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className={`${active === 1 ? "visible" : "hidden" } flex-1`}>
                        <p className="text-justify mb-4">This app makes use of the <strong>Web Midi API</strong> and the <strong>AudioContext API</strong>.</p>
                        <p className="text-justify mb-4">Make sure your browser support those by checking the links below.</p>
                        <ul className="mb-4">
                            <li>
                                <BsCaretRightFill className="h-4 w-4 mr-2 inline" />
                                <a className="link link-primary" href="https://caniuse.com/midi" target="_BLANK" rel="noreferrer noopener">Web Midi API</a>
                            </li>
                            <li>
                                <BsCaretRightFill className="h-4 w-4 mr-2 inline" />
                                <a className="link link-primary" href="https://caniuse.com/audio-api" target="_BLANK" rel="noreferrer noopener">Web Audio API </a>
                            </li>
                        </ul>
                        <p>Due on how Apple handle simple and standard things, this app will not work on any Mac OS or iOS devices.</p>
                    </div>
                    <div className={`${active === 2 ? "visible" : "hidden" } flex-1`}>
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
                        <span className="divider divider-primary font-semibold my-8 text-primary">OR</span>                        
                        <div className="flex w-full items-center justify-center">
                            <div className="dropdown m-4 flex-1">
                                <label role="button" tabIndex="0" className="btn btn-info btn-outline w-full" >
                                    <AiFillWindows className="h-6 w-6 mr-1" /> Windows
                                </label>
                                <ul tabIndex="0" className="dropdown-content menu menu-info p-2 shadow rounded p-0 -top-px w-full">
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">64 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">32 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">Portable</a></li>
                                </ul>
                            </div>                            
                            <div className="dropdown m-4 flex-1">                                
                                <label role="button" tabIndex="0" className="btn btn-secondary w-full">
                                    <SiLinux className="h-6 w-6 mr-1" /> Linux
                                </label>
                                <ul tabIndex="0" className="dropdown-content menu menu-secondary p-2 shadow rounded p-0 -top-px w-full">
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">Deb 64 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">Deb 32 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">RPM 64 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">RPM 32 bits</a></li>
                                    <li><a href="https://github.com/oscarrc/nts-web/releases/latest/download/{asset_name}" target="_BLANK" rel="noreferrer noopener">AppImage</a></li>
                                </ul>
                            </div>
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

export default Info;