import { useState } from "react"

const Togglable = ({
    children,
    closedButtonLabel,
    openedButtonLabel
}) => {

    const [visible, setVisble] = useState(false)

    const toggleVisibility = () => {
        setVisble(!visible)
    }

    return (
        <>
            <span style={{ display: !visible ? '' : 'none' }}>
                <button onClick={toggleVisibility}>{closedButtonLabel}</button>
            </span>
            <div style={{ display: visible ? '' : 'none' }}>
                {children}
                <button onClick={toggleVisibility}>{openedButtonLabel}</button>
            </div>
        </>
    )
}

export default Togglable
