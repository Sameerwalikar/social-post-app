import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export const usePosts = () => useContext(PostContext);
