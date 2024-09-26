import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, location , setLocation } = useAppContext(); 

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.post("http://localhost:3000/check_auth", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:3000/logout", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className=" shadow-md flex flex-wrap items-center p-1 bg-[#dae9f5]">
      <a
        className="text-2xl font-medium text-blue-700 sm:text-3xl sm:ml-3"
        href="/"
      >
        SkyMate
      </a>
      <div className="ml-auto flex items-center mx-0 sm:mx-auto hidden sm:block">
        <form>
          <input
            type="text"
            placeholder="Enter location"
            className="text-center p-1 rounded-xl w-36 text-base sm:p-2 sm:rounded-2xl sm:w-auto sm:text-base"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <button
            type="button"
            onClick={() => navigate(`/weather?location=${location}`)}
            className="btn bg-white ml-2 w-20 pt-0 pl-0 pr-0 rounded-xl hover:bg-[#FFF0DA] text-sm sm:text-base sm:w-20"
          >
            Search
          </button>
        </form>
      </div>

      <div className="p-2 ml-28 sm:ml-0 flex items-center">
        <button
          className="btn bg-white ml-5 w-20 pt-0 pl-0 pr-0 rounded-xl hover:bg-[#FFF0DA] text-lg sm:text-base sm:w-20"
          onClick={handleLoginLogout}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {isLoggedIn && (
          <div
            className="ml-4 rounded-full h-10 w-10 bg-yellow-200 cursor-pointer overflow-hidden"
            onClick={() => navigate("/profile")}
          >
            <img
              src="/profile.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
