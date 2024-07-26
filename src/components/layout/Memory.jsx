import { useNTS } from "../../hooks/useNTS";

const Memory = () => {      
    const { bank, setBank, bankNames } = useNTS();

    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MEMORY</h2>
            <div className="grid grid-cols-4 grid-rows-4 w-full px-2 gap-2">
                { [...Array(16).keys()].map((k) => {
                    return <button aria-label={`Select bank ${k}`} key={k} onClick={() => setBank(k) } className={`block truncate btn btn-ghost btn-pushable border-secondary text-secondary btn-xs ${bank === k ? "btn-pushed" : ""}`}>{ bankNames?.[k] || `Bank ${k}`}</button>
                }) }
            </div>
        </section>
    )
}

export default Memory;