import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Memory = ({ mode }) => {      
    const { setBank } = useNTS();
    const { setPattern } = useSequencer();

    const set = (n) => {
        mode === "synth" && setBank(n);
        mode === "seq" && setPattern();
    }

    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MEMORY</h2>
            <div className="grid grid-cols-4 grid-rows-4 w-full px-2 gap-2">
                { [...Array(16).keys()].map((k) => {
                    return <button key={k} onClick={() => set(k) } className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">{ mode === "synth" ? "Bank" : "Pattern"} {k}</button>
                }) }
            </div>
        </section>
    )
}

export default Memory;