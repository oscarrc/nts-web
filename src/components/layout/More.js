import Switch from "../controls/Switch";

const More = () => {
    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MORE</h2>
            <div className="flex justify-around gap-8 py-2">
                <Switch label="Randomize" isMomentary={true} />
                <Switch label="Sequencer" isMomentary={true} />
            </div>
        </section>
    )
}

export default More;