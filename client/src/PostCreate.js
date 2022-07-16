import React from "react";

function PostCreate() {
  return (
    <div>
      <form>
        <div className="form-group">
          <label> Title </label>
          <input className="form-control" />
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
