import React from 'react'
import { NavLink } from 'react-router-dom'

const SortingNavigator = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="flex flex-grow gap-2">
        <NavLink
          to="/sort/bubble"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Bubble Sort
        </NavLink>

        <NavLink
          to="/sort/insertion"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Insertion Sort
        </NavLink>
        </div>

        <div className="flex flex-grow gap-2">
        <NavLink
          to="/sort/selection"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
            Selection Sort
        </NavLink>

        <NavLink
          to="/sort/quick"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
            Quick Sort
        </NavLink>
        </div>

        <NavLink
            to="/sort/merge" 
            className={({ isActive }) => 
            `px-3 py-2 rounded-md md:text-lg font-medium ${
                isActive 
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
        >
            Merge Sort
        </NavLink>
      </div>
  )
}

export default SortingNavigator
