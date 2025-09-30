import React, { useEffect, useState } from 'react';
import { apiClient, EventItemApi } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const PSDAEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItemApi[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.listEvents();
      setEvents(res.data?.events || []);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Gagal memuat event', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus event ini?')) return;
    try {
      await apiClient.deleteEvent(id);
      toast({ title: 'Berhasil', description: 'Event dihapus' });
      loadEvents();
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Gagal menghapus event', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0D776B]">Manajemen Event</h1>
              <p className="text-gray-600">Kelola event koperasi</p>
            </div>
            <Button onClick={() => navigate('/psda/events/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Event
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Event</CardTitle>
              <CardDescription>Event terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Poster</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Peserta</TableHead>
                    <TableHead>Absensi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((ev) => (
                    <TableRow key={ev._id}>
                      <TableCell>
                        {ev.poster ? (
                          <img src={`/uploads/berkas/${ev.poster}`} alt={ev.title} className="w-16 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{ev.title}</TableCell>
                      <TableCell>{ev.category || '-'}</TableCell>
                      <TableCell>{new Date(ev.date).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>{ev.startTime && ev.endTime ? `${ev.startTime} - ${ev.endTime}` : (ev.time || '-')}</TableCell>
                      <TableCell>{ev.location}</TableCell>
                      <TableCell>{typeof ev.attendeeCount === 'number' ? ev.attendeeCount : (ev as any).attendance?.length || 0}</TableCell>
                      <TableCell>{ev.enableAttendance ? 'Aktif' : 'Nonaktif'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => navigate(`/psda/events/${ev._id}`)}>
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(ev._id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {events.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500">
                        Belum ada event
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PSDAEvents;


