import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      buyer: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      item: "Vintage Leather Jacket",
      lastMessage: "Is this still available? I\'m very interested!",
      timestamp: "2 hours ago",
      unread: true,
      status: "active"
    },
    {
      id: 2,
      buyer: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      item: "MacBook Pro 2019",
      lastMessage: "Thank you for the quick response. When can I pick it up?",
      timestamp: "5 hours ago",
      unread: false,
      status: "pending"
    },
    {
      id: 3,
      buyer: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      item: "Ceramic Plant Pots Set",
      lastMessage: "Perfect! I\'ll take all three pots.",
      timestamp: "1 day ago",
      unread: false,
      status: "sold"
    }
  ];

  const messageTemplates = [
    "Thanks for your interest! This item is still available.",
    "I can offer a small discount for quick pickup.",
    "The item is in excellent condition as described.",
    "I\'m available for pickup this weekend.",
    "Let me know if you have any other questions!"
  ];

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "buyer",
      content: "Hi! I'm interested in your vintage leather jacket. Could you tell me more about the condition?",
      timestamp: "Yesterday 3:30 PM"
    },
    {
      id: 2,
      sender: "seller",
      content: "Hello! The jacket is in excellent condition with minimal wear. I've had it for about 2 years but rarely wore it. Happy to send more photos if needed!",
      timestamp: "Yesterday 4:15 PM"
    },
    {
      id: 3,
      sender: "buyer",
      content: "That sounds great! What's your best price? And would you be open to meeting somewhere convenient?",
      timestamp: "Today 10:20 AM"
    },
    {
      id: 4,
      sender: "seller",
      content: "I could do $85 (down from $95) for a quick sale. I'm flexible on meeting location - anywhere in downtown area works for me.",
      timestamp: "Today 11:45 AM"
    },
    {
      id: 5,
      sender: "buyer",
      content: "Is this still available? I'm very interested!",
      timestamp: "2 hours ago"
    }
  ] : [];

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      // Handle message sending logic
      setNewMessage('');
    }
  };

  const handleTemplateUse = (template) => {
    setNewMessage(template);
  };

  return (
    <div className="bg-card rounded-lg shadow-organic border border-border overflow-hidden">
      <div className="flex h-96">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Messages</h3>
            <p className="text-sm text-muted-foreground">3 active conversations</p>
          </div>
          
          <div className="overflow-y-auto h-full">
            {conversations?.map(conversation => (
              <div
                key={conversation?.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-border cursor-pointer transition-organic hover:bg-surface ${
                  selectedConversation?.id === conversation?.id ? 'bg-surface' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.buyer}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation?.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {conversation?.buyer}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {conversation?.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conversation?.item}
                    </p>
                    <p className="text-sm text-foreground truncate">
                      {conversation?.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={selectedConversation?.avatar}
                      alt={selectedConversation?.buyer}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {selectedConversation?.buyer}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        About: {selectedConversation?.item}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Phone">
                      Call
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreVertical">
                      More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map(message => (
                  <div
                    key={message?.id}
                    className={`flex ${message?.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message?.sender === 'seller' ?'bg-primary text-primary-foreground' :'bg-surface text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message?.content}</p>
                      <p className={`text-xs mt-1 ${
                        message?.sender === 'seller' ?'text-primary-foreground/70' :'text-muted-foreground'
                      }`}>
                        {message?.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2 mb-2">
                  {messageTemplates?.slice(0, 2)?.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleTemplateUse(template)}
                      className="px-3 py-1 bg-surface text-foreground rounded-full text-xs hover:bg-secondary transition-organic"
                    >
                      {template?.substring(0, 20)}...
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e?.target?.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    onClick={handleSendMessage}
                    disabled={!newMessage?.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium text-foreground mb-2">Select a conversation</h4>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the left to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;