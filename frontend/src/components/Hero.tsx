import { ArrowRight, Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamIllustration from '@/assets/team checklist-amico.svg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-left">
            <h1 className="hero-text mb-6">
              <span className="text-foreground">Empowering Students,</span>
              <br />
              <span className="text-primary">Building Tomorrow</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl leading-relaxed">
              Join a community of passionate students dedicated to making a difference on campus and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-muted-foreground">Active Members</div>
              </div>
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-muted-foreground">Events Per Year</div>
              </div>
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">10+</div>
                <div className="text-muted-foreground">Awards Won</div>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={teamIllustration}
              alt="Team checklist illustration"
              className="max-w-full lg:max-w-xl w-full h-auto drop-shadow-xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;