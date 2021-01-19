import React, { useRef, useEffect } from 'react';

export function Pad(props) {
    const pad = useRef(null);

    useEffect( () => {
    })

    return  (
        <div className="pad-wrapper">
            <div ref={pad} className="pad">
                <div className="indicator"></div>
            </div>
        </div>
    )
}

Pad.defaultProps = {
};