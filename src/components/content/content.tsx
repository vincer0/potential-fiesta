'use client';
import { useAppStore } from "@/providers/store-provider";

const Content = () => {
  const { games } = useAppStore((state) => state);

  console.log('games in content', games);

  return <div>Content</div>;
};

export default Content;
