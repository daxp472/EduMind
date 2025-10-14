import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Upload, Search, Download, Eye, Star, FileText, Image, Video, Music, X } from 'lucide-react';
import toast from 'react-hot-toast';

// Define the material type
interface StudyMaterial {
  id: number;
  name: string;
  type: string;
  subject: string;
  category: string;
  size: string;
  uploadDate: string;
  lastAccessed: string;
  favorite: boolean;
  description: string;
}

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const materials: StudyMaterial[] = [
    {
      id: 1,
      name: 'Calculus Fundamentals.pdf',
      type: 'pdf',
      subject: 'Mathematics',
      category: 'Notes',
      size: '2.4 MB',
      uploadDate: '2024-03-15',
      lastAccessed: '2024-03-18',
      favorite: true,
      description: 'Comprehensive notes on calculus fundamentals including limits, derivatives, and integrals'
    },
    {
      id: 2,
      name: 'Physics Lab Report Template.docx',
      type: 'document',
      subject: 'Physics',
      category: 'Templates',
      size: '156 KB',
      uploadDate: '2024-03-10',
      lastAccessed: '2024-03-17',
      favorite: false,
      description: 'Standard template for physics lab reports with proper formatting'
    },
    {
      id: 3,
      name: 'Spanish Vocabulary Flashcards.pdf',
      type: 'pdf',
      subject: 'Languages',
      category: 'Flashcards',
      size: '890 KB',
      uploadDate: '2024-03-12',
      lastAccessed: '2024-03-19',
      favorite: true,
      description: 'Essential Spanish vocabulary with pronunciation guides'
    },
    {
      id: 4,
      name: 'Algorithm Visualization.mp4',
      type: 'video',
      subject: 'Computer Science',
      category: 'Videos',
      size: '45.2 MB',
      uploadDate: '2024-03-08',
      lastAccessed: '2024-03-16',
      favorite: false,
      description: 'Visual explanation of sorting algorithms and their complexity'
    },
    {
      id: 5,
      name: 'Chemistry Periodic Table.png',
      type: 'image',
      subject: 'Chemistry',
      category: 'References',
      size: '1.8 MB',
      uploadDate: '2024-03-14',
      lastAccessed: '2024-03-18',
      favorite: true,
      description: 'High-resolution periodic table with element properties'
    },
    {
      id: 6,
      name: 'Biology Study Guide.pdf',
      type: 'pdf',
      subject: 'Biology',
      category: 'Study Guides',
      size: '3.1 MB',
      uploadDate: '2024-03-11',
      lastAccessed: '2024-03-17',
      favorite: false,
      description: 'Comprehensive study guide for cell biology and genetics'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: materials.length },
    { id: 'Notes', name: 'Notes', count: 1 },
    { id: 'Templates', name: 'Templates', count: 1 },
    { id: 'Flashcards', name: 'Flashcards', count: 1 },
    { id: 'Videos', name: 'Videos', count: 1 },
    { id: 'References', name: 'References', count: 1 },
    { id: 'Study Guides', name: 'Study Guides', count: 1 }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects', count: materials.length },
    { id: 'Mathematics', name: 'Mathematics', count: 1 },
    { id: 'Physics', name: 'Physics', count: 1 },
    { id: 'Languages', name: 'Languages', count: 1 },
    { id: 'Computer Science', name: 'Computer Science', count: 1 },
    { id: 'Chemistry', name: 'Chemistry', count: 1 },
    { id: 'Biology', name: 'Biology', count: 1 }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      default:
        return FileText;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'document':
        return 'text-blue-600 bg-blue-100';
      case 'image':
        return 'text-green-600 bg-green-100';
      case 'video':
        return 'text-purple-600 bg-purple-100';
      case 'audio':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleFavorite = () => {
    // In a real implementation, this would update the backend
    // For now, we're just showing a toast
    toast.success('Favorite status updated!');
  };

  const downloadFile = (material: StudyMaterial) => {
    toast.success(`Downloading ${material.name}...`);
  };

  const previewFile = (material: StudyMaterial) => {
    toast.success(`Opening ${material.name} for preview...`);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadFiles(prev => [...prev, ...files]);
      
      // Create previews for image files
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setUploadPreviews(prev => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
    setUploadPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      uploadFiles.forEach(file => {
        formData.append('images', file);
      });
      
      // Add other fields
      formData.append('title', 'Sample Title');
      formData.append('content', 'Sample content');
      formData.append('type', 'note');
      formData.append('subject', 'Mathematics');
      formData.append('tags', JSON.stringify(['sample', 'test']));

      const token = localStorage.getItem('edumind_token');
      const response = await fetch('http://localhost:5000/api/study/materials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload files');
      }

      toast.success('Files uploaded successfully!');
      setShowUploadModal(false);
      setUploadFiles([]);
      setUploadPreviews([]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload files';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Materials</h1>
            <p className="text-lg text-gray-600">Organize and access your learning resources</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Files</span>
          </button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.count})
                </option>
              ))}
            </select>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Materials Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMaterials.map((material) => {
                const FileIcon = getFileIcon(material.type);
                return (
                  <div key={material.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${getFileColor(material.type)}`}>
                          <FileIcon className="h-6 w-6" />
                        </div>
                        <button
                          onClick={toggleFavorite}
                          className={`p-2 rounded-lg transition-colors ${
                            material.favorite 
                              ? 'text-yellow-500 bg-yellow-100' 
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 truncate" title={material.name}>
                        {material.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {material.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{material.subject}</span>
                        <span>{material.size}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(material.uploadDate).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => previewFile(material)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => downloadFile(material)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getFileColor(material.type)} mr-3`}>
                            {React.createElement(getFileIcon(material.type), { className: "h-4 w-4" })}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{material.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{material.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {material.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(material.uploadDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => previewFile(material)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadFile(material)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={toggleFavorite}
                          className={`${
                            material.favorite 
                              ? 'text-yellow-500' 
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No study materials found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Materials
            </button>
          </motion.div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Upload Study Materials</h2>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFiles([]);
                      setUploadPreviews([]);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div 
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drag and drop files here</p>
                  <p className="text-gray-500 mb-4">or click to browse your files</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                  />
                </div>
                
                {uploadPreviews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {uploadFiles.length > 0 && (
                  <div className="mt-6">
                    <ul className="divide-y divide-gray-200">
                      {uploadFiles.map((file, index) => (
                        <li key={index} className="py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-lg mr-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Computer Science</option>
                      <option>Languages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Notes</option>
                      <option>Flashcards</option>
                      <option>Study Guides</option>
                      <option>Templates</option>
                      <option>References</option>
                      <option>Videos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Comma separated tags"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFiles([]);
                      setUploadPreviews([]);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;