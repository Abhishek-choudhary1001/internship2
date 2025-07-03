
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail') || '';
  // Generate avatar based on user's name (or "User" if not set)
  const placeholderImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=random`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Optionally: localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
      <div className="flex justify-center mb-6">
        <img
          src={placeholderImg}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Name</h2>
        <p className="text-gray-700">{userName || 'Not set'}</p>
      </div>
      {userEmail && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-700">{userEmail}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
