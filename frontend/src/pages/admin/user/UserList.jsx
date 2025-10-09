import React, { useEffect, useState } from "react";
import useToast from "../../../hook/useToast";
import {
  handleLockAccount,
  handleUnlockAccount,
  getAllUsers,
  confirmDeleteAccount,
} from "../../../api/account";

const UserList = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data); // quan trọng: set state để render
    } catch (error) {
      toast.error("Failed to fetch users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const lockUser = async (id) => {
    try {
      await handleLockAccount(id);
      toast.success("User locked");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to lock user!");
    }
  };

  const unlockUser = async (id) => {
    try {
      await handleUnlockAccount(id);
      toast.success("User unlocked");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to unlock user");
    }
  };

  const handleDeleteAction = async (requestId, action) => {
    try {
      await confirmDeleteAccount({ requestId, action });
      toast.success(`Request ${action}`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to process delete request");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.status}</td>
              <td className="border px-2 py-1 space-x-2">
                {u.status === "active" ? (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => lockUser(u.id)}
                  >
                    Lock
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => unlockUser(u.id)}
                  >
                    Unlock
                  </button>
                )}

                {u.is_delete_requested && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteAction(u.id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteAction(u.id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
