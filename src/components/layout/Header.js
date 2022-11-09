import { FaCog, FaFileExport, FaFileImport } from "react-icons/fa"
import { lazy, useRef } from "react";

import korg from '../../assets/korg.svg';
import { useModal } from "../../hooks/useModal";
import { verifyValues } from "../../config/synth";

const Header = () => {
    const { handleModal } = useModal();
    const selectorRef = useRef(null);

    const openSettings = () => {
        const Settings = lazy(() => import('../../views/Settings'));
        handleModal(<Settings />);
    }

    const selectData = () => selectorRef.current.click();

    const importData = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);

            Object.keys(data).forEach(b => {
                verifyValues(b) && localStorage.setItem(`BANK_${b}`, JSON.stringify(data[b]));
            })
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
        <header className="navbar flex-col gap-4 sm:flex-row">
            <div className="flex-1">
                <a href="/" className="flex items-end flex-wrap">
                    <img className="h-16 max-h-32 min-h-8 max-w-[10rem] w-full" src={korg} alt="Korg NTS-web" />
                    <strong className="-mb-1">NTS-Web</strong>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 gap-4">
                    <li className="max-sm:tooltip max-sm:tooltip-bottom" data-tip="Import">
                        <input onChange={ importData } ref={ selectorRef } type="file" className="hidden" accept=".ntsweb"/>
                        <button onClick={ selectData } className="btn btn-sm btn-primary btn-outline py-0"><FaFileImport className="h-4 w-4"/> <span className="hidden sm:inline">Import</span></button>
                    </li>
                    <li className="max-sm:tooltip max-sm:tooltip-bottom" data-tip="Export">
                        <button onClick={ exportData } className="btn btn-sm btn-primary btn-outline py-0"><FaFileExport className="h-4 w-4"/> <span className="hidden sm:inline">Export</span></button>
                    </li>
                    <li className="max-sm:tooltip max-sm:tooltip-bottom" data-tip="Settings">
                        <button onClick={ openSettings } className="btn btn-sm btn-primary btn-outline py-0"><FaCog className="h-4 w-4"/></button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header