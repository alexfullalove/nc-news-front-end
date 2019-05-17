import React from "react";

const ErrorCard = ({ error: { message, status }, location }) => {
  return (
    <div className="error">
      <h1>{(location.state && location.state.status) || status}</h1>
      {location.state && location.state.from && (
        <h2>
          {location.state && location.state.status === 400
            ? "bad request"
            : "not found"}
        </h2>
      )}
      {!location.state && <h2>{message}</h2>}
    </div>
  );
};

export default ErrorCard;
