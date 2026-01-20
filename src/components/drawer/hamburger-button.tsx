"use client";
import { useAppStore } from "@/providers/store-provider";

const HamburgerButton = () => {
  const { isOpen } = useAppStore((state) => state.drawerRight);
  const toggleDrawerRight = useAppStore((state) => state.toggleDrawerRight);

  const handleClick = () => {
    toggleDrawerRight(!isOpen);
  };

  if (isOpen) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="md:hidden z-50 fixed top-4 right-4 p-2 rounded shadow-lg bg-blue-500 hover:bg-blue-800 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;
