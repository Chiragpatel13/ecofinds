import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PurchaseSection = ({ product, onAddToCart, onBuyNow, onMakeOffer }) => {
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 99.00, // INR
      duration: '5-7 business days',
      icon: 'Truck'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 199.00, // INR
      duration: '2-3 business days',
      icon: 'Zap'
    },
    {
      id: 'carbon-neutral',
      name: 'Carbon Neutral',
      price: 149.00, // INR
      duration: '5-7 business days',
      icon: 'Leaf'
    }
  ];

  const handleMakeOffer = () => {
    if (offerAmount && parseFloat(offerAmount) > 0) {
      onMakeOffer?.(parseFloat(offerAmount));
      setOfferAmount('');
      setShowOfferInput(false);
    }
  };

  // Format price in INR
  const formatPrice = (price) => {
    if (!price) return '₹0';
    return `₹${parseFloat(price)?.toLocaleString('en-IN')}`;
  };

  const selectedShippingOption = shippingOptions?.find(option => option?.id === selectedShipping);
  const totalPrice = (product?.price || 0) + (selectedShippingOption?.price || 0);
  const minOffer = product?.price ? product?.price * 0.7 : 0;
  const maxOffer = product?.price ? product?.price * 0.95 : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-24">
      {/* Price Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Item Price</span>
          <span className="font-semibold">{formatPrice(product?.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-semibold">{formatPrice(selectedShippingOption?.price)}</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
      {/* Shipping Options */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Shipping Options</h4>
        <div className="space-y-2">
          {shippingOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedShipping === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value={option?.id}
                checked={selectedShipping === option?.id}
                onChange={(e) => setSelectedShipping(e?.target?.value)}
                className="sr-only"
              />
              <Icon name={option?.icon} size={20} className="text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{option?.name}</div>
                <div className="text-sm text-muted-foreground">{option?.duration}</div>
              </div>
              <div className="font-semibold">{formatPrice(option?.price)}</div>
            </label>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          size="lg"
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={onBuyNow}
          className="bg-primary hover:bg-primary/90"
        >
          Buy Now
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          size="lg"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>

        {/* Make Offer Section */}
        {!showOfferInput ? (
          <Button
            variant="ghost"
            fullWidth
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => setShowOfferInput(true)}
          >
            Make an Offer
          </Button>
        ) : (
          <div className="space-y-2">
            <Input
              type="number"
              placeholder={`Enter offer (min ${formatPrice(minOffer)})`}
              value={offerAmount}
              onChange={(e) => setOfferAmount(e?.target?.value)}
              min={minOffer}
              max={maxOffer}
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleMakeOffer}
                className="flex-1"
              >
                Send Offer
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowOfferInput(false);
                  setOfferAmount('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Protection Features */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <h4 className="font-medium text-success mb-3 flex items-center">
          <Icon name="Shield" size={16} className="mr-2" />
          Buyer Protection
        </h4>
        <ul className="text-sm text-success/80 space-y-1">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Money-back guarantee</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Secure payment processing</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>Item authenticity verified</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={12} />
            <span>7-day return policy</span>
          </li>
        </ul>
      </div>
      {/* Quick Actions */}
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="Heart"
          className="flex-1"
        >
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          className="flex-1"
        >
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Flag"
          className="flex-1"
        >
          Report
        </Button>
      </div>
    </div>
  );
};

export default PurchaseSection;