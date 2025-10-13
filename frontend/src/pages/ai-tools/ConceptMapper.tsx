import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Brain, Plus, Minus, RotateCcw, Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import toast from 'react-hot-toast';

const ConceptMapper = () => {
  const [topic, setTopic] = useState('');
  const [conceptMap, setConceptMap] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const mockConceptMap = {
    title: "Machine Learning Concepts",
    nodes: [
      {
        id: 1,
        label: "Machine Learning",
        type: "main",
        x: 400,
        y: 200,
        description: "A subset of AI that enables computers to learn from data"
      },
      {
        id: 2,
        label: "Supervised Learning",
        type: "category",
        x: 200,
        y: 100,
        description: "Learning with labeled training data"
      },
      {
        id: 3,
        label: "Unsupervised Learning",
        type: "category",
        x: 600,
        y: 100,
        description: "Learning patterns from unlabeled data"
      },
      {
        id: 4,
        label: "Reinforcement Learning",
        type: "category",
        x: 400,
        y: 50,
        description: "Learning through interaction and rewards"
      },
      {
        id: 5,
        label: "Classification",
        type: "subcategory",
        x: 100,
        y: 200,
        description: "Predicting discrete categories"
      },
      {
        id: 6,
        label: "Regression",
        type: "subcategory",
        x: 300,
        y: 200,
        description: "Predicting continuous values"
      },
      {
        id: 7,
        label: "Clustering",
        type: "subcategory",
        x: 500,
        y: 200,
        description: "Grouping similar data points"
      },
      {
        id: 8,
        label: "Neural Networks",
        type: "method",
        x: 200,
        y: 300,
        description: "Networks inspired by biological neurons"
      },
      {
        id: 9,
        label: "Decision Trees",
        type: "method",
        x: 400,
        y: 350,
        description: "Tree-like models for decision making"
      },
      {
        id: 10,
        label: "Deep Learning",
        type: "advanced",
        x: 600,
        y: 300,
        description: "Neural networks with multiple layers"
      }
    ],
    connections: [
      { from: 1, to: 2, label: "includes" },
      { from: 1, to: 3, label: "includes" },
      { from: 1, to: 4, label: "includes" },
      { from: 2, to: 5, label: "uses" },
      { from: 2, to: 6, label: "uses" },
      { from: 3, to: 7, label: "uses" },
      { from: 2, to: 8, label: "implements" },
      { from: 1, to: 9, label: "implements" },
      { from: 8, to: 10, label: "evolves to" },
      { from: 5, to: 8, label: "can use" },
      { from: 6, to: 8, label: "can use" }
    ]
  };

  const generateConceptMap = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for concept mapping');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setConceptMap(mockConceptMap);
    setIsGenerating(false);
    toast.success('Concept map generated successfully!');
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'main': return 'bg-blue-500 border-blue-600';
      case 'category': return 'bg-green-500 border-green-600';
      case 'subcategory': return 'bg-purple-500 border-purple-600';
      case 'method': return 'bg-orange-500 border-orange-600';
      case 'advanced': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getNodeSize = (type) => {
    switch (type) {
      case 'main': return 'w-32 h-16';
      case 'category': return 'w-28 h-14';
      case 'subcategory': return 'w-24 h-12';
      case 'method': return 'w-24 h-12';
      case 'advanced': return 'w-26 h-13';
      default: return 'w-20 h-10';
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetView = () => {
    setZoomLevel(1);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl">
              <Network className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Concept Mapper
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualize complex topics with AI-generated concept maps and knowledge graphs
          </p>
        </motion.div>

        {!conceptMap ? (
          /* Setup Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Concept Map</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Subject
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Machine Learning, Photosynthesis, World War II..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-teal-50 rounded-xl p-4">
                  <h3 className="font-semibold text-teal-800 mb-2">What you'll get:</h3>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• Visual representation of key concepts</li>
                    <li>• Relationships between different ideas</li>
                    <li>• Hierarchical organization of topics</li>
                    <li>• Interactive exploration of connections</li>
                  </ul>
                </div>

                <button
                  onClick={generateConceptMap}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generating Concept Map...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-6 w-6" />
                      <span>Generate AI Concept Map</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Concept Map View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{conceptMap.title}</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={zoomOut}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={zoomIn}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={resetView}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => toast.success('Concept map downloaded!')}
                    className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setConceptMap(null)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Concept Map Canvas */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div 
                className="relative w-full h-96 bg-gray-50"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
              >
                <svg className="absolute inset-0 w-full h-full">
                  {/* Connections */}
                  {conceptMap.connections.map((connection, index) => {
                    const fromNode = conceptMap.nodes.find(n => n.id === connection.from);
                    const toNode = conceptMap.nodes.find(n => n.id === connection.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <g key={index}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke="#6B7280"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 - 5}
                          textAnchor="middle"
                          className="text-xs fill-gray-600"
                        >
                          {connection.label}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Arrow marker */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#6B7280"
                      />
                    </marker>
                  </defs>
                </svg>

                {/* Nodes */}
                {conceptMap.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      selectedNode === node.id ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    style={{ left: node.x, top: node.y }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    <div className={`${getNodeSize(node.type)} ${getNodeColor(node.type)} text-white rounded-lg border-2 flex items-center justify-center shadow-lg`}>
                      <span className="text-xs font-medium text-center px-2">
                        {node.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Details */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-white rounded-2xl shadow-xl p-6"
              >
                {(() => {
                  const node = conceptMap.nodes.find(n => n.id === selectedNode);
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{node.label}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getNodeColor(node.type)}`}>
                          {node.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{node.description}</p>
                      
                      {/* Related Concepts */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Related Concepts:</h4>
                        <div className="flex flex-wrap gap-2">
                          {conceptMap.connections
                            .filter(conn => conn.from === selectedNode || conn.to === selectedNode)
                            .map((conn, index) => {
                              const relatedNodeId = conn.from === selectedNode ? conn.to : conn.from;
                              const relatedNode = conceptMap.nodes.find(n => n.id === relatedNodeId);
                              return (
                                <button
                                  key={index}
                                  onClick={() => setSelectedNode(relatedNodeId)}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                                >
                                  {relatedNode.label}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Legend */}
            <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { type: 'main', label: 'Main Topic' },
                  { type: 'category', label: 'Category' },
                  { type: 'subcategory', label: 'Subcategory' },
                  { type: 'method', label: 'Method' },
                  { type: 'advanced', label: 'Advanced' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${getNodeColor(item.type)}`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ConceptMapper;