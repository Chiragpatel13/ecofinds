import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ListingCard = ({ listing, onEdit, onDelete, onPromote }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      sold: { color: 'bg-muted text-muted-foreground', label: 'Sold' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      pending: { color: 'bg-accent text-accent-foreground', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-organic overflow-hidden">
      <div className="relative">
        <Image 
          src={listing?.image} 
          alt={listing?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(listing?.status)}
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            onClick={() => onEdit(listing?.id)}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-organic"
          >
            <Icon name="Edit" size={16} className="text-foreground" />
          </button>
          <button 
            onClick={() => onDelete(listing?.id)}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-organic"
          >
            <Icon name="Trash2" size={16} className="text-error" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{listing?.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">${listing?.price}</span>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{listing?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{listing?.favorites}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Listed {listing?.listedDate}
          </span>
          {listing?.status === 'active' && (
            <Button 
              variant="outline" 
              size="sm"
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => onPromote(listing?.id)}
            >
              Promote
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;