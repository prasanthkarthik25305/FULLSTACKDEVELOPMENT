
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop',
    experience: '15+ years experience',
    description: 'Specializing in interventional cardiology with expertise in complex cardiac procedures.'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop',
    experience: '12+ years experience',
    description: 'Expert in neurological disorders with advanced training in stroke management and neuro-interventions.'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1470&auto=format&fit=crop',
    experience: '10+ years experience',
    description: 'Dedicated to providing comprehensive care for children with a focus on developmental pediatrics.'
  }
];

const DoctorsCare = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadImages = async () => {
      const promises = doctors.map((doctor) => {
        return new Promise<number>((resolve) => {
          const img = new Image();
          img.src = doctor.image;
          img.onload = () => resolve(doctor.id);
        });
      });

      const loadedIds = await Promise.all(promises);
      const loadedState = loadedIds.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as Record<number, boolean>);
      
      setImagesLoaded(loadedState);
    };

    loadImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
  };

  return (
    <section id="doctors" className="py-20 bg-gray-50 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,#f9fbff,transparent)]"></div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle 
          title="Our Expert Doctors" 
          subtitle="Our team of highly skilled and experienced medical professionals is dedicated to providing personalized care and treatment."
          highlightColor="bg-health-orange/10"
        />
        
        <div className="mt-12">
          <div className="carousel-container overflow-hidden">
            <div 
              className="carousel-track flex transition-transform duration-500" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {doctors.map((doctor, index) => (
                <div key={doctor.id} className="carousel-item w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-elevation overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-auto">
                        {!imagesLoaded[doctor.id] && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        )}
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className={cn(
                            "h-full w-full object-cover transition-opacity duration-500",
                            imagesLoaded[doctor.id] ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-health-blue bg-health-blue/10 rounded-full">
                          {doctor.specialty}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                        <p className="text-sm text-health-blue font-medium mb-4">{doctor.experience}</p>
                        <p className="text-gray-600 mb-6">{doctor.description}</p>
                        <div className="mt-auto">
                          <Link to="/book-appointment">
                            <AnimatedButton variant="secondary" size="sm">
                              Book Appointment
                            </AnimatedButton>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={handlePrev} 
              className="carousel-button"
              aria-label="Previous doctor"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={handleNext} 
              className="carousel-button"
              aria-label="Next doctor"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-elevation">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="animate-fade-in opacity-0" style={{animationDelay: '200ms'}}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Patient Care</h3>
              <p className="text-gray-600 mb-6">
                We believe in a patient-centered approach to healthcare, providing individualized treatment plans and personalized care for every patient. Our team works closely with you to understand your unique health needs and goals.
              </p>
              <ul className="space-y-3">
                {['Individualized treatment plans', 'Comprehensive health assessments', 'Regular follow-up care', 'Patient education and support'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-health-blue mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-fade-in opacity-0" style={{animationDelay: '400ms'}}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Medical Technology</h3>
              <p className="text-gray-600 mb-6">
                Our hospital is equipped with state-of-the-art medical technology and facilities to ensure accurate diagnoses and effective treatments. We continually invest in the latest medical innovations to provide the highest standard of care.
              </p>
              <ul className="space-y-3">
                {['Cutting-edge diagnostic equipment', 'Minimally invasive surgical techniques', 'Digital health records for seamless care', 'Telemedicine options for remote consultations'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-health-blue mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsCare;
