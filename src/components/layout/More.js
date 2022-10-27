import Switch from "../controls/Switch";
import {useLayout} from "../../hooks/useLayout";

const More = () => {    
  
    const { bottomDrawer, setBottomDrawer } = useLayout();

    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MORE</h2>
            <div className="flex justify-around gap-8 py-2">
                <Switch label="Randomize" isMomentary={true} />
                <Switch label="Keyboard" isActive={bottomDrawer} onChange={setBottomDrawer}  />
                <Switch label="Sequencer" isMomentary={true} />
            </div>
        </section>
    )
}

export default More;