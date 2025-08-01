import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.put(
        'https://backend-production-7e58.up.railway.app/api/admin/update',
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.msg);
    } catch (err) {
      const errMsg = err.response?.data?.msg || 'Something went wrong';
      setError(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 min-h-screen bg-gray-900">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Change Password
        </h2>

        {message && <p className="text-green-400 text-center mb-4">{message}</p>}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              className="w-full mt-1 px-4 py-2 bg-white/20 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
              placeholder="Enter old password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="w-full mt-1 px-4 py-2 bg-white/20 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              className="w-full mt-1 px-4 py-2 bg-white/20 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
