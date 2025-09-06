import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Maria Garcia', role: 'Head of Sustainability', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Sam Wilson', role: 'Lead Developer', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - EcoFinds</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission: Sustainable Living Made Simple</h1>
              <p className="text-md sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                At EcoFinds, we are dedicated to making sustainable choices accessible to everyone. We believe that a greener lifestyle starts with small, conscious decisions. Our platform connects you with eco-friendly products and a community that shares your values.
              </p>
            </div>

            {/* Our Story Section */}
            <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  EcoFinds started as a small project by a group of friends passionate about environmental conservation. We were frustrated by how difficult it was to find genuinely sustainable products and a community that cared. We decided to build a platform that would bring together eco-conscious buyers and sellers, fostering a marketplace built on trust and a shared commitment to the planet.
                </p>
                <p className="text-muted-foreground">
                  Today, EcoFinds is a thriving community, offering a wide range of sustainable goods, from fashion to home decor. We are proud to be a part of the solution, helping to reduce waste and promote a circular economy.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1466629437334-b4f660653916?w=800&h=600&fit=crop" alt="Our Story" className="rounded-xl shadow-lg" />
              </div>
            </div>

            {/* Meet the Team Section */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Meet the Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Values Section */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <Icon name="Leaf" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">We are committed to promoting products and practices that are environmentally friendly and sustainable.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Icon name="Users" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">We foster a supportive and engaged community of buyers and sellers who share a passion for sustainable living.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Icon name="ShieldCheck" size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Trust</h3>
                  <p className="text-muted-foreground">We prioritize transparency and trust, ensuring that all products on our platform meet our sustainability standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
