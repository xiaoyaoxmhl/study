import React from "react";

export default function $id({ match }) {
  return (
    <div>
      {match.params.id}
      {match.params.oid}
    </div>
  );
}
