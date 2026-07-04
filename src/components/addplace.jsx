
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addplace } from "../redux/placeslice";
import { CATEGORIES } from "../constants/categories";
import StarRating from "./StarRating";
import { geocodePlace } from "../utils/geocode";

const AddPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", country: "", notes: "",image:null,imagePreview:"", category: "other", rating: 0 });//imagepreview also used for upload image
  const [msg, setMsg] = useState("");
  const [locating, setLocating] = useState(false);

  const handlefunction = async (e) => {
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

    setLocating(true);
    const coords = await geocodePlace(form.name, form.country);
    setLocating(false);

   const { imagePreview, ...place } = form
   dispatch(addplace({
      ...place,
      image: form.imagePreview, //added for upload image
      lat: coords?.lat ?? null,
      lng: coords?.lng ?? null,
    }))
    setMsg("")
    navigate("/")
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-ink px-6 py-12">

      <button
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 md:left-10 md:top-10 border border-gold/40 text-ivory text-sm px-4 py-2 rounded-full hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300"
      >
        ← Back
      </button>

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

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-ink/10 rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <span className="text-sm text-ink/60">Rating</span>
            <StarRating
              value={form.rating}
              onChange={(rating) => setForm({ ...form, rating })}
              size="text-xl"
            />
          </div>

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
                      const reader = new FileReader();
                      reader.onload = () => {
                        setForm((prev) => ({
                          ...prev,
                          image: file,
                          imagePreview: reader.result, //base64 data URL so it survives persist/reload
                        }));
                      };
                      reader.readAsDataURL(file);
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
            disabled={locating}
            className="w-full bg-ink text-gold py-3 rounded-full font-semibold tracking-wide shadow-lg hover:bg-gold hover:text-ink transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait"
          >
            {locating ? "Locating on map..." : "Add to Wishlist"}
          </button>

          { <p className="text-red-600 text-sm text-center">{msg}</p>}

        </form>
      </div>
    </div>
  );
};

export default AddPlace;
