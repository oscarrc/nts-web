import { useModal } from "../hooks/useModal";

const Banks = () => {
    const { handleModal } = useModal();
    
    const close = (e) => {
        e.preventDefault();
        handleModal();
    }

    return (
        <div className="card w-full max-w-lg bg-neutral shadow-xl overflow-visible">
            <div className="card-body">
                <h2 className="card-title divider divider-primary">Rename Banks</h2>
                <p className="italic text-center pb-4 pt-2 text-secondary">Click on any bank to rename it</p>
                <form className="grid grid-cols-2 gap-4 mt-2">       
                    { [...Array(16).keys()].map((k) => {                        
                        const name = JSON.parse(localStorage.getItem(`BANK_${k}`))?.name

                        return (
                            <div className="px-2" key={k}>
                                <input type="text" defaultValue={ name || `Bank ${k}` } className="bg-neutral w-full text-center bg-grid font-sevenSegment input-sm text-xl p-1 text-accent outline focus:outline-base-100 focus:outline-offset-1 focus:outline-1 focus:border-none border-none focus:ring-0 outline-base-100 outline-offset-1 outline-1 px-2" />
                            </div>
                        )
                    }) }             
                    <div className="card-actions justify-end gap-2 mt-4 col-span-2">
                        <button onClick={ close } className="btn btn-sm btn-primary btn-outline">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Banks