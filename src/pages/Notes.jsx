import React, { useState, useEffect } from "react";
import Button from "../Other components/Button";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add / Update Note
  const handleSave = () => {
    if (!currentNote.title || !currentNote.content) return;

    if (currentNote.id) {
      // Edit
      setNotes(notes.map((n) => (n.id === currentNote.id ? currentNote : n)));
    } else {
      // Add
      setNotes([
        ...notes,
        { ...currentNote, id: Date.now(), createdAt: new Date() },
      ]);
    }

    setShowModal(false);
    setCurrentNote(null);
  };

  // Delete Note
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Filter notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>

          <p className="text-sm text-gray-500 mt-1">
            Organize your thoughts and ideas
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search notes..."
            className="
          w-full sm:w-64
          px-4 py-2.5
          rounded-xl
          border border-gray-200
          bg-white
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-purple-400
        "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Button */}
          <div className="w-full sm:w-auto">
            <Button onClick={() => setShowModal(true)} content="Add Note" />
          </div>
        </div>
      </div>

      {/* 🧾 Notes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg text-gray-800">
              {note.title}
            </h2>

            <p className="text-gray-500 text-sm mt-2 line-clamp-3">
              {note.content}
            </p>

            <p className="text-xs text-gray-400 mt-3">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedNote(note)}
                className="text-green-500 text-sm"
              >
                View
              </button>
              <button
                onClick={() => {
                  setCurrentNote(note);
                  setShowModal(true);
                }}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📝 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-5 md:px-0">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              {currentNote?.id ? "Edit Note" : "Add Note"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-3"
              value={currentNote?.title || ""}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, title: e.target.value })
              }
            />

            <textarea
              placeholder="Write your note..."
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={currentNote?.content || ""}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, content: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowModal(false)}
                content="Cancel"
                className=" bg-zinc-700 hover:bg-zinc-800"
              />

              <Button onClick={handleSave} content="Save" />
            </div>
          </div>
        </div>
      )}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-5 md:px-0 z-50">
          <div className="bg-white p-6 rounded-2xl w-[500px] max-h-[80vh] overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedNote.title}
            </h2>

            <p className="text-xs text-gray-400 mb-4">
              {new Date(selectedNote.createdAt).toLocaleString()}
            </p>

            <p className="text-gray-700 whitespace-normal">
              {selectedNote.content}
            </p>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setSelectedNote(null)}
                content="Close"
                className=" bg-zinc-700 hover:bg-zinc-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
