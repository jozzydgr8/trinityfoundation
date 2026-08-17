import { JSX } from "react"

type props = {
    title?:string,
    type?:'submit'|'button',
    onClick?:()=>void,
    className?:string,
    disabled?: boolean,
    children?: JSX.Element,
     icon?: JSX.Element,
      iconTwo?: JSX.Element,
}
export const FlatButton = ({title, onClick, className, disabled, children, icon, iconTwo, type}:props)=>{
    return(
        <button className={`btn btn-lg  ${className}`} onClick={onClick} disabled={disabled} type={type} >{iconTwo} {title} {children} {icon}</button>
    )
}