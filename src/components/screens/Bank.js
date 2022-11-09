const Bank = ({ bank, setBank }) => {
    return (        
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="grid grid-cols-4 grid-rows-4 w-full text-center gap-2 p-2">
                {
                    [...Array(16).keys()].map( (k) => <button onClick={() => setBank(k)} className={`btn-ghost hover:bg-accent hover:text-neutral h-full w-full ${k === parseInt(bank) && 'bg-accent text-neutral'}`} key={k}>{k < 10 && 0 }{k}</button>)
                }
            </div>
        </div>
    )
}

export default Bank;