"use client";
import Betslip from "../betslip/betslip";

const Drawer = () => {
  const handleDrawerClose = () => {
    // Implement drawer close functionality here
  };

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center mb-4">
        <p>Drawer</p>
        <button onClick={handleDrawerClose}>X</button>
      </div>
      <Betslip />
    </div>
  );
};

export default Drawer;
