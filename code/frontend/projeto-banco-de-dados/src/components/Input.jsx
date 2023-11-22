import classes from "./Input.module.css";

const Input = ({ selector, selectorList, newClasses, label, id, error, ...props }) => {
  const classesStr = `${classes.control} ${classes["no-margin"]} ${
    newClasses && newClasses
  }`;

  return (
    <div className={classesStr}>
      {label && <label htmlFor={id}>{label}</label>}
      {!selector && <input id={id} {...props} />}
      {selector && (
        <select id={id} {...props}>
          {selectorList.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      )}
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
