import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import Notes from "./components/Notes";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./config/firebase";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const searchTerm = useSelector((state) => state?.searchTerm?.searchTerm);
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  var originalNotes = [];

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("timestamp", "asc"));

    

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      originalNotes = newNotes;
      setNotes(newNotes);
    });

    return () => unsubscribe();
  }, []);

  const indexOfLastPost = currentPage * notesPerPage;
  const indexOfFirstPost = indexOfLastPost - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (e, p) => {
    setCurrentPage(p);
  }


  return (
    <div className="bg-bgcolor text-white h-screen w-screen ">
      <Toaster position="top-right" reverseOrder={false} />
      <Header notes={notes} setNotes={setNotes} originalNotes={originalNotes}/>
      <div className="flex flex-col items-center justify-center gap-5">
        <Notes notes={currentNotes} />
        <Pagination className=" !bg-gray-600 !text-white !rounded-md" color={'primary'} count={Math.ceil(notes.length / notesPerPage)}  shape="rounded" onChange={handlePageChange}/>
      </div>
    </div>
  );
}

export default App;
