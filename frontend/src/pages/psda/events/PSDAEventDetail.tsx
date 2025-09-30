import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient, EventItemApi } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Pencil } from 'lucide-react';
import config from '@/config/env';
import { useToast } from '@/hooks/use-toast';

interface EventWithAttendance extends EventItemApi {
  attendance?: Array<{ user: string; nim?: string; nama?: string; attendedAt?: string }>;
}

const PSDAEventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<EventWithAttendance | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await apiClient.getEvent(id);
        setEvent(res.data?.event as any);
      } catch (e: any) {
        toast({ title: 'Gagal memuat event', description: e.message || 'Terjadi kesalahan', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (!event && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Button variant="outline" onClick={() => navigate('/psda/events')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
            </Button>
            <p className="mt-6 text-gray-600">Event tidak ditemukan.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/psda/events')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
            </Button>
            <Button onClick={() => navigate(`/psda/events/${id}/edit`)}>
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{event?.title}</CardTitle>
                  <CardDescription>{event?.description}</CardDescription>
                </div>
                {event?.category && <Badge>{event.category}</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {event?.poster ? (
                    <img
                      src={`${config.assetsBaseUrl}/uploads/berkas/${event.poster}`}
                      alt={event.title}
                      className="w-full rounded-md border"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded" />
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700"><Calendar className="h-4 w-4 mr-2" />{new Date(event!.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <div className="flex items-center text-gray-700"><Clock className="h-4 w-4 mr-2" />{event?.startTime && event?.endTime ? `${event.startTime} - ${event.endTime}` : (event?.time || '-')} WIB</div>
                  <div className="flex items-center text-gray-700"><MapPin className="h-4 w-4 mr-2" />{event?.location}</div>
                  <div className="flex items-center text-gray-700"><Users className="h-4 w-4 mr-2" />{event?.attendeeCount || event?.attendance?.length || 0} peserta</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Pendaftar</CardTitle>
              <CardDescription>Peserta yang mendaftar pada event ini</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Waktu Daftar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(event?.attendance || []).map((a, idx) => (
                    <TableRow key={`${a.user}-${idx}`}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{a.nim || '-'}</TableCell>
                      <TableCell>{a.nama || '-'}</TableCell>
                      <TableCell>{a.attendedAt ? new Date(a.attendedAt).toLocaleString('id-ID') : '-'}</TableCell>
                    </TableRow>
                  ))}
                  {(!event?.attendance || event.attendance.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-500">Belum ada pendaftar</TableCell>
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

export default PSDAEventDetail;


