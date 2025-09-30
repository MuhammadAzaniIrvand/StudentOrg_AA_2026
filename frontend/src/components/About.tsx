import { Target, Heart, Lightbulb, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To create meaningful opportunities for student growth, leadership development, and positive campus impact.'
    },
    {
      icon: Heart,
      title: 'Community First',  
      description: 'Building lasting friendships and professional networks that extend far beyond graduation.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Encouraging creative thinking and innovative solutions to real-world challenges.'
    },
    {
      icon: Users2,
      title: 'Inclusive Leadership',
      description: 'Developing leaders who value diversity, equity, and inclusion in all their endeavors.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary">About Our Organization</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a dynamic student organization committed to fostering personal growth, 
            academic excellence, and community engagement. Since our founding, we've been 
            dedicated to creating opportunities that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="card-gradient shadow-elegant card-hover border-0">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">Our Story</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded in 2018 by a group of passionate students, our organization began with a simple 
                vision: to create a space where students could come together to learn, grow, and make 
                a lasting impact on their community.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Today, we're proud to be one of the most active and diverse student organizations on 
                campus, with members from all academic disciplines and backgrounds working together 
                toward common goals.
              </p>
              <div className="flex items-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Years Strong</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Departments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Student Led</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Academic Excellence</h4>
                <p className="text-sm text-muted-foreground">
                  Supporting members in achieving their academic goals through study groups, 
                  tutoring, and mentorship programs.
                </p>
              </div>
              <div className="bg-accent/5 p-6 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Professional Development</h4>
                <p className="text-sm text-muted-foreground">
                  Providing networking opportunities, workshops, and career guidance to 
                  prepare members for success after graduation.
                </p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Community Service</h4>
                <p className="text-sm text-muted-foreground">
                  Organizing volunteer initiatives and service projects that make a positive 
                  impact on our local community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;