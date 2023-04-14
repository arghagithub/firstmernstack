import React from "react";

const Alert = (props) => {
  return (
    props.alert && (
      <div className="container my-3">
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`}
          role="alert"
        >
           {props.alert.message}
        </div>
      </div>
    )
  );
};

export default Alert;
