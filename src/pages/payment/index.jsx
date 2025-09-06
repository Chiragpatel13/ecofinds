import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PaymentPage = () => {
  // Mock data for cart items
  const cartItems = [
    { id: 1, name: 'Vintage Levi\'s 501', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
    { id: 2, name: 'Organic Cotton T-Shirt', price: 24.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <>
      <Helmet>
        <title>Checkout - EcoFinds</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1 order-last lg:order-first">
                <div className="bg-card border border-border rounded-xl p-4 sm:p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-6 pt-6 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-semibold">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Shipping</p>
                      <p className="font-semibold">${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                  
                  <div className="mb-6">
                    <div className="flex space-x-2 sm:space-x-4 border-b border-border text-sm sm:text-base">
                      <button className="py-3 px-2 sm:px-4 font-medium text-primary border-b-2 border-primary">
                        <Icon name="CreditCard" className="inline-block mr-1 sm:mr-2" />
                        Credit Card
                      </button>
                      <button className="py-3 px-2 sm:px-4 font-medium text-muted-foreground hover:text-foreground">
                        <Icon name="Paypal" className="inline-block mr-1 sm:mr-2" />
                        PayPal
                      </button>
                    </div>
                  </div>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-muted-foreground mb-1">Card Number</label>
                        <input type="text" id="cardNumber" className="w-full bg-input border border-border rounded-lg px-3 py-2" placeholder="•••• •••• •••• ••••" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-muted-foreground mb-1">Expiry Date</label>
                        <input type="text" id="expiryDate" className="w-full bg-input border border-border rounded-lg px-3 py-2" placeholder="MM / YY" />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-muted-foreground mb-1">CVC</label>
                        <input type="text" id="cvc" className="w-full bg-input border border-border rounded-lg px-3 py-2" placeholder="•••" />
                      </div>
                    </div>
                    <div>
                        <label htmlFor="cardHolder" className="block text-sm font-medium text-muted-foreground mb-1">Card Holder</label>
                        <input type="text" id="cardHolder" className="w-full bg-input border border-border rounded-lg px-3 py-2" placeholder="John Doe" />
                    </div>
                    <div className="pt-4">
                      <Button fullWidth size="lg" type="submit">
                        Pay ${total.toFixed(2)}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
