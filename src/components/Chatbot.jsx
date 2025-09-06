
import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
import Icon from './AppIcon';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const chatbotResponses = {
    'hello': 'Hi there! How can I help you today?',
    'help': 'I can help with questions about our products, shipping, and returns. What do you need help with?',
    'products': 'You can browse our products on the marketplace page. Is there a specific product you are looking for?',
    'shipping': 'We offer standard and express shipping. Standard shipping takes 3-5 business days, and express shipping takes 1-2 business days.',
    'returns': 'We have a 30-day return policy. If you are not satisfied with your purchase, you can return it for a full refund.',
    'default': "I'm sorry, I don't understand. Can you please rephrase your question?"
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { sender: 'user', text: inputValue };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const botResponse = {
        sender: 'bot',
        text: getBotResponse(inputValue)
      };

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 500);

      setInputValue('');
    }
  };

  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    for (const keyword in chatbotResponses) {
      if (lowerCaseInput.includes(keyword)) {
        return chatbotResponses[keyword];
      }
    }
    return chatbotResponses['default'];
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);


  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-5 w-80 h-96 bg-card rounded-lg shadow-lg flex flex-col z-50">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold text-foreground">EcoFinds Assistant</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon name="X" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'bot'
                  ? 'bg-surface text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
