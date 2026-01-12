import React from 'react'
import { NavLink } from 'react-router-dom'

const HeapNaivgation = () => {
  return (
        <div className="flex flex-row gap-6">
            <NavLink to='/minheap' end
                className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-md md:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                } >
                Min Heap
            </NavLink>
            <NavLink to='/maxheap' end
                className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-md md:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}>
                Max Heap
            </NavLink>
        </div>
    )
}

export default HeapNaivgation
