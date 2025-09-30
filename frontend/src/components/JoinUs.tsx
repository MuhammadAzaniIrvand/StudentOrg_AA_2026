import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    year: '',
    message: ''
  });
  const { toast } = useToast();

  const benefits = [
    'Leadership development opportunities',
    'Professional networking events',
    'Community service projects',
    'Academic support and tutoring',
    'Exclusive workshops and seminars',
    'Mentorship programs',
    'Social events and activities',
    'Resume-building experiences'
  ];

  const requirements = [
    'Currently enrolled student',
    'Minimum 2.5 GPA',
    'Commitment to attend monthly meetings',
    'Participate in at least 2 events per semester'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll contact you within 48 hours.",
    });
    setFormData({ name: '', email: '', major: '', year: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="join" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary">Join Our Community</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to be part of something bigger? Join hundreds of students who are making 
            a difference on campus and in their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Membership Benefits */}
          <div className="space-y-8">
            <Card className="card-gradient shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-accent" />
                  Membership Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 hero-gradient rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="text-primary">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="card-gradient shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="text-primary">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">info@studentorg.university.edu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Student Union Building, Room 205</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card className="card-gradient shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-primary">Apply for Membership</CardTitle>
              <p className="text-muted-foreground">
                Fill out this form to express your interest in joining our organization.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Major *
                    </label>
                    <Input
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Academic Year *
                    </label>
                    <Input
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g., Sophomore"
                      required
                      className="transition-smooth focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Why do you want to join? (Optional)
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="transition-smooth focus:border-primary"
                    placeholder="Tell us about your interests and what you hope to gain from membership..."
                  />
                </div>

                <Button type="submit" className="w-full hero-gradient text-white border-0 py-6">
                  Submit Application
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="hero-gradient rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
              Join us at our next info session to learn more about membership opportunities 
              and meet current members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Attend Info Session
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Follow Us on Social Media
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;