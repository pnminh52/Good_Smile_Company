import React from 'react';

const NoteForShipping = ({ onChange }) => {
  return (
    <div className="space-y-4 py-4">
      <p className="text-xl font-semibold">Notice for shipper</p>
      <textarea
        placeholder="Leaving a message for us..."
        className="border border-gray-300 rounded-lg w-full px-4 py-2 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

export default NoteForShipping;
