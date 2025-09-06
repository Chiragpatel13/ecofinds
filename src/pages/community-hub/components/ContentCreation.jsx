import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCreation = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const contentTypes = [
    { key: 'post', label: 'Share Post', icon: 'MessageSquare' },
    { key: 'transformation', label: 'Transformation', icon: 'Sparkles' },
    { key: 'review', label: 'Item Review', icon: 'Star' },
    { key: 'tip', label: 'Styling Tip', icon: 'Lightbulb' }
  ];

  const popularTags = [
    'VintageFinds', 'SustainableFashion', 'TransformationTuesday', 'EcoFriendly',
    'SecondHandFirst', 'UpcycledStyle', 'ThriftFlip', 'CircularFashion',
    'VintageDecor', 'SustainableLiving', 'PreLovedTreasures', 'EcoWarrior'
  ];

  const templates = [
    {
      id: 1,
      name: 'Before & After',
      description: 'Perfect for transformations',
      icon: 'ArrowRight',
      preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop'
    },
    {
      id: 2,
      name: 'Styling Grid',
      description: 'Show multiple outfit options',
      icon: 'Grid3X3',
      preview: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=120&fit=crop'
    },
    {
      id: 3,
      name: 'Item Showcase',
      description: 'Highlight a single piece',
      icon: 'Focus',
      preview: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=120&fit=crop'
    }
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newImages = files?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file?.name
    }));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const removeImage = (imageId) => {
    setSelectedImages(selectedImages?.filter(img => img?.id !== imageId));
  };

  const toggleTag = (tag) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags?.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePost = () => {
    // Mock post creation
    console.log('Creating post:', {
      type: activeTab,
      content: postContent,
      images: selectedImages,
      tags: selectedTags
    });
    
    // Reset form
    setPostContent('');
    setSelectedImages([]);
    setSelectedTags([]);
  };

  return (
    <div className="bg-card rounded-lg shadow-organic overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="PenTool" size={20} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Create Content</h2>
            <p className="text-sm text-muted-foreground">Share your sustainable journey</p>
          </div>
        </div>
      </div>
      {/* Content Type Tabs */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          {contentTypes?.map((type) => (
            <button
              key={type?.key}
              onClick={() => setActiveTab(type?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-organic flex-1 justify-center ${
                activeTab === type?.key
                  ? 'bg-card text-foreground shadow-organic'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              <span className="hidden sm:inline">{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content Creation Form */}
      <div className="p-6 space-y-6">
        {/* Text Content */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {activeTab === 'post' && 'What\'s on your mind?'}
            {activeTab === 'transformation' && 'Tell us about your transformation'}
            {activeTab === 'review' && 'Share your item review'}
            {activeTab === 'tip' && 'Share your styling tip'}
          </label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e?.target?.value)}
            placeholder={
              activeTab === 'post' ? 'Share your sustainable finds, tips, or thoughts...' :
              activeTab === 'transformation' ? 'Describe the transformation process, materials used, and inspiration...' :
              activeTab === 'review'? 'How was the quality? Would you recommend it? Share your honest thoughts...' : 'What styling tip would you like to share with the community?'
            }
            rows={4}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {postContent?.length}/500 characters
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Smile" />
              <Button variant="ghost" size="sm" iconName="AtSign" />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Add Photos
          </label>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-organic">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB each
              </p>
            </label>
          </div>

          {/* Selected Images */}
          {selectedImages?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {selectedImages?.map((image) => (
                <div key={image?.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image?.preview}
                      alt={image?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(image?.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-organic"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Templates (for transformation posts) */}
        {activeTab === 'transformation' && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Choose Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {templates?.map((template) => (
                <div
                  key={template?.id}
                  className="border border-border rounded-lg p-3 hover:border-primary transition-organic cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden rounded-md mb-2">
                    <Image
                      src={template?.preview}
                      alt={template?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={template?.icon} size={16} className="text-primary" />
                    <h4 className="font-medium text-foreground text-sm">{template?.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{template?.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Add Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {popularTags?.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-organic ${
                  selectedTags?.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-foreground hover:bg-secondary/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          {selectedTags?.length > 0 && (
            <div className="mt-3 p-3 bg-surface rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Selected tags:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Privacy & Audience */}
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Globe" size={20} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Public Post</p>
              <p className="text-xs text-muted-foreground">Visible to all community members</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ChevronDown" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Save">
              Save Draft
            </Button>
            <Button variant="ghost" size="sm" iconName="Eye">
              Preview
            </Button>
          </div>
          <Button
            variant="default"
            onClick={handlePost}
            disabled={!postContent?.trim()}
            iconName="Send"
            iconPosition="right"
          >
            Share Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCreation;