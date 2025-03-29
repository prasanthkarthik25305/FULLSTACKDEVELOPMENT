import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';

const specialties = [
  { id: 1, name: 'Cardiac Sciences' },
  { id: 2, name: 'Neuro Sciences' },
  { id: 3, name: 'Orthopedic' },
  { id: 4, name: 'Pediatrics' },
  { id: 5, name: 'Gynecology' },
  { id: 6, name: 'Surgical Services' },
  { id: 7, name: 'Gastroenterology' }, 
  { id: 8, name: 'Pulmonology' },
  { id: 9, name: 'Urology' }
];

const CenterOfExcellence = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1672&auto=format&fit=crop';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,#f0f7ff,transparent)]"></div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle 
          title="Centers of Excellence" 
          subtitle="Our specialized departments offer cutting-edge treatments and exceptional care across a wide range of medical fields."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <div 
              className={cn(
                "relative rounded-2xl overflow-hidden shadow-elevation transition-opacity duration-700",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-health-blue/20 to-transparent mix-blend-overlay"></div>
              
              {!imageLoaded && (
                <div className="aspect-[4/5] w-full bg-gray-200 animate-pulse"></div>
              )}
              
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1672&auto=format&fit=crop"
                alt="Doctor with holographic medical display" 
                className="w-full aspect-[4/5] object-cover"
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-medium text-lg">Advanced Medical Technology</p>
                <p className="text-white/80 text-sm">State-of-the-art diagnostics and treatments</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col justify-center animate-fade-in opacity-0" style={{animationDelay: '200ms'}}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specialties.map((specialty, index) => (
                <div 
                  key={specialty.id} 
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${200 + (index * 100)}ms` }}
                >
                  <AnimatedButton 
                    variant="specialty"
                    className="w-full h-full min-h-[80px] specialty-button-grid-item"
                  >
                    {specialty.name}
                  </AnimatedButton>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center animate-fade-in opacity-0" style={{animationDelay: '1100ms'}}>
              <AnimatedButton variant="cta" size="lg">
                View All Specialties
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CenterOfExcellence;
