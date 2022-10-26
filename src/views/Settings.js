import Dropdown from "../components/controls/Dropdown";
import { useModal } from "../hooks/useModal";

const Settings = () => {
    const { handleModal } = useModal();

    return (
        <div className="card w-full max-w-lg bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="card-title divider divider-primary">MIDI Settings</h2>
                    <form className="flex flex-col">
                    <div>
                        <h3 className="divider text-secondary">Input</h3>  
                        <Dropdown label="Device" />
                        <Dropdown label="Channel" />
                    </div>
                    <div>
                        <h3 className="divider text-secondary">Output</h3>  
                        <Dropdown label="Device" />
                        <Dropdown label="Channel" />                      
                    </div>
                    <div>
                        <h3 className="divider text-secondary">Passthrough</h3>  
                        <Dropdown label="Device" />
                        <Dropdown label="Channel" />                      
                    </div>
                    <div className="card-actions justify-end gap-2 mt-4">
                        <button type="button" onClick={ () => handleModal() } className="btn btn-sm btn-ghost text-secondary">Cancel</button>
                        <button className="btn btn-sm btn-primary btn-outline">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings