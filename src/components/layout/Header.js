import { FaCog, FaFile, FaRandom, FaSave } from "react-icons/fa"
import { MdPiano, MdPianoOff } from "react-icons/md"
import { lazy, useRef } from "react";

import { GiMetronome } from "react-icons/gi"
import Tempo from "../../components/controls/Tempo";
import korg from '../../assets/korg.svg';
import { useLayout } from "../../hooks/useLayout";
import { useMidi } from "../../hooks/useMidi";
import { useModal } from "../../hooks/useModal";
import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Header = () => {
    const { handleModal } = useModal();
    const dataSelectorRef = useRef(null);
    const bankSelectorRef = useRef(null);
    const seqSelectorRef = useRef(null);
    const { restoreBank, randomize, bank, bankNames } = useNTS();
    const { bottomDrawer, setBottomDrawer } = useLayout();
    const { tempo, setTempo } = useMidi();
    const { setSequence } = useSequencer();

    const openRenameBanks = () => {
        const Banks = lazy(() => import('../../views/Banks'));
        handleModal(<Banks />);
    }

    const openSettings = () => {
        const Settings = lazy(() => import('../../views/Settings'));
        handleModal(<Settings />);
    }

    const toggleLive = () => setBottomDrawer(b => !b);

    const downloadFile = (data, extension, name) => { 
        const contentType = `application/${extension}+json;charset=utf-8;`;

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, `${name}.${extension}`);
        } else {
            let a = document.createElement('a');
            a.download = `${name}.${extension}`;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    const loadFile = (e) => {        
        return new Promise((resolve, reject) => {            
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                resolve(data)
            };
            
            reader.onerror = reject;    
            reader.readAsText(file);
        })
    }

    const importData = async (e) => {
        const data = await loadFile(e);
        Object.keys(data.bank).forEach(b => restoreBank(b, data.bank[b]))
        if(data.seq) setSequence(data.seq);
    }

    const importBank = async (e) => { 
        const data = await loadFile(e);
        restoreBank(bank, data)
    };
    
    const importSequence = async (e) => {
        const data = await loadFile(e);
        setSequence(data)
    };

    const exportData = () => {
        const data = {
            bank: [],
            seq: {}
        };
        
        [...Array(15).keys()].forEach( (b) => {
            const bank = JSON.parse(localStorage.getItem(`BANK_${b}`));
            
            if(bank) data.bank[b] = {
                name: bankNames?.[b],
                values: bank
            };
        });

        const seq = JSON.parse(localStorage.getItem(`SEQ`));
        if(seq) data.seq = seq;
        
        downloadFile(data, "ntsweb", "DATA");
    }

    const exportBank = () => {
        const data = {
            name: bankNames?.[bank],
            values: JSON.parse(localStorage.getItem(`BANK_${bank}`))
        }
        
        downloadFile(data, "ntsbank", data?.name || `BANK_${bank}`);
    }

    const exportSequence = () => {
        const data = JSON.parse(localStorage.getItem(`SEQ`));
        downloadFile(data, "ntsseq", `SEQUENCE`);
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
                <ul className="menu menu-horizontal p-0 gap-4">
                    <li className="tooltip tooltip-bottom dropdown" data-tip="File"> 
                        <label aria-label="Import" role="button" tabIndex="0" className="btn btn-sm btn-primary btn-outline py-0"><FaFile className="h-4 w-4"/></label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow-lg bg-neutral text-secondary rounded">
                            <li>                                
                                <input onChange={ importData } ref={ dataSelectorRef } type="file" className="hidden" accept=".ntsweb"/>
                                <button className="btn-sm" onClick={ () => dataSelectorRef.current.click() } aria-label="Open file">Open file</button>
                            </li>
                            <li> 
                                <input onChange={ importBank } ref={ bankSelectorRef } type="file" className="hidden" accept=".ntsbank"/>
                                <button className="btn-sm" onClick={ () => bankSelectorRef.current.click() } aria-label="Load bank">Load bank</button>
                            </li>
                            <li> 
                                <input onChange={ importSequence } ref={ seqSelectorRef } type="file" className="hidden" accept=".ntsseq"/>
                                <button className="btn-sm" onClick={ () => seqSelectorRef.current.click() } aria-label="Load sequence">Load sequence</button>
                            </li>
                            <li> 
                                <button className="btn-sm" onClick={ openRenameBanks } aria-label="Manage banks">Rename banks</button>
                            </li>
                        </ul>
                    </li>
                    <li className="tooltip tooltip-bottom dropdown" data-tip="Save"> 
                        <label aria-label="Export" role="button" tabIndex="0" className="btn btn-sm btn-primary btn-outline py-0"><FaSave className="h-4 w-4"/></label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow-lg bg-neutral text-secondary rounded">
                            <li><button className="btn-sm" onClick={ exportData } aria-label="Export all">Save All</button></li>
                            <li><button className="btn-sm" onClick={ exportBank } aria-label="Export current bank">Current bank</button></li>
                            <li><button className="btn-sm" onClick={ exportSequence } aria-label="Export current bank">Sequence</button></li>
                        </ul>
                    </li>
                    <li className="tooltip tooltip-bottom" data-tip="Randomize">
                        <button aria-label="Randomize" onClick={ randomize } className="btn btn-sm btn-primary btn-outline py-0"><FaRandom className="h-4 w-4"/></button>
                    </li>
                    <li className="tooltip tooltip-bottom dropdown" data-tip="Tempo"> 
                        <label aria-label="Tempo" role="button" tabIndex="0" className="btn btn-sm btn-primary btn-outline py-0"><GiMetronome className="h-5 w-5"/></label>
                        <div tabIndex="0" className="dropdown-content shadow-lg bg-neutral text-secondary rounded">
                            <Tempo tempo={tempo} onChange={setTempo} />
                        </div>
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