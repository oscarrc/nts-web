const Message = ({ message }) => {
    return (
        <div className="flex h-full flex-col justify-center text-center items-center gap-2">
            <h3>{ message.title }</h3>
            <p>{ message.text }</p>
        </div>
    )
}

export default Message