import { FC } from "react";
import { StoryCard } from "./StoryCard";

export interface DataType {
  name: string;
  src: string;
  profile: string;
}

const data: DataType[] = [
  {
    name: "Elon Mask",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Jeff Bezos",
    src: "https://links.papareact.com/k2j",
    profile: "https://links.papareact.com/f0p",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy",
  },
  {
    name: "Mark Zuckerberg",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf",
  },
];

<<<<<<< Updated upstream
export const Stories: FC = () => {
    return (
        <div className="flex justify-center space-x-3">
            {data.map(story => {
                return <StoryCard key={story.src} profile={story.profile} src={story.src} name={story.name} />
            })}
        </div>
    )
}
=======
const Stories: FC = () => {
  return (
    <div className="flex justify-center space-x-3">
      {data.map((story) => {
        return (
          <StoryCard
            key={story.src}
            profile={story.profile}
            src={story.src}
            name={story.name}
          />
        );
      })}
    </div>
  );
};

export default Stories;
>>>>>>> Stashed changes
