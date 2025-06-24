import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({ name, email });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <form onSubmit={handleUpdateProfile} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;





// // ProfilePage.jsx
// import { useState } from 'react';

// const ProfilePage = () => {
//   // Sample state for profile data
//   const [userInfo, setUserInfo] = useState({
//     username: "JohnDoe",
//     email: "johndoe@example.com",
//     bio: "Just another journaling enthusiast!",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here, you would normally send the updated data to your server
//     console.log('Profile updated:', userInfo);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Username */}
//         <div className="flex flex-col">
//           <label htmlFor="username" className="text-gray-700">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={userInfo.username}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="flex flex-col">
//           <label htmlFor="email" className="text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userInfo.email}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Bio */}
//         <div className="flex flex-col">
//           <label htmlFor="bio" className="text-gray-700">Bio</label>
//           <textarea
//             id="bio"
//             name="bio"
//             value={userInfo.bio}
//             onChange={handleChange}
//             rows="4"
//             className="mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;
