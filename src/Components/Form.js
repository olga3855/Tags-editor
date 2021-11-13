import React, {useState} from "react";
import Post from "./Post";

const Form = () => {
    const [state, setState] = useState({
        value: "",
        tag: "",
        dats: [],
        note: [],
        currentTags: [],
        json: null,
        isActive: false,
        currentData: {
            text: "",
            key: "",
            editMode: false
        }
    })

    const noteChange = (e) => {
        setState({
            ...state,
            tag: e.target.value
        });
    };

    const searchTag = (e) => {
        e.preventDefault();
        let dats = state.dats;
        let indexOfStevie = dats.findIndex(item => item.text.toLowerCase().includes(state.tag));
        dats.unshift(dats[indexOfStevie]);
        dats.splice(indexOfStevie + 1, 1);
        setState({
            ...state,
            dats: dats,
            tag: ""
        });
    };

    const delHashtag = (delTag) => {
        setState({
            ...state,
            note: state.note.filter((tag) => tag !== delTag)
        });
    };

    const handleChange = (e) => {
        setState({
            ...state,
            value: e.target.value,
            currentData: {
                text: e.target.value,
                key: Date.now(),
                editMode: false
            },
            currentTags: e.target.value.match(/(#[a-z\d-]+)/gi) || []
        });
    };

    const tagCloud = (savedTags, currentTags) => {
        return [...new Set([...savedTags, ...currentTags])];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.value !== "") {
            let myJson = {
                dats: state.dats,
                note: state.note
            };
            const newDats = [...state.dats, state.currentData];
            setState({
                ...state,
                json: JSON.stringify(myJson),
                dats: newDats,
                note: tagCloud(state.note, state.currentTags),
                currentTags: [],
                value: ""
            });
        }
    };

    const delPost = (key) => {
        const filterTask = state.dats.filter((item) => item.key !== key);
        setState({
            ...state,
            dats: filterTask
        });
    };

    const activateEditMode = (text, key) => {
        const dats = state.dats;
        if (text) {
            dats.forEach((item) => {
                if (item.key === key) {
                    item.text = text;
                    item.editMode = !item.editMode;
                }
            });
        }
        let act = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i].charAt(0) === "#") {
                act = true;
            }
        }
        setState({
            ...state,
            dats: dats,
            value: text,
            isActive: act
        });
    };

    const deactivateEditMode = (key, text) => {
        if (state.value) {
            const dats = state.dats;
            if (text) {
                dats.forEach((item) => {
                    if (item.key === key) {
                        item.editMode = false;
                        item.text = state.value;
                    }
                });
                setState({
                    ...state,
                    dats: dats,
                    value: "",
                    isActive: false
                });
            }
        }
    };


    return (
        <div>
            <Post
                isActive={state.isActive}
                value={state.value}
                note={tagCloud(state.note, state.currentTags)}
                tag={state.tag}
                dats={state.dats}
                handleChange={handleChange}
                delHashtag={delHashtag}
                delPost={delPost}
                activateEditMode={activateEditMode}
                deactivateEditMode={deactivateEditMode}
                handleSubmit={handleSubmit}
                searchTag={searchTag}
                noteChange={noteChange}
            />
        </div>
    );
}

export default Form;