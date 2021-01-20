import React, { useRef, useEffect } from 'react';

export function Pitch(props) {
    const pitch = useRef(null);

    useEffect( () => {
    })

    return  (
        <div className="pitch-wrapper">
            <div ref={pitch} className="pitch">
                <div className="indicator"></div>
            </div>
        </div>
    )
}

Pad.defaultProps = {
};