"use client";

import TimeAgo from "react-timeago";

const ReactTimeAgo = ({ createdAt } : {createdAt: Date}) => {
  return <TimeAgo date={createdAt} />;
};

export default ReactTimeAgo;
