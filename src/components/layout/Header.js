import { FaCog, FaFileExport, FaFileImport, FaRandom } from "react-icons/fa"
import { MdPiano, MdPianoOff } from "react-icons/md"
import { lazy, useRef } from "react";

import korg from '../../assets/korg.svg';
import { useLayout } from "../../hooks/useLayout";
import { useModal } from "../../hooks/useModal";
import { useNTS } from "../../hooks/useNTS";

const Header = () => {
    const { handleModal } = useModal();
    const selectorRef = useRef(null);
    const { restoreBank, randomize } = useNTS();
    const { bottomDrawer, setBottomDrawer } = useLayout();

    const openSettings = () => {
        const Settings = lazy(() => import('../../views/Settings'));
        handleModal(<Settings />);
    }

    const toggleLive = () => setBottomDrawer(b => !b);

    const selectData = () => selectorRef.current.click();

    const importData = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            Object.keys(data).forEach(b => restoreBank(b, data[b]))
        };
        
        // reader.onerror = reject;    
        reader.readAsText(file);
    }

    const exportData = () => {
        const contentType = `application/ntsweb+json;charset=utf-8;`;
        const data = {};

        [...Array(15).keys()].forEach( (b) => {
            const bank = JSON.parse(localStorage.getItem(`BANK_${b}`));
            if(bank) data[b] = bank;
        });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, "data.ntsweb");
          } else {
            let a = document.createElement('a');
            a.download = "data.ntsweb";
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
    }

    return (
        <header className="navbar flex-col gap-4 sm:flex-row min-h-[4rem]">
            <div className="flex-1">
                <a href="/" className="flex items-end flex-wrap">
                    <span className="h-16 w-40">
                        <img className="h-full w-full" src={korg} alt="Korg NTS-web" />
                    </span>
                    <strong className="-mb-1">NTS-Web</strong>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 gap-2 sm:gap-4">
                    <li className="tooltip tooltip-bottom" data-tip="Import">
                        <input onChange={ importData } ref={ selectorRef } type="file" className="hidden" accept=".ntsweb"/>
                        <button aria-label="Import" onClick={ selectData } className="btn btn-sm btn-primary btn-outline py-0"><FaFileImport className="h-4 w-4"/></button>
                    </li>
                    <li className="tooltip tooltip-bottom" data-tip="Export">
                        <button aria-label="Export" onClick={ exportData } className="btn btn-sm btn-primary rounded-0 md:rounded btn-outline py-0"><FaFileExport className="h-4 w-4"/></button>
                    </li>
                    <li className="tooltip tooltip-bottom" data-tip="Randomize">
                        <button aria-label="Randomize" onClick={ randomize } className="btn btn-sm btn-primary btn-outline py-0"><FaRandom className="h-4 w-4"/></button>
                    </li>
                    <li className="tooltip tooltip-bottom" data-tip="Live">
                        <button aria-label="Toggle Live Controls" onClick={ toggleLive } className={`btn btn-sm ${ bottomDrawer ? 'btn-accent' : 'btn-primary' } btn-outline py-0`}>
                            { bottomDrawer ? <MdPianoOff className="h-5 w-5"/> : <MdPiano className="h-5 w-5"/>}
                        </button>
                    </li>
                    <li className="tooltip tooltip-bottom" data-tip="Settings">
                        <button aria-label="Settings" onClick={ openSettings } className="btn btn-sm btn-primary btn-outline py-0"><FaCog className="h-4 w-4"/></button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header