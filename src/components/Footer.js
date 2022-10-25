import { FaBug, FaDownload, FaHeart } from "react-icons/fa"

import { SiKofi } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="footer items-center justify-items-center	 md:justify-between px-2 py-4 gap-y-4">
            <p className="grid-flow-col items-center">Made with <FaHeart className="text-accent h-3 w-3 inline" /> by <a className="hover:text-accent transition-all transition-200" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
            <p className="text-secondary italic">This page is not affiliated or endorsed by Korg</p>
            <div className="flex gap-2">
                <button className="btn btn-primary btn-outline btn-xs"><SiKofi className="h-3 w-3 mr-2" /> Buy me a coffee</button>
                <div class="tooltip" data-tip="Install the app"><button className="btn btn-primary btn-outline btn-xs"><FaDownload className="h-3 w-3" /></button></div>
                <div class="tooltip" data-tip="Report a bug"><button className="btn btn-primary btn-outline btn-xs"><FaBug className="h-3 w-3" /></button></div>
            </div>
        </footer>
    )
}

export default Footer