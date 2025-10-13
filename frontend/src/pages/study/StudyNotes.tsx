import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Edit3, Trash2, Star, Clock, Tag, BookOpen, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const StudyNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Calculus - Derivatives',
      content: 'The derivative of a function represents the rate of change at any given point. Key rules include:\n\n• Power Rule: d/dx(x^n) = nx^(n-1)\n• Product Rule: d/dx(uv) = u\'v + uv\'\n• Chain Rule: d/dx(f(g(x))) = f\'(g(x)) × g\'(x)\n\nApplications:\n- Finding slopes of tangent lines\n- Optimization problems\n- Related rates',
      subject: 'Mathematics',
      tags: ['calculus', 'derivatives', 'rules'],
      favorite: true,
      createdAt: '2024-03-15',
      updatedAt: '2024-03-18',
      wordCount: 85
    },
    {
      id: 2,
      title: 'Physics - Newton\'s Laws',
      content: 'Newton\'s Three Laws of Motion:\n\n1. First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n2. Second Law: F = ma (Force equals mass times acceleration)\n\n3. Third Law: For every action, there is an equal and opposite reaction.\n\nExamples and applications in everyday life...',
      subject: 'Physics',
      tags: ['newton', 'laws', 'motion', 'force'],
      favorite: false,
      createdAt: '2024-03-12',
      updatedAt: '2024-03-16',
      wordCount: 92
    },
    {
      id: 3,
      title: 'Spanish Vocabulary - Family',
      content: 'Family Members in Spanish:\n\n• Familia - Family\n• Padre - Father\n• Madre - Mother\n• Hijo/Hija - Son/Daughter\n• Hermano/Hermana - Brother/Sister\n• Abuelo/Abuela - Grandfather/Grandmother\n• Tío/Tía - Uncle/Aunt\n• Primo/Prima - Cousin\n\nUseful phrases:\n- Mi familia es grande - My family is big\n- Tengo dos hermanos - I have two brothers',
      subject: 'Languages',
      tags: ['spanish', 'vocabulary', 'family'],
      favorite: true,
      createdAt: '2024-03-10',
      updatedAt: '2024-03-17',
      wordCount: 78
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    subject: 'Mathematics',
    tags: []
  });

  const subjects = ['all', 'Mathematics', 'Physics', 'Languages', 'Computer Science', 'Biology', 'Chemistry'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const openEditor = (note = null) => {
    if (note) {
      setEditingNote(note);
      setNewNote({
        title: note.title,
        content: note.content,
        subject: note.subject,
        tags: note.tags
      });
    } else {
      setEditingNote(null);
      setNewNote({
        title: '',
        content: '',
        subject: 'Mathematics',
        tags: []
      });
    }
    setShowEditor(true);
  };

  const saveNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }

    const now = new Date().toISOString().split('T')[0];
    const wordCount = newNote.content.trim().split(/\s+/).length;

    if (editingNote) {
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id 
          ? { 
              ...note, 
              ...newNote, 
              updatedAt: now,
              wordCount 
            }
          : note
      ));
      toast.success('Note updated successfully!');
    } else {
      const note = {
        id: Date.now(),
        ...newNote,
        favorite: false,
        createdAt: now,
        updatedAt: now,
        wordCount
      };
      setNotes(prev => [note, ...prev]);
      toast.success('Note created successfully!');
    }

    setShowEditor(false);
    setEditingNote(null);
  };

  const deleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
      toast.success('Note deleted successfully!');
    }
  };

  const toggleFavorite = (noteId) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, favorite: !note.favorite }
        : note
    ));
    toast.success('Favorite status updated!');
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTag = e.target.value.trim().toLowerCase();
      if (!newNote.tags.includes(newTag)) {
        setNewNote(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Notes</h1>
            <p className="text-lg text-gray-600">Create, organize, and manage your study notes</p>
          </div>
          <button
            onClick={() => openEditor()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>New Note</span>
          </button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 pr-2">
                    {note.title}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(note.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      note.favorite 
                        ? 'text-yellow-500 bg-yellow-100' 
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-4">
                    {note.content}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{note.subject}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {note.wordCount} words
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditor(note)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No notes found
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first study note to get started.
            </p>
            <button
              onClick={() => openEditor()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Create Your First Note
            </button>
          </motion.div>
        )}

        {/* Note Editor Modal */}
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={saveNote}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter note title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={newNote.subject}
                      onChange={(e) => setNewNote(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {subjects.filter(s => s !== 'all').map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newNote.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    onKeyPress={handleTagInput}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your note content here..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    {newNote.content.trim().split(/\s+/).filter(word => word.length > 0).length} words
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default StudyNotes;