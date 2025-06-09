'use client';

import { useState } from 'react';

const DifficultyDisclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop: hover behavior */}
      <div className="hidden md:block absolute left-0 top-8 z-10 w-64 opacity-0 invisible group-hover/difficulty:opacity-100 group-hover/difficulty:visible transition-all duration-200">
        {/* Triangle */}
        <div className="absolute -top-2 left-4 w-4 h-4 bg-orange-50 rotate-45 border border-orange-200 border-r-0 border-b-0"></div>
        
        {/* Tooltip box */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 shadow-lg">
          <p className="text-sm text-orange-800">
            Трудноста показва количеството продукти в рецептата
          </p>
        </div>
      </div>

      {/* Mobile: click behavior */}
      {isOpen && (
        <div className="md:hidden absolute left-0 top-8 z-10 w-64">
          {/* Triangle */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-orange-50 rotate-45 border border-orange-200 border-r-0 border-b-0"></div>
          
          {/* Tooltip box */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 shadow-lg">
            <p className="text-sm text-orange-800">
              Трудноста показва количеството продукти в рецептата
            </p>
          </div>
        </div>
      )}

      {/* Mobile click handler */}
      <div 
        className="md:hidden absolute inset-0 z-20" 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
};

export default DifficultyDisclaimer;
