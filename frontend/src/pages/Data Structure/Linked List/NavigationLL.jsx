import React from 'react'
import { NavLink } from 'react-router-dom'

function NavigationLL() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mb-4">
        <div className='flex flex-row gap-2'>
        <NavLink
          to="/linkedlist"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Singly Linked List
        </NavLink>

        <NavLink
          to="/doublylinkedlist"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Doubly Linked List
        </NavLink>
        </div>

        <div className='flex flex-row gap-2'>
        <NavLink
          to="/cicularlinkedlist"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Circular Linked List
        </NavLink>

        <NavLink
          to="/doublycircularll"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md md:text-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          Doubly Circular Linked List
        </NavLink>
        </div>
      </div>
  )
}

export default NavigationLL
