import fetchUsers from "../hooks/fetchUsers";
import React, { useEffect, useState } from "react";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    };

    getUsers();
  }, []);
  return (
    <div className="h-auto">
      <label className="text-lg font-semibold font-roboto">User List</label>
      <div className="bg-white p-4 rounded-lg flex flex-col gap-5 mt-5">
        {users.map((user) => (
          <div
            className="flex flex-row gap-4 border-gray-200 pb-2 border-b"
            key={user.id}
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={user.profileImage}
            />
            <label>{user.tempName || user.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;
