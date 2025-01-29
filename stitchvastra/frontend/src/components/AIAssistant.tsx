import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Ruler, 
  Palette, 
  Camera,
  Image as ImageIcon,
  Shirt
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

type AIFeature = 'design' | 'measurement' | 'virtual-try-on' | 'fabric' | 'chat';

interface AIFeatureOption {
  id: AIFeature;
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const initialMessage: Message = {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm VastraAI, your personal fashion assistant. How can I help you today?",
    timestamp: new Date()
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const features: AIFeatureOption[] = [
    {
      id: 'design',
      icon: Sparkles,
      title: 'Design Recommendations',
      description: 'Get personalized design suggestions based on your style and preferences'
    },
    {
      id: 'measurement',
      icon: Ruler,
      title: 'Measurement Assistant',
      description: 'Get guided measurements using your device camera'
    },
    {
      id: 'virtual-try-on',
      icon: Shirt,
      title: 'Virtual Try-On',
      description: 'Visualize how designs will look on you'
    },
    {
      id: 'fabric',
      icon: Palette,
      title: 'Fabric Selector',
      description: 'Find the perfect fabric for your design'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      attachments: selectedImage ? [selectedImage] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(input, selectedFeature),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, feature: AIFeature | null): string => {
    switch (feature) {
      case 'design':
        return "Based on your preferences, I recommend a contemporary Anarkali design with intricate maggam work. Would you like to see some options?";
      case 'measurement':
        return "I'll guide you through taking accurate measurements. Please ensure you're in a well-lit room and standing straight.";
      case 'virtual-try-on':
        return "I've processed your photo. Would you like to try on our latest collection of designer sarees?";
      case 'fabric':
        return "For your occasion, I recommend silk brocade fabric. It's perfect for the weather and will complement the design beautifully.";
      default:
        return "I understand you need assistance. How can I help you today?";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 flex flex-col max-h-[600px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">VastraAI</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your Fashion Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedFeature ? (
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors group text-left"
              >
                <feature.icon className="h-6 w-6 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.content}
                  {message.attachments?.map((attachment, index) => (
                    <img
                      key={index}
                      src={attachment}
                      alt="Uploaded content"
                      className="mt-2 rounded-lg max-w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        {selectedImage && (
          <div className="mb-2 relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </form>
    </div>
  );
}