import React from 'react'
import { NavLink } from 'react-router-dom'

const QueueNavigation = () => {
    return (
        <div className="flex flex-row gap-6 mb-4">
            <NavLink
                to="/queue"
                end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md sm:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                }
            >
                Queue
            </NavLink>
            <NavLink
                to="/deque"
                end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md sm:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                }
            >
                Deque
            </NavLink>
            <NavLink
                to="/circularqueue"
                end
                className={({ isActive }) =>
                    `p-2 rounded-md text-md sm:text-lg font-medium ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                }
            >
                Circular Queue
            </NavLink>
        </div>
    )
}

export default QueueNavigation
