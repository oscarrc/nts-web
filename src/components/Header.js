import { FaCog, FaFileExport, FaFileImport } from "react-icons/fa"

import korg from '../assets/korg.svg';

const Header = () => {
    return (
        <header className="navbar">
            <div className="flex-1">
                <a href="/" className="flex items-end">
                    <img className="h-16 max-h-32 min-h-8 max-w-[10rem] w-full" src={korg} alt="Korg NTS-web" />
                    <strong>NTS-web</strong>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 gap-4">
                    <li>
                        <button className="btn btn-sm btn-primary btn-outline py-0"><FaFileImport className="h-4 w-4"/> Import</button>
                    </li>
                    <li>
                        <button className="btn btn-sm btn-primary btn-outline py-0"><FaFileExport className="h-4 w-4"/> Export</button>
                    </li>
                    <li>
                        <button className="btn btn-sm btn-primary btn-outline py-0"><FaCog className="h-4 w-4"/></button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header