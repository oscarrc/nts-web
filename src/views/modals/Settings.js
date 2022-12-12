import Dropdown from "../../components/controls/Dropdown";
import { channelList } from "../../config/midi";
import { useLayout } from "../../hooks/useLayout";
import { useMidi } from "../../hooks/useMidi";

const Settings = () => {
    const { devices, setDevices, channels, setChannels, parseDevices } = useMidi();
    const { handleModal } = useLayout();
    
    const close = (e) => {
        e.preventDefault();
        handleModal();
    }

    const rescan = (e) => {        
        e.preventDefault();
        parseDevices();
    }

    return (
        <div className="card w-full max-w-lg bg-neutral shadow-xl overflow-visible">
            <div className="card-body">
                <h2 className="card-title divider divider-primary">MIDI Settings</h2>
                    <form className="flex flex-col">
                    <div>
                        <h3 className="divider text-secondary">NTS Input</h3>
                        <Dropdown label="Device" 
                            options={ devices.inputDevices.map( d => d.name ) }
                            value={ devices.input }
                            onChange={ (value) => setDevices({ type: "Input", payload: value }) } 
                        />
                        <Dropdown 
                            label="Channel" 
                            options={ channelList } 
                            value={ channels.input } 
                            onChange={ (value) => setChannels({ type:"Input", payload: value }) } 
                        />
                    </div>
                    <div>
                        <h3 className="divider text-secondary">NTS Output</h3>  
                        <Dropdown label="Device" 
                            options={ devices.outputDevices.map( d => d.name ) }
                            value={ devices.output }
                            onChange={ (value) => setDevices({ type: "Output", payload: value }) }
                        />
                        <Dropdown 
                            label="Channel" 
                            options={ channelList } 
                            value={ channels.output } 
                            onChange={ (value) => setChannels({ type:"Output", payload: value }) } 
                        />                     
                    </div>
                    <div>
                        <h3 className="divider text-secondary">Passthrough</h3>  
                        <Dropdown label="Device" 
                            options={ devices.passthroughDevices.map( d => d.name ) }
                            value={ devices.passthrough }
                            onChange={ (value) => setDevices({ type: "Passthrough", payload: value }) }
                         />
                        <Dropdown 
                            label="Channel" 
                            options={ channelList } 
                            value={ channels.passthrough } 
                            onChange={ (value) => setChannels({ type:"Passthrough", payload: value }) } 
                        />                        
                    </div>
                    <div className="card-actions justify-end gap-2 mt-4">
                        <button onClick={ rescan } className="btn btn-sm btn-primary btn-link no-underline">Re-scan</button>
                        <button onClick={ close } className="btn btn-sm btn-primary btn-outline">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings