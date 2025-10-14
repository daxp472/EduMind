import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, FileText, UserCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentVerification = () => {
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setIdCardFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setSelfieFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfiePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idCardFile || !selfieFile) {
      toast.error('Please upload both ID card and selfie');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would upload files to a storage service
      // and send the URLs to the backend
      // For now, we'll simulate this with base64 data URLs
      
      const idCardDataUrl = idCardPreview || '';
      const selfieDataUrl = selfiePreview || '';
      
      const token = localStorage.getItem('edumind_token');
      const response = await fetch('http://localhost:5000/api/auth/request-student-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIdCard: idCardDataUrl,
          studentIdCardSelfie: selfieDataUrl
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit verification request');
      }
      
      toast.success('Verification request submitted successfully! Admin will review your request.');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit verification request';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <UserCheck className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Student Verification
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apply for the Student plan and get 6 months of free access! Please upload a clear photo of your student ID card 
              and a selfie holding your ID card for verification.
            </p>
          </div>

          {/* Verification Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ID Card Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Student ID Card
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload a clear photo of your student ID card. All information should be visible.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="idCard"
                    accept="image/*"
                    onChange={handleIdCardUpload}
                    className="hidden"
                  />
                  <label htmlFor="idCard" className="cursor-pointer">
                    {idCardPreview ? (
                      <div className="space-y-4">
                        <img 
                          src={idCardPreview} 
                          alt="ID Card Preview" 
                          className="max-h-64 mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-blue-600 font-medium">Click to change ID card photo</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">
                          <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Selfie Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-blue-600" />
                  Selfie with ID Card
                </h2>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Take a selfie holding your ID card. Make sure both your face and the ID card are clearly visible.
                    </p>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="selfie"
                    accept="image/*"
                    capture="user"
                    onChange={handleSelfieUpload}
                    className="hidden"
                  />
                  <label htmlFor="selfie" className="cursor-pointer">
                    {selfiePreview ? (
                      <div className="space-y-4">
                        <img 
                          src={selfiePreview} 
                          alt="Selfie Preview" 
                          className="max-h-64 mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-blue-600 font-medium">Click to retake selfie</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">
                          <span className="text-blue-600 font-medium">Click to take selfie</span> or upload photo
                        </p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !idCardFile || !selfieFile}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit for Verification'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Requirements */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Requirements</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>ID card must be valid and not expired</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>All information on ID card must be clearly visible</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Selfie must show your full face and ID card clearly</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Photos must be clear, well-lit, and not blurry</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>File size must be less than 5MB</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentVerification;