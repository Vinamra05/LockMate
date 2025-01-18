import React, { useRef, useState, useEffect } from "react";
import addicon from "../assets/addicon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Manager = ({ isAuthenticated }) => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [dataArray, setdataArray] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPasswords = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_ADDRESS + "getpasswords",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      if (response.data.success) {
        setdataArray(response.data.passwords);
      } else {
        setMessage("Could not retrieve passwords.");
      }
    } catch (error) {
      setMessage("Error loading passwords.");
      setdataArray([]);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, [isAuthenticated]);

  const showPassword = () => {
    if (ref.current.src.includes("/icons/visibility.svg")) {
      ref.current.src = "/icons/visibilityoff.svg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icons/visibility.svg";
      passwordRef.current.type = "password";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length != 0 &&
      form.username.length != 0 &&
      form.password.length != 0
    ) {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          import.meta.env.VITE_BASE_ADDRESS + "savepassword",
          {
            url: form.site,
            username: form.username,
            password: form.password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setMessage("Password saved successfully!");
        }
      } catch (error) {
        setMessage("Error saving password.");
        console.error(error);
      }

      fetchPasswords();

      setform({ site: "", username: "", password: "" });
    } else {
      toast("Fields can't be empty!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleDelete = async (passwordId) => {
    const token = localStorage.getItem("token");
    try {
      console.log("Attempting to delete password:", passwordId);
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_ADDRESS}deletepassword/${passwordId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete response:", response);

      if (response.data.success) {
        // Show success toast
        toast.success("Password deleted successfully.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        // Update the state to remove the deleted item from UI
        setdataArray(
          dataArray.filter((password) => password._id !== passwordId)
        );
      } else {
        // Show failure toast
        toast.error("Failed to delete password.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error deleting password.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.error("Error in handleDelete:", error.response || error.message);
    }
  };

  const handleEdit = (id) => {
    let pass = dataArray.filter((item) => item._id == id);
    setform(pass[0]);
    console.log(pass[0]);
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className=" mx-auto max-w-4xl h-[calc(100% - 88px)] p-4 flex flex-col gap-4 ">
        <h1 className=" text-purple-500 underline underline-offset-4 drop text-center text-lg font-bold">
          &lt;Your Own Password Manager/&gt;
        </h1>

        <div className="flex flex-col p-4 gap-8  ">
          <input
            onChange={handleChange}
            value={form.site}
            className="inputBox bg-[#1f2937] text-xl"
            type="text"
            name="site"
            placeholder="Enter Website Url"
            id="site"
          />

          <div className="flex flex-col sm:flex-row gap-8 relative">
            <input
              onChange={handleChange}
              value={form.username}
              className="inputBox w-full bg-[#1f2937]"
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
            />

            <input
              ref={passwordRef}
              onChange={handleChange}
              value={form.password}
              className="inputBox w-full  bg-[#1f2937]"
              name="password"
              type="password"
              placeholder="Enter Password"
              id="password"
            />

            <span
              className="eyebtn cursor-pointer absolute bottom-1 right-2 sm:right-1 sm:top-1 "
              onClick={showPassword}
            >
              <img
                ref={ref}
                className="invert"
                src="/icons/visibility.svg"
                alt="eye"
              />
            </span>
          </div>
          <div className="m-auto">
            <button className="addpassBtn flex justify-around items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              <img className="w-6" src={addicon} alt="" />
              <span   onClick={savePassword} className="addpasstxt px-4">Save</span>
            </button>
          </div>
        </div>

        <div className="font-extrabold text-lg text-[#996ff2]">
          Your Saved Passwords
        </div>
        {message && <p>{message}</p>}

        <div className="passTable relative overflow-x-auto h-[37vh] overflow-auto  rounded-lg">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs w-full  text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3 w-[40%] bg-[#2f176e]">
                  Website URL
                </th>
                <th scope="col" className="px-3 py-3 bg-[#2f176c6b]">
                  Username
                </th>
                <th scope="col" className="px-3 py-3 bg-[#2f176e] ">
                  Password
                </th>
                <th scope="col" className="px-3 py-3 bg-[#2f176c6b] ">
                  Action
                </th>
              </tr>
            </thead>
            {dataArray.length === 0 && (
              <tbody>
                <tr>
                  <td className="p-4">No Saved Password!</td>
                </tr>
              </tbody>
            )}
            {dataArray.length !== 0 && (
              <tbody>
                {dataArray.map((item) => {
                  {
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 dark:border-gray-700 "
                      >
                        <th
                          scope="row"
                          className="px-4 py-4 flex  items-center justify-between  font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800 "
                        >
                          <a
                            className="hover:underline hover:underline-offset-4"
                            target="_blank"
                            href="{item.url}"
                          >
                            <span className="siteurl">{item.url}</span>
                          </a>
                          <span
                            className="cpybtn cursor-pointer"
                            onClick={() => copyText(item.url)}
                          >
                            <span className="material-symbols-outlined">
                              content_copy
                            </span>
                          </span>
                        </th>
                        <td className="px-3  py-4 bg-[#091425fe]">
                          <span className="flex justify-between items-center">
                            <span>{item.username}</span>{" "}
                            <span
                              className="cpybtn cursor-pointer"
                              onClick={() => copyText(item.username)}
                            >
                              <span className="material-symbols-outlined">
                                content_copy
                              </span>
                            </span>
                          </span>
                        </td>
                        <td className="px-3 py-4 bg-gray-50 dark:bg-gray-800">
                          <span className="flex items-center justify-between">
                            <span>{"*".repeat(item.password.length)}</span>
                            <span
                              className="cpybtn cursor-pointer"
                              id="true"
                              onClick={() => copyText(item.password)}
                            >
                              <span className="material-symbols-outlined">
                                content_copy
                              </span>
                            </span>
                          </span>
                        </td>
                        <td className="px-3 py-4  bg-[#091425fe]">
                          <span className="flex justify-around items-center gap-4">
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                handleEdit(item._id);
                              }}
                            >
                              <span className="material-symbols-outlined">
                                edit_square
                              </span>
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={
                                () =>
                                  // confirm(
                                  //   "Are you sure! you want to delete the data?"
                                  // )
                                  //   ? handleDelete(item._id)
                                  handleDelete(item._id)
                                // : ""
                              }
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
