import React from "react";
import Task from "./Task";
import HashTag from "./HashTag";

const Post = (props) => {
    return (
        <div className="Post">
            <form className="someText">
          <textarea
              value={props.value}
              onChange={props.handleChange}
              placeholder="Enter text"
          >
          </textarea>
                <button className="save" onClick={props.handleSubmit}>
                    Save
                </button>
            </form>
            <form className="searchTag">
                <input
                    placeholder="Find #"
                    value={props.tag}
                    onChange={props.noteChange}
                />
                <button className="tagButton" onClick={props.searchTag}>
                    Find
                </button>
            </form>
            <div className="listBox">
                <Task
                    value={props.value}
                    handleChange={props.handleChange}
                    delPost={props.delPost}
                    activateEditMode={props.activateEditMode}
                    deactivateEditMode={props.deactivateEditMode}
                    dats={props.dats}
                />
                <div className="containerNote">
                    <HashTag
                        isActive={props.isActive}
                        dats={props.dats}
                        note={props.note}
                        delHashtag={props.delHashtag}
                    />
                </div>

            </div>
        </div>
    );
}

export default Post;
