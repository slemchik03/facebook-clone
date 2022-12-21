import React from "react";
import { IPost } from "../../components/Feed/Posts/PostSection/PostsList";

export interface PreloadedPosts extends IPost {
    id: string
}

interface IValue {
    preloadedPosts: PreloadedPosts[]
}

export const HomeContext = React.createContext<IValue>(null)