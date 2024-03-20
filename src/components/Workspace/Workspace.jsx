import css from "./Workspace.module.css";

export default function Workspace ({children}){
    return(
        <div className={css.workspace}>
            {children}
        </div>
    )
}