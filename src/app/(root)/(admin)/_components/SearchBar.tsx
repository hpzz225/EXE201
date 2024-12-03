'use client';

import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const SearchBar = () => {
    return (
        <form className="bg-white w-full rounded-full flex items-center space-x-4 p-4  ">
            <div className="flex items-center bg-gray-100 rounded-full w-full ">
                <FaSearch className="text-gray-500 mx-4" />

                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="bg-transparent w-full py-4 pr-4 text-gray-700 focus:outline-none"
                />
            </div>

            {/* <div className="flex items-center"> */}
            <FaBell size={24} className="text-gray-500" />
            {/* </div> */}

            {/* <div className="flex items-center"> */}
            <FaUserCircle size={24} className="text-gray-500" />
            {/* </div> */}
        </form>
    );
};

export default SearchBar;
