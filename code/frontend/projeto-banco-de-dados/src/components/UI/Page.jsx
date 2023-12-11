import classes from "./Page.module.css";

const Page = (props) => {
    return <div className={classes["page-box"]}>
        <h2 className={classes["page-header"]}>{props.title}</h2> 
        {props.children}
    </div>
}

export default Page;