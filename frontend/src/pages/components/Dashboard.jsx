import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios';
import { editDescription } from '../../utils/links';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [topicsCovered, setTopicsCovered] = useState([]);

  useEffect(() => {
    setDescription(user?.description || '');
    setTopicsCovered(user?.topicsCovered || []);
  }, [user]);

  if (!user) return <div className="text-center text-gray-600">Loading...</div>;

  const handleEditDescription = async () => {
    try {
      const res = await axios.put(
        editDescription,
        { userId: user._id, description: description },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser((prev) => ({ ...prev, description }));
        setIsEditingDescription(false);
      } else {
        alert('Failed to update description. Please try again.');
      }
    } catch (e) {
      alert('Failed to update description. Please try again.');
    }
  };

  return (
    <>
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>

        {/* Description */}
        <div className='mt-4 w-full'>
          {!isEditingDescription ? (
            <>
              <p className='text-gray-700 text-center italic'>
                {description ? `"${description}"` : 'No description yet.'}
              </p>
              {description ? (
                <div className='mt-2 flex justify-center gap-2'>
                  <button className='p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md' onClick={()=>setIsEditingDescription(true)}>Edit</button>
                </div>
              ) : (
                <div className='mt-2 flex justify-center'>
                  <button className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer' onClick={()=>setIsEditingDescription(true)}>Tell something about yourself</button>
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col items-center space-y-2'>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className='w-full border rounded p-2' />
              <div className='flex gap-2'>
                <button onClick={handleEditDescription} className='p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md'>Save</button>
                <button onClick={()=> {setDescription(user?.description || ''); setIsEditingDescription(false); }} className='p-2 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 rounded-md'>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📘 Topics Covered ({topicsCovered?.length || 0})
        </h2>
        {topicsCovered?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topicsCovered.map((topic, i) => (
              <div
                key={i}
                className="p-2 bg-blue-100 text-blue-700 rounded-lg text-center font-medium shadow-sm hover:bg-blue-200 transition"
              >
                {topic}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No topics covered yet.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Dashboard;