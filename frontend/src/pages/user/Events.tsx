import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';
import { apiClient, EventItemApi } from '@/lib/api';
import config from '@/config/env';
import { useToast } from '@/hooks/use-toast';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const { toast } = useToast();
  const [events, setEvents] = useState<EventItemApi[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.listEvents();
        setEvents(res.data?.events || []);
      } catch (e: any) {
        toast({ title: 'Gagal memuat event', description: e.message || 'Terjadi kesalahan', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Rapat', label: 'Rapat' },
    { value: 'Pelatihan', label: 'Pelatihan' },
    { value: 'Bazar', label: 'Bazar' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Lainnya', label: 'Lainnya' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge variant="secondary">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge variant="outline">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (event.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, filterCategory]);

  const handleRegister = async (eventId: string) => {
    try {
      await apiClient.rsvpEvent(eventId);
      toast({ title: 'Berhasil', description: 'Anda terdaftar pada event ini.' });
      // Optimistic increment attendeeCount locally
      setEvents(prev => prev.map(ev => ev._id === eventId ? { ...ev, attendeeCount: (ev.attendeeCount || 0) + 1 } : ev));
    } catch (e: any) {
      toast({ title: 'Gagal mendaftar', description: e.message || 'Terjadi kesalahan', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Kegiatan Koperasi</h1>
            <p className="text-gray-600">Daftar kegiatan dan acara koperasi</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari kegiatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event._id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={event.poster ? `${config.assetsBaseUrl}/uploads/berkas/${event.poster}` : ''}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{event.category || 'Event'}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : (event.time || '-')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      {(event.attendeeCount || 0)} peserta
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      onClick={() => handleRegister(event._id)}
                    >
                      Daftar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada kegiatan ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba ubah filter atau kata kunci pencarian Anda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
