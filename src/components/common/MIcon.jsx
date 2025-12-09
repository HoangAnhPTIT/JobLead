"use client";
import classNames from "classnames";

const MIcon = ({ name, className, ...rest }) => {
    return (
        <span className={classNames("material-symbols-outlined", className)} {...rest}>
            {name}
        </span>
    );
};

export default MIcon;
