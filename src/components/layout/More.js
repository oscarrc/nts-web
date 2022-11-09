import Switch from "../controls/Switch";
import {useLayout} from "../../hooks/useLayout";
import { useNTS } from "../../hooks/useNTS";

const More = () => {      
    const { bottomDrawer, setBottomDrawer } = useLayout();
    const { randomize } = useNTS();

    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MORE</h2>
            <div className="flex justify-around gap-4 py-2 px-4">
                <Switch label="Randomize" isMomentary={true} onChange={ (v) => {v && randomize()} } />
                <Switch label="Keyboard" isActive={bottomDrawer} onChange={setBottomDrawer}  />
                {/* <Switch label="Sequencer" isMomentary={true} /> */}
            </div>
        </section>
    )
}

export default More;