import React, { useEffect, useState } from "react";
import useToast from "../../../hook/useToast";
import {
  handleLockAccount,
  handleUnlockAccount,
  getAllUsers,
  getDeleteRequests,
  confirmDeleteAccount,
} from "../../../api/account";

const UserList = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [deleteReqMap, setDeleteReqMap] = useState({}); // { user_id: request }

  // Fetch users + delete requests
  const fetchData = async () => {
    try {
      const usersData = await getAllUsers();
      const reqsData = await getDeleteRequests();
      setUsers(usersData);

      // Map requestId theo user_id
      const map = {};
      reqsData.forEach((r) => {
        map[r.user_id] = r; // r.id là requestId
      });
      setDeleteReqMap(map);
    } catch (error) {
      toast.error("Failed to fetch users or delete requests!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lockUser = async (id) => {
    try {
      await handleLockAccount(id);
      toast.success("User locked");
      fetchData();
    } catch (error) {
      toast.error("Failed to lock user!");
    }
  };

  const unlockUser = async (id) => {
    try {
      await handleUnlockAccount(id);
      toast.success("User unlocked");
      fetchData();
    } catch (error) {
      toast.error("Failed to unlock user");
    }
  };

  const handleDeleteAction = async (requestId, action) => {
    try {
      await confirmDeleteAccount({ requestId, action });
      toast.success(`Request ${action}`);
      fetchData();
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
          {users.map((u) => {
            const req = deleteReqMap[u.id]; // check request pending
            return (
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

                  {req && req.status === "pending" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteAction(req.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteAction(req.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
