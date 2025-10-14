import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, XCircle, Clock, TrendingUp, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  studentIdCard: string;
  studentIdCardSelfie: string;
  studentVerificationStatus: 'pending' | 'approved' | 'rejected';
  studentVerificationRequestedAt: string;
  subscriptionPlan: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [pendingVerifications, setPendingVerifications] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    approvedStudents: 0,
    rejectedStudents: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('edumind_admin_token');
    if (!token) {
      navigate('/admin/auth');
      return;
    }

    fetchPendingVerifications();
    fetchStats();
  }, [navigate]);

  const fetchPendingVerifications = async () => {
    try {
      const token = localStorage.getItem('edumind_admin_token');
      const response = await fetch('http://localhost:5000/api/auth/pending-student-verifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch pending verifications');
      }

      setPendingVerifications(data.data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pending verifications';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // In a real implementation, you would fetch actual stats from the backend
      // For now, we'll use mock data
      setStats({
        totalUsers: 1240,
        pendingVerifications: pendingVerifications.length,
        approvedStudents: 890,
        rejectedStudents: 45
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stats';
      toast.error(errorMessage);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const token = localStorage.getItem('edumind_admin_token');
      const response = await fetch(`http://localhost:5000/api/auth/approve-student-verification/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to approve student');
      }

      toast.success('Student verification approved');
      fetchPendingVerifications();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to approve student';
      toast.error(errorMessage);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const token = localStorage.getItem('edumind_admin_token');
      const response = await fetch(`http://localhost:5000/api/auth/reject-student-verification/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reject student');
      }

      toast.success('Student verification rejected');
      fetchPendingVerifications();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reject student';
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('edumind_admin_token');
    navigate('/admin/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Verifications</p>
                <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved Students</p>
                <p className="text-2xl font-bold">{stats.approvedStudents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected Students</p>
                <p className="text-2xl font-bold">{stats.rejectedStudents}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Pending Verifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-500" />
              Pending Student Verifications
            </h2>
          </div>
          
          {pendingVerifications.length === 0 ? (
            <div className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No pending student verifications</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Request Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Card</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Selfie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {pendingVerifications.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(user.studentVerificationRequestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <a 
                          href={user.studentIdCard} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View ID
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <a 
                          href={user.studentIdCardSelfie} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View Selfie
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="text-green-400 hover:text-green-300 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;