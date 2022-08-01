import { FC } from "react";
import PostsList from "./PostSection/PostsList";
import SelectedPost from "./SelectedPost/SelectedPost";

interface Props {

}

const Posts: FC<Props> = ({ }) => {
    return (
        <div>
            <PostsList />
            <SelectedPost />
        </div>
    )
}

export default Posts