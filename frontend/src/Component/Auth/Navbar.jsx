import React, { useEffect, useRef, useState } from "react";
import UserModal from "./Modal";
import { API_URL } from "../../config";
import { ShowErrorToast, ShowSuccessToast } from "../../ToastMeassage";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const userData = localStorage.getItem("userData");
  const data = userData ? JSON.parse(userData) : null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logout = async () => {
    const response = await fetch(`${API_URL}/api/v1/users/logout`);
    if (response.ok) {
      localStorage.removeItem("authToken");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      ShowSuccessToast("Log out Successfully");
    } else {
      ShowErrorToast("User does not exist");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div class="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
      <nav class="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
        <div class="flex items-center justify-between">
          <button>
            <div class="flex items-center space-x-2">
              <h2 class="text-black dark:text-white font-bold text-2xl">
                Company
              </h2>
            </div>
          </button>
          <div class="hidden lg:block">
            <ul class="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
              <li class="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <a href="#">Home</a>
              </li>
              <li class="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <a href="#">Our services</a>
              </li>
              <li class="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <a href="#">About</a>
              </li>
              <li class="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={toggleDropdown}
              >
                {data?.username}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div className="py-1" role="none">
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    onClick={openModal}
                  >
                    View
                  </div>
                </div>
                <div className="py-1" role="none">
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm  cursor-pointer"
                    onClick={logout}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <UserModal isOpen={modalIsOpen} onRequestClose={closeModal} data={data} />
      <ToastContainer />
    </div>
  );
};

export default Navbar;
