import React from "react";
import './Styles/Button.css'
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary--nav', 'btn--outline--nav', 'btn--primary--scr', 'btn--outline--scr', 'btn--primary--logsign'];
const SIZES = ['btn--medium', 'btn--large'];
const TRANS = ['btn--nav', 'btn--scr', 'btn--logsign'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonTrans,
    buttonPath
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize)? buttonSize : SIZES[0];
    const checkButtonTrans = TRANS.includes(buttonTrans)? buttonTrans : TRANS[0];

    return(
        <Link to={buttonPath} className="btn-mobile">
            <button 
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonTrans}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
}