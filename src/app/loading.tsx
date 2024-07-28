import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Loading = () => {
  return (
    <div className="container flex w-full min-h-screen justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />{" "}
      {" "} Loading.......
    </div>
  );
};

export default Loading;
