import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Note from "./Note";
import FlipMove from "react-flip-move";
import toast from "react-hot-toast";

function Notes({notes}) {
  const [isTakeNotes, setIsTakeNotes] = useState(false);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  

  const addNote = async (e) => {
    e.preventDefault();
    setIsTakeNotes(false);
    setTitle("");
    setNoteText("");
    
    const loading = toast.loading('Adding ...');

    await addDoc(collection(db, "notes"), {
      title: title,
      noteText: noteText,
      timestamp: serverTimestamp(),
    });

    toast.remove(loading);
    toast.success('Note Added !');
    
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Add Note Input bar */}
      <div>
        {!isTakeNotes && (
          <div
            className="hover:bg-[#9b9c9d] hover:border-bgcolor hover:text-bgcolor flex items-center justify-evenly cursor-pointer text-2xl text-[#9b9c9d] bg-bgcolor border-[#9b9c9d] border-2 rounded-xl gap-2 p-2"
            onClick={() => setIsTakeNotes(!isTakeNotes)}
          >
            <FaPlus />
            Add a Note
          </div>
        )}

        {isTakeNotes && (
          <div className="">
            <form className="flex flex-col mt-10 border-[#9b9c9d] p-4 border-2 items-start justify-between gap-4 rounded-xl">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="bg-transparent font-semibold outline-none border-none text-lg text-[#9b9c9d]"
              />
              <textarea
                placeholder="Take a Note ..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                cols="30"
                rows="2"
                className="bg-transparent text-sm outline-none border-none text-[#9b9c9d]"
              ></textarea>
              <div className=" flex items-center justify-around gap-2">
      
                <button onClick={() => setIsTakeNotes(false)} type="submit" className="flex">
                  <MdCancel className="text-[#9b9c9d] rounded-full hover:bg-[#9b9c9d] hover:text-bgcolor text-xl" />
                </button>

                <button onClick={addNote} type="submit" className="flex">
                  <FaPlus className="text-[#9b9c9d] rounded-full hover:bg-[#9b9c9d] hover:text-bgcolor text-xl" />
                </button>

              </div>
            </form>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className=" grid grid-rows-2 grid-cols-3 gap-4 p-4 ">
        <FlipMove typeName={null}>
          {notes.map(({ id, data: { title, noteText } }) => (
            <div key={id}>
              <Note id={id} title={title} noteText={noteText} />
            </div>
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Notes;
