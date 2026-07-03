
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addplace } from "../redux/placeslice";

const AddPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", country: "", notes: "",image:null,imagePreview:"" });//imagepreview also used for upload image
  const [msg, setMsg] = useState("");

  const handlefunction = (e) => {
    e.preventDefault();

    if (form.name.trim() === "") {
      setMsg("⚠️ Please enter a place name.");
      return; 
    }
    if (form.country.trim() === "") {
      setMsg("⚠️ Please enter a country name.");
      return; 
    }if (form.notes.trim() === "") {
      setMsg("⚠️ Please enter a sentence about it.");
      return; 
    }
    if (!form.image) 
      return 
    setMsg("⚠️ Please upload an image.");


   dispatch(addplace({ 
      ...form, 
      image: form.imagePreview //added for upload image
    }))
    setMsg("")
    navigate("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6 py-12">

      <div className="bg-ivory p-8 md:p-10 rounded-2xl shadow-premium w-full max-w-md border border-gold/20">

        <p className="text-gold text-xs tracking-[0.4em] uppercase text-center mb-2">
          New Destination
        </p>
        <h2 className="font-serif text-3xl font-semibold text-center text-ink mb-8">
          Add a Place
        </h2>

        <form onSubmit={handlefunction} className="space-y-4">
          <input
            placeholder="Enter place name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-ink/10 rounded-lg text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
          />

          <input
            placeholder="Enter country name"
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-ink/10 rounded-lg text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
          />

          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-ink/10 rounded-lg text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"

          ></textarea>

          {/* <input
            placeholder="image URL"
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition"
          /> */}
          <input
            type="file"   //added for upload image
            accept="image/*"
            onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setForm({
                        ...form,
                        image: file,
                        imagePreview: URL.createObjectURL(file),//added for upload image
                      });
                    }
                  }}
            className="w-full px-4 py-3 bg-white border border-ink/10 rounded-lg text-ink/70 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-gold file:text-ink file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition"
          />

              {/* added for upload image */}
          {form.imagePreview && (
            <div className="mt-4">
              <img
                src={form.imagePreview} //added for upload image
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg shadow-md border border-gold/20"
              />
            </div>
          )}


          <button
            type="submit"
            className="w-full bg-ink text-gold py-3 rounded-full font-semibold tracking-wide shadow-lg hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            Add to Wishlist
          </button>

          { <p className="text-red-600 text-sm text-center">{msg}</p>}

        </form>
      </div>
    </div>
  );
};

export default AddPlace;
