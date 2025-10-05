import React, { useState, useEffect } from "react";
import axios from "axios";
import useToast from "../../../hook/useToast";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const UserInfoCard = ({ onChange }) => {
  const toast = useToast();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000/api";


  const [user, setUser] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [newDistrict, setNewDistrict] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
       
const res = await axios.get(`${API_URL}/users/profile`, {
  headers: { Authorization: `Bearer ${token}` },
});
        setUser(res.data);

        const initialDistricts = Array.isArray(res.data.district)
          ? res.data.district
          : res.data.district
          ? [res.data.district]
          : [];

        setDistricts(initialDistricts);
        setSelectedDistrict(initialDistricts[0] || "");

        onChange &&
          onChange({
            districts: initialDistricts,
            selectedDistrict: initialDistricts[0] || "",
          });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, [onChange]);

  const handleNewDistrictChange = (e) => setNewDistrict(e.target.value);

  const handleAddDistrict = () => {
    const d = newDistrict.trim();
    if (!d) return;
    if (!d) { 
      toast.error("Cannot add empty district!");
      return;
    }
    if (districts.length >= 3) {
      toast.error("You can only add up to 3 districts!");
      return;
    }
   if(districts.includes(d)){

    toast.error("This district already exists!");
    return;
   }

    if (districts.includes(d)) {
      toast.error("This district already exists!");
      return;
    }

    const updated = [...districts, d];
    setDistricts(updated);
    setNewDistrict("");
    onChange && onChange({ districts: updated, selectedDistrict });
  };

  const handleRemoveDistrict = (index) => {
    const updated = districts.filter((_, i) => i !== index);
    setDistricts(updated);
    if (selectedDistrict === districts[index]) {
      setSelectedDistrict(updated[0] || "");
    }
    onChange && onChange({ districts: updated, selectedDistrict: updated[0] || "" });
  };

  const handleSelectDistrict = (d) => {
    setSelectedDistrict(d);
    onChange && onChange({ districts, selectedDistrict: d });
  };

  if (!user) return null;

  return (
    <div className="">
      <div className="flex flex-col gap-4">

        {/* Thêm district mới */}
       {
        districts.length<3 && (
           <div className="flex flex-col ">
                    <label className="    text-xl font-semibold sm:py-6 py-4">District / city </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newDistrict}
                        onChange={handleNewDistrictChange}
                        placeholder="Enter your current address and place of residence"
                        className="border border-gray-300  px-3 h-10 rounded-lg flex-1"
                      />
                     <button
  type="button"
  onClick={handleAddDistrict}
  className="bg-[#FFF] border cursor-pointer border-[#FF6900] text-[#FF6900] rounded-lg flex items-center justify-center gap-2 
             w-10 h-10 p-0 lg:w-auto lg:h-auto lg:px-4 lg:py-2"
>
  <PlusOutlined />
  <span className="hidden lg:inline">Add new district</span>
</button>

                    </div>
                  </div>
        )
       }

        {/* Danh sách district */}
        <div className="flex flex-col gap-1 ">
          <label className={`text-xl font-semibold pb-4 ${
            districts.length===3 &&(
              "pt-4"
            )
          }`}    >Your saved addresses ({districts?.length}) </label>
        <div className=" space-y-2">
            {districts.map((d, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between border rounded-lg  px-3 py-2 ${
                          selectedDistrict === d ? "bg-gray-50 border border-[#FF6624]" : "opacity-40"
                        }`}
                      >
                        <p
                          onClick={() => handleSelectDistrict(d)}
                          className="cursor-pointer"
                        >
                          {d}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemoveDistrict(i)}
                          className="cursor-pointer text-red-500 font-bold"
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    ))}
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default UserInfoCard;
