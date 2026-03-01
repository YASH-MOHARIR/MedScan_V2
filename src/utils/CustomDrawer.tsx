import React, { useState, useId } from 'react';

interface CustomDrawerProps {
  title: string;
  children: React.ReactNode;
}


const CustomDrawer: React.FC<CustomDrawerProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const contentId = `drawer-content-${uniqueId}`;
  const buttonId = `drawer-button-${uniqueId}`;

  return (
    <div className="drawer">
      <button
        id={buttonId}
        className="drawer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {title}
      </button>
      <div
        id={contentId}
        className={`drawer-content ${isOpen ? 'open' : ''}`}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomDrawer;