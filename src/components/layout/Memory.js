import {useLayout} from "../../hooks/useLayout";
import { useNTS } from "../../hooks/useNTS";

const Memory = () => {      
    const { bottomDrawer, setBottomDrawer } = useLayout();
    const { randomize } = useNTS();

    return (
        <section>
            <h2 className="divider divider-primary font-semibold">MEMORY</h2>
            <div className="grid grid-cols-4 grid-rows-3 gap-4 p-2">
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 1</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 2</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 3</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 4</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 5</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 6</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 7</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 8</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 9</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 10</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 11</button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs">Bank 12</button>
            </div>
        </section>
    )
}

export default Memory;