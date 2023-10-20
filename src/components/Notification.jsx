import React, { useState } from "react";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const Notification = () => {
  const notifications = [
    {
      id: 1,
      username: "John Doe",
      course: "Hiphop basic course",
      time: "2:00 PM",
      date: "18/08/2023",
      isChecked: false,
    },
    {
      id: 2,
      username: "Jane Doe",
      course: "Hiphop basic course",
      time: "4:00 PM",
      date: "20/08/2023",
      isChecked: false,
    },
  ];

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deletedNotifications, setDeletedNotifications] = useState([]);

  const handleCheck = (id) => {
    if (id === "all") {
      if (selectAll) {
        setSelected([]);
      } else {
        setSelected(notifications.map((n) => n.id));
      }
      setSelectAll(!selectAll);
    } else {
      const newSelected = [...selected];
      if (newSelected.includes(id)) {
        const index = newSelected.indexOf(id);
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }
      setSelected(newSelected);
      setSelectAll(newSelected.length === notifications.length);
    }
  };

  const deleteSelectedNotifications = () => {
    setDeletedNotifications((prev) => [...prev, ...selected]);
    setSelected([]);
  };

  return (
    <div className="w-4/5 mx-auto mt-52 ">
      <h2 className="text-2xl font-bold mb-5">Notification</h2>

      <div className="bg-gray-300 shadow-lg  p-3 rounded-xl flex items-center gap-2 mb-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => handleCheck("all")}
            className="mr-2"
          />
          <span>
            Total notifications: {notifications.length} | Selected:{" "}
            {selected.length}
          </span>
        </div>
        <RiDeleteBinLine
          onClick={deleteSelectedNotifications}
          className="text-xl cursor-pointer"
        />
      </div>

      {notifications
        .filter(
          (notification) => !deletedNotifications.includes(notification.id)
        )
        .map((notification) => (
          <div
            key={notification.id}
            className="shadow-lg rounded-xl border-gray-300 p-3 flex justify-between items-center mb-3"
          >
            <div>
              <input
                type="checkbox"
                checked={selected.includes(notification.id)}
                onChange={() => handleCheck(notification.id)}
              />
            </div>
            <div className="flex w-full justify-between  flex-1 ml-2">
              <div className="flex items-center mb-2 ">
                <FaUserCircle className="text-xl mr-2" />
                <div>
                  <div>{notification.username}</div>
                  <div className="font-semibold">question asked</div>
                </div>
              </div>
              <div className="flex px-2 items-center">
                <div className="text-sm mb-1 mx-4">{notification.course}</div>
                <div>
                  <div className="text-sm mb-1">{notification.time}</div>
                  <div className="text-sm">{notification.date}</div>
                </div>
              </div>
            </div>
            <div>
              <FaArrowRight className="text-xl" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notification;
