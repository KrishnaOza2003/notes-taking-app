import React, { useEffect } from "react";
import logo from "../assets/Screenshot 2023-12-13 at 6.37.40 PM.png";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";
function Header({ notes, setNotes, originalNotes }) {
  const searchTerm = useSelector((state) => state?.searchTerm?.searchTerm);
  const dispatch = useDispatch();

  

  const handleSearch = () => {
    const newNotes = notes.filter((note) =>
      note?.data?.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setNotes(newNotes);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearch();
    }
    else {
      setNotes(originalNotes);
      window.location.reload();
    }
  }, [searchTerm]);
  return (
    <div className=" border-b-[0.5px] border-b-[#5f6368] flex items-center justify-around p-3 mb-4 ">
      <img src={logo} alt="" height={150} width={150} />

      <div className=" bg-[#525356] p-3 rounded-lg flex items-center justify-start gap-3 w-96">
        <CiSearch className=" text-3xl" />

        <input
          value={searchTerm}
          onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
          type="text"
          placeholder="Search"
          className=" bg-transparent text-3xl outline-none border-none text-[#9b9c9d]"
        />
      </div>
    </div>
  );
}

export default Header;
