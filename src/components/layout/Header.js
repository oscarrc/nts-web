import { FaCog, FaFileExport, FaFileImport } from "react-icons/fa"

import korg from '../../assets/korg.svg';
import { lazy } from "react";
import { useModal } from "../../hooks/useModal";

const Header = () => {
    const { handleModal } = useModal();
    const openSettings = () => {
        const Settings = lazy(() => import('../../views/Settings'));
        handleModal(<Settings />);
    }

    return (
        <header className="navbar flex-col gap-4 sm:flex-row">
            <div className="flex-1">
                <a href="/" className="flex items-end flex-wrap">
                    <img className="h-16 max-h-32 min-h-8 max-w-[10rem] w-full" src={korg} alt="Korg NTS-web" />
                    <strong className="-mb-1">NTS-Web</strong>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 gap-4">
                    <li>
                        <button className="btn btn-sm btn-primary btn-outline py-0"><FaFileImport className="h-4 w-4"/> <span className="hidden sm:inline">Import</span></button>
                    </li>
                    <li>
                        <button className="btn btn-sm btn-primary btn-outline py-0"><FaFileExport className="h-4 w-4"/> <span className="hidden sm:inline">Export</span></button>
                    </li>
                    <li>
                        <button onClick={ openSettings } className="btn btn-sm btn-primary btn-outline py-0"><FaCog className="h-4 w-4"/></button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header