import React, { useState } from "react";
import axios from "axios";

const AddSongForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    album: "",
    artist: "",
    image: null,
    file: null,
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post("/api/addsong", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        desc: "",
        album: "",
        artist: "",
        image: null,
        file: null,
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding song.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Song</h2>

      {message && (
        <p
          className={`text-center mb-4 ${loading ? "text-blue-500" : "text-red-500"}`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Song Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Album</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Artist</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Upload Audio File</label>
          <input
            type="file"
            name="file"
            accept="audio/*"
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {loading ? "Adding..." : "Add Song"}
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
