import React, { useState, useEffect } from "react";
import PopupCard from "./PopupCard";
import { Modal } from "antd";
import { useSearchParams } from "react-router-dom";

const PopupFilters = ({
  options,
  selected,
  setSelected,
  placeholder,
  setShowFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTempSelected(selected); 
  }, [selected]);

  const handleToggle = (value) => {
    if (tempSelected.includes(value))
      setTempSelected(tempSelected.filter((v) => v !== value));
    else setTempSelected([...tempSelected, value]);
  };

  const handleApply = () => {
    setSelected(tempSelected);

    if (placeholder.toLowerCase().includes("category")) {
      if (tempSelected.length > 0) {
        searchParams.set("category", tempSelected[0]); // chỉ giữ 1 category
      } else {
        searchParams.delete("category");
      }
      setSearchParams(searchParams);
    }

    setIsOpen(false);
  };

  const handleClose = () => {
    setTempSelected(selected);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setTempSelected([]);
    setSelected([]);

    if (placeholder.toLowerCase().includes("category")) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="relative">
      <div className="py-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full rounded-full gap-1 p-2.5 cursor-pointer font-semibold bg-[#F4F4F6] transition duration-300 hover:bg-gray-200 flex items-center justify-center"
        >
          <img src="https://www.goodsmile.com/img/icon/search.svg" alt="" />
          {selected.length > 0
            ? `${placeholder} (${selected.length})`
            : placeholder}
        </button>
      </div>

      {selected.length > 0 && (
        <div className="py-2 space-y-1.5">
          <div className="flex flex-wrap gap-1 space-y-1">
            {selected.map((s) => (
              <p
                key={s}
                className="bg-[#F4F4F6] px-2 py-0 rounded-full flex items-center gap-1"
              >
                {s}
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    const newSelected = selected.filter((v) => v !== s);
                    setSelected(newSelected);

                    if (placeholder.toLowerCase().includes("category")) {
                      if (newSelected.length > 0) {
                        searchParams.set("category", newSelected[0]);
                      } else {
                        searchParams.delete("category");
                      }
                      setSearchParams(searchParams);
                    }
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="#EA1717"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29 5.29c.39-.39 1.02-.39 1.41 0L12 10.59l5.29-5.3a1 1 0 111.42 1.42L13.41 12l5.3 5.29a1 1 0 01-1.42 1.42L12 13.41l-5.29 5.3a1 1 0 01-1.42-1.42L10.59 12l-5.3-5.29a1 1 0 010-1.42z"
                    />
                  </svg>
                </button>
              </p>
            ))}
          </div>

          {selected.length > 2 && (
            <span
              className="px-2 cursor-pointer py-0 text-[#EA1717] border border-[#EA1717] rounded-full"
              onClick={handleClearAll}
            >
              Clear All
            </span>
          )}
        </div>
      )}

      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        centered
        destroyOnClose
        width={400}
        style={{ borderRadius: "15px", overflow: "hidden" }}
      >
        <PopupCard
          options={options}
          tempSelected={tempSelected}
          handleToggle={handleToggle}
          handleClose={handleClose}
          handleApply={() => {
            handleApply();
            if (setShowFilter) setShowFilter(false);
          }}
          setShowFilter={setShowFilter}
        />
      </Modal>
    </div>
  );
};

export default PopupFilters;
