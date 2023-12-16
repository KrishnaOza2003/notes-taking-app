import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { forwardRef } from "react";
import * as React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";

import toast from "react-hot-toast";

import { db } from "../config/firebase";

import { Button, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Note = forwardRef(({ id, title, noteText}, ref) => {
  const [open, setOpen] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState(title);
  const [noteTextContent, setNoteTextContent] = React.useState(noteText);
  const [isPinned, setIsPinned] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateNote = async (id) => {
    const loading = toast.loading('Saving ...');
    try {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, {
        title: noteTitle,
        noteText: noteTextContent,
      });
      toast.remove(loading);
      toast.success("Note Updated Successfully !");
    } catch (error) {
      toast.error("Failed to Update !");
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    const loading = toast.loading("Deleting Note ...");
    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
      console.log("Note deleted successfully", noteRef);
      toast.success("Note Deleted Successfully!");
      toast.remove(loading);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div
      ref={ref}
      className=" max-w-md flex flex-col mt-10 border-[#9b9c9d] p-4 border-2 items-start justify-between gap-4 rounded-xl"
    >
      <div className=" flex items-center gap-2 ">
        <h1 className=" flex-1 bg-transparent font-semibold outline-none border-none text-xl text-[#9b9c9d]">
          {noteTitle}
        </h1>
        <MdOutlinePushPin onClick={() => setIsPinned(!isPinned)} className={isPinned ? ' text-bgcolor bg-gray-50 cursor-pointer rounded-full text-lg' : 'cursor-pointer rounded-full hover:text-bgcolor hover:bg-gray-50 text-lg'}/>
      </div>

      <p className="bg-transparent text-xs outline-none border-none text-[#9b9c9d] overflow-y-scroll break-normal">
        {noteTextContent}
      </p>
      <div className=" flex items-center justify-center gap-2">
        <React.Fragment>
          <MdOutlineEdit
            onClick={handleClickOpen}
            className=" cursor-pointer rounded-full hover:text-bgcolor hover:bg-gray-50 text-base "
          />

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <Input
              sx={{ m: 2, p: 2 }}
              id="customized-dialog-title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            ></Input>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <textarea
                value={noteTextContent}
                onChange={(e) => setNoteTextContent(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={(e) => {
                  e.preventDefault();
                  updateNote(id);
                  handleClose();
                }}
              >
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>

        <MdDeleteOutline
          onClick={() => {
            deleteNote(id);
          }}
          className=" cursor-pointer rounded-full hover:text-bgcolor hover:bg-gray-50 text-lg"
        />
      </div>
    </div>
  );
});

export default Note;
