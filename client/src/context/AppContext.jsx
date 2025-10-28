import { Children, createContext, use, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import React from 'react';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blog, setBlog] = useState([]);
  const [input , setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/blog/all');
      data.success ? setBlog(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const value = {
    axios, navigate, token, blog, input, setToken, setBlog, setInput
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext  = () => {
    return useContext(AppContext);
};


