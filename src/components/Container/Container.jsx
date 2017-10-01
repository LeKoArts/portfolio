import React from "react";
import cx from "classnames";
import styles from "./Container.module.scss";

export default class Container extends React.Component {
    render() {
        const { children } = this.props;
        const classes = cx(styles.container, this.props.styleName);
        return (
            <div className={classes}>
                {children}
            </div>
        );
    }
}