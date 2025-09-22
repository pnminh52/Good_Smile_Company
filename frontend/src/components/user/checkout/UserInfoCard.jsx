import React, { useState, useEffect } from "react";
import axios from "axios";
import useToast from "../../../hook/useToast";

const UserInfoCard = ({ onChange }) => {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [newDistrict, setNewDistrict] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
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

    if (districts.length >= 3) {
      toast.error("You can only add up to 3 districts!");
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
           <div className="flex flex-col gap-2">
                    <label className="font-semibold text-xl">Add New District/City</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newDistrict}
                        onChange={handleNewDistrictChange}
                        placeholder="Enter district/city"
                        className="border rounded px-3 py-2 flex-1"
                      />
                      <button
                        type="button"
                        onClick={handleAddDistrict}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
        )
       }

        {/* Danh sách district */}
        <div className="flex flex-col gap-1 ">
          <label className="font-semibold text-xl">Saved Districts/Cities</label>
        <div className="py-6 space-y-4">
            {districts.map((d, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between border px-3 py-2 rounded ${
                          selectedDistrict === d ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <span
                          onClick={() => handleSelectDistrict(d)}
                          className="cursor-pointer"
                        >
                          {d}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDistrict(i)}
                          className="text-red-500 font-bold"
                        >
                          x
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
