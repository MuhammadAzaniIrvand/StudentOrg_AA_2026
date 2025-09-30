import { Linkedin, Mail, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import leader1 from '@/assets/leader-1.jpg';
import leader2 from '@/assets/leader-2.jpg';

const Leadership = () => {
  const leaders = [
    {
      name: 'Sarah Chen',
      position: 'President',
      major: 'Computer Science',
      year: 'Senior',
      image: leader1,
      bio: 'Passionate about technology and community building. Leading initiatives in diversity and inclusion.',
      social: {
        linkedin: '#',
        email: 'sarah.chen@university.edu',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Johnson',
      position: 'Vice President',
      major: 'Business Administration',
      year: 'Junior',
      image: leader2,
      bio: 'Focused on organizational growth and strategic partnerships with local businesses.',
      social: {
        linkedin: '#',
        email: 'marcus.j@university.edu',
        twitter: '#'
      }
    }
  ];

  const boardMembers = [
    { name: 'Emily Rodriguez', position: 'Secretary', major: 'Psychology' },
    { name: 'David Kim', position: 'Treasurer', major: 'Economics' },
    { name: 'Aisha Patel', position: 'Events Coordinator', major: 'Marketing' },
    { name: 'Jordan Williams', position: 'Community Outreach', major: 'Social Work' },
    { name: 'Lisa Zhang', position: 'Communications Director', major: 'Journalism' },
    { name: 'Alex Thompson', position: 'Membership Chair', major: 'Political Science' }
  ];

  return (
    <section id="leadership" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary">Our Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated students who lead our organization and drive our mission forward. 
            Our diverse leadership team brings together different perspectives and expertise.
          </p>
        </div>

        {/* Executive Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Executive Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, index) => (
              <Card key={index} className="card-gradient shadow-elegant card-hover border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover transition-smooth hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-primary mb-1">{leader.name}</h4>
                      <p className="text-accent font-semibold mb-1">{leader.position}</p>
                      <p className="text-sm text-muted-foreground">
                        {leader.major} • {leader.year}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                      {leader.bio}
                    </p>

                    <div className="flex justify-center space-x-3">
                      <Button variant="outline" size="sm" className="p-2">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Board Members */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-elegant">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Board Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-muted/20 hover:bg-muted/30 transition-smooth">
                <div className="w-16 h-16 hero-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-primary mb-1">{member.name}</h4>
                <p className="text-accent text-sm font-medium mb-1">{member.position}</p>
                <p className="text-muted-foreground text-sm">{member.major}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Opportunities */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-primary mb-4">Interested in Leadership?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              We're always looking for passionate students who want to make a difference. 
              Leadership positions become available each academic year through our election process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="hero-gradient text-white border-0">
                Learn About Elections
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Leadership Development Program
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;