// AddBlog.jsx
import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // important for editor styling
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Helper function to structure AI content
  const structureGeneratedBlog = ({ title, subTitle, rawContent }) => {
    const description = rawContent
      .split(/\n{1,}/) // split on empty lines
      .map((p) => `<p>${p.trim()}</p>`)
      .join("");

    return {
      title,
      subTitle,
      author: "Admin",
      image: "", // optional, user can upload separately
      description,
    };
  };

  const generateContent = async () => {
    if (!title.trim() || !subTitle.trim()) {
      toast.error(
        "Please fill in both Title and Subtitle before generating content."
      );
      return;
    }

    toast.loading("Generating content…", { id: "genContent" });

    try {
      const promptText = `Write a well-structured blog article with the following:
Title: "${title}"
Subtitle: "${subTitle}"
Use a strong introduction, multiple body sections with headings, and a clear conclusion. Use an engaging yet professional tone.`;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

      const body = {
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
        generationConfig: { maxOutputTokens: 2000 },
        systemInstruction: {
          role: "system",
          parts: [
            {
              text: "You are a professional blog-writer AI. Output a blog article that is ready to be inserted.",
            },
          ],
        },
      };

      const resp = await fetch(endpoint + `?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Gemini API error: ${resp.status} ${errText}`);
      }

      const data = await resp.json();
      const generated = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generated) throw new Error("No content returned from Gemini API");

      // Structure the content
      const structuredBlog = structureGeneratedBlog({
        title,
        subTitle,
        rawContent: generated,
      });

      // Insert structured HTML into Quill editor
      if (quillRef.current) {
        quillRef.current.root.innerHTML = structuredBlog.description;
      }

      toast.success("Content generated and structured!", { id: "genContent" });
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content.", { id: "genContent" });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("image", image);
      formData.append("blog", JSON.stringify(blog));

      const token = localStorage.getItem("token");

      const response = await axios.post("/api/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Blog added successfully!");
        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Axios post error:", error);
      toast.error("Error adding blog!");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  return (
    <div className="flex-1 text-gray-700 min-h-screen overflow-y-auto">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 md:p-10 my-10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Blog
        </h2>

        {/* Thumbnail Upload */}
        <div className="mb-6">
          <p className="font-medium">Upload Thumbnail</p>
          <label
            htmlFor="image"
            className="block mt-2 cursor-pointer w-40 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md hover:bg-gray-50 transition"
          >
            <img
              className="h-20 object-cover rounded"
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Thumbnail"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="font-medium">Blog Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter blog title"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label className="font-medium">Sub Title</label>
          <input
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
            type="text"
            placeholder="Enter blog subtitle"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        {/* Blog Description */}
        <div className="mb-6 relative">
          <label className="font-medium">Blog Description</label>
          <div
            ref={editorRef}
            className="mt-2 border border-gray-300 rounded-md min-h-[200px]"
          ></div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs bg-indigo-600 text-white px-4 py-1.5 cursor-pointer rounded hover:bg-indigo-700 transition"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="font-medium">Blog Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">Select Category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer accent-indigo-500"
          />
          <label className="text-gray-700">Publish Now</label>
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          type="submit"
          className={`w-full sm:w-40 h-10 rounded-md text-white text-sm transition ${
            isAdding
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
