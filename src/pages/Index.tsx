
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PatternGenerator from '@/components/PatternGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 px-6 bg-lavender/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-lavender-dark mb-4">Knitopia</h1>
            <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
              Create beautiful, unique knitting patterns with our AI-powered pattern generator.
            </p>
          </div>
        </section>
        
        <PatternGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
