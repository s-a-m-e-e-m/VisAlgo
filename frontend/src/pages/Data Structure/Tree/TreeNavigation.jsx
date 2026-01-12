import React from 'react';
import { NavLink } from "react-router-dom";

const TreeNavigation = () => {
    return (
        <div className="flex flex-row gap-6">
            <NavLink to='/tree' end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md md:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                } >
                Tree
            </NavLink>
            <NavLink to='/binarytree' end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md md:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}>
                Binary Tree
            </NavLink>
            <NavLink to='/bst' end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md md:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}>
                Binary Search Tree
            </NavLink>
        </div>
    )
}

export default TreeNavigation
