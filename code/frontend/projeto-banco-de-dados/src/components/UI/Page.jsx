import classes from "./Page.module.css";

const Page = (props) => {
    return <div className={classes["page-box"]}>
        {props.children}
    </div>
}

export default Page;