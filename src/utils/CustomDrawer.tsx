import React, { useState } from 'react';

interface CustomDrawerProps {
  title: string;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="drawer">
      <button className="drawer-toggle" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default CustomDrawer;