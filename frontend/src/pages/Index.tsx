import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Leadership from '../components/Leadership';
import JoinUs from '../components/JoinUs';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Events />
      <Leadership />
      {/*<JoinUs />*/}
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">StudentOrg</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Empowering students to build tomorrow through community, leadership, and service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-primary-foreground/80 hover:text-white transition-smooth">About Us</a>
                <a href="#events" className="block text-primary-foreground/80 hover:text-white transition-smooth">Events</a>
                <a href="#leadership" className="block text-primary-foreground/80 hover:text-white transition-smooth">Leadership</a>
                <a href="#join" className="block text-primary-foreground/80 hover:text-white transition-smooth">Join Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Student Union Building</p>
                <p>Room 205</p>
                <p>info@studentorg.university.edu</p>
                <p>(555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2024 StudentOrg. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
