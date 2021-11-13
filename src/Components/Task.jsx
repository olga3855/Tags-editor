import React from "react";

const Task = (props) => {
    return (
        <div>
            {props.dats.map(item => {
                return (
                    <div key={item.key} >
                        <div>
                            {!item.editMode &&
                            <div className='notes'>
                                <div className='someNote'>{item.text}</div>
                                <div>
                                    <button onClick={() => props.activateEditMode(item.text, item.key)}
                                            className='changeNote'>Edit
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => props.delPost(item.key)} className='delNote'>X</button>
                                </div>
                            </div>}

                            {item.editMode &&
                            <div className="someText editMode">
                                <input id={item.key} value={props.value} onChange={props.handleChange}
                                       onBlur={() => props.deactivateEditMode(item.key, item.text)}
                                       autoFocus={true}
                                       />
                            </div>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Task;