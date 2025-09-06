import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PayoutSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const payoutData = {
    available: 247.85,
    pending: 89.50,
    thisMonth: 1247.30,
    lastPayout: {
      amount: 156.75,
      date: "Dec 28, 2024",
      method: "Bank Transfer"
    }
  };

  const recentTransactions = [
    {
      id: 1,
      item: "Vintage Leather Jacket",
      buyer: "Sarah Chen",
      amount: 85.00,
      fee: 8.50,
      net: 76.50,
      date: "Jan 3, 2025",
      status: "completed"
    },
    {
      id: 2,
      item: "MacBook Pro 2019",
      buyer: "Mike Rodriguez",
      amount: 650.00,
      fee: 65.00,
      net: 585.00,
      date: "Jan 2, 2025",
      status: "pending"
    },
    {
      id: 3,
      item: "Ceramic Plant Pots Set",
      buyer: "Emma Thompson",
      amount: 45.00,
      fee: 4.50,
      net: 40.50,
      date: "Dec 30, 2024",
      status: "completed"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success text-success-foreground', label: 'Completed' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      processing: { color: 'bg-accent text-accent-foreground', label: 'Processing' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Payout Overview */}
      <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Earnings Overview</h3>
            <p className="text-sm text-muted-foreground">Track your sales and payouts</p>
          </div>
          <Button variant="default" iconName="Download" iconPosition="left">
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="DollarSign" size={24} className="text-success-foreground" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-1">
              ${payoutData?.available}
            </h4>
            <p className="text-sm text-muted-foreground">Available for Payout</p>
          </div>

          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={24} className="text-warning-foreground" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-1">
              ${payoutData?.pending}
            </h4>
            <p className="text-sm text-muted-foreground">Pending Clearance</p>
          </div>

          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="TrendingUp" size={24} className="text-primary-foreground" />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-1">
              ${payoutData?.thisMonth}
            </h4>
            <p className="text-sm text-muted-foreground">This Month's Sales</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">Last Payout</p>
              <p className="text-sm text-muted-foreground">
                ${payoutData?.lastPayout?.amount} on {payoutData?.lastPayout?.date}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Request Payout
          </Button>
        </div>
      </div>
      {/* Transaction History */}
      <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <div className="flex space-x-2">
            {['week', 'month', 'year']?.map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-organic ${
                  selectedPeriod === period
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-foreground hover:bg-secondary'
                }`}
              >
                {period?.charAt(0)?.toUpperCase() + period?.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Buyer</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sale Price</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Fee</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Net Earnings</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions?.map(transaction => (
                <tr key={transaction?.id} className="border-b border-border hover:bg-surface transition-organic">
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{transaction?.item}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-foreground">{transaction?.buyer}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-medium text-foreground">${transaction?.amount}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="text-muted-foreground">-${transaction?.fee}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-bold text-success">${transaction?.net}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-muted-foreground">{transaction?.date}</p>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(transaction?.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-surface rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Payout Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Payouts are processed weekly on Fridays</li>
                <li>• Minimum payout amount is $25</li>
                <li>• Platform fee is 10% of sale price</li>
                <li>• Tax documents available in February for previous year</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSection;