"use client";
import { useAppStore } from "@/providers/store-provider";
import Betslip from "../betslip/betslip";

const Drawer = () => {
  const { isOpen } = useAppStore((state) => state.drawerRight);
  const toggleDrawerRight = useAppStore((state) => state.toggleDrawerRight);

  const handleDrawerClose = () => {
    toggleDrawerRight(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-30 z-40"
          onClick={handleDrawerClose}
        />
      )}
      <div
        className={`md:hidden fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Betslip</h2>
            <button
              onClick={handleDrawerClose}
              className="text-2xl hover:text-gray-600"
              aria-label="Close drawer"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Betslip />
        </div>
      </div>
    </>
  );
};

export default Drawer;
