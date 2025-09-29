// PopupCard.jsx
import React, { useState } from "react";

const PopupCard = ({
  handleApply,
  tempSelected,
  options,
  handleToggle,
  setShowFilter
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white  space-y-4 max-h-[80vh] w-full  pt-6 pb-6 overflow-auto">
     <div>
{/* Thanh search */}
<input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full border border-gray-300 rounded px-2 py-1 mb-0 focus:outline-none focus:ring-2 focus:ring-[#F06E00]"
/>
     </div>

      {/* Danh sách options */}
      <div className="space-y-2 max-h-60 overflow-auto hide-scrollbar">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => {
            const isChecked = tempSelected.includes(opt);
            return (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleToggle(opt)}
              >
                {/* Custom checkbox */}
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-md border  transition-all duration-300 
                  ${isChecked ? "bg-[#F06E00] border-[#F06E00]" : "bg-white"}`}
                >
                  {/* Không có dấu tích, chỉ đổi màu */}
                </span>
                <span className="truncate">{opt}</span>
              </label>
            );
          })
        ) : (
          <p className="text-gray-400 text-sm">No results found</p>
        )}
      </div>

      {/* Buttons */}
       
      <div className="w-full ">
      <button
  className="rounded-full cursor-pointer w-full py-2 font-semibold bg-[#F06E00] text-white"
  onClick={() => {
    handleApply();
    setShowFilter(false); 
  }}
>
  Apply
</button>

      </div>
      </div>
  );
};

export default PopupCard;
