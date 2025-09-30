import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const PSDAEventForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Workshop',
    date: '',
    time: '',
    startTime: '',
    endTime: '',
    location: '',
    enableAttendance: true,
  });
  const [poster, setPoster] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      try {
        const res = await apiClient.getEvent(id!);
        const ev = res.data?.event;
        if (ev) {
          setForm({
            title: ev.title || '',
            description: ev.description || '',
            category: ev.category || 'Workshop',
            date: ev.date ? String(ev.date).slice(0, 10) : '',
            time: ev.time || '',
            startTime: ev.startTime || '',
            endTime: ev.endTime || '',
            location: ev.location || '',
            enableAttendance: Boolean(ev.enableAttendance),
          });
        }
      } catch (e: any) {
        toast({ title: 'Error', description: e.message || 'Gagal memuat event', variant: 'destructive' });
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await apiClient.updateEvent(id!, {
          ...form,
          poster,
        });
        toast({ title: 'Berhasil', description: 'Event diperbarui' });
      } else {
        await apiClient.createEvent({
          ...form,
          poster,
          date: form.date,
        });
        toast({ title: 'Berhasil', description: 'Event dibuat' });
      }
      navigate('/psda/events');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Gagal menyimpan event', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>{isEdit ? 'Edit Event' : 'Tambah Event'}</CardTitle>
              <CardDescription>Isi detail event koperasi</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Tanggal</Label>
                    <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Mulai</Label>
                    <Input id="startTime" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="endTime">Selesai</Label>
                    <Input id="endTime" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="attendance" checked={form.enableAttendance} onCheckedChange={(v) => setForm({ ...form, enableAttendance: v })} />
                  <Label htmlFor="attendance">Aktifkan Absensi</Label>
                </div>
                <div>
                  <Label htmlFor="poster">Poster (gambar)</Label>
                  <Input id="poster" type="file" accept="image/*" onChange={(e) => setPoster(e.target.files?.[0] || null)} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => navigate('/psda/events')}>Batal</Button>
                  <Button type="submit" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PSDAEventForm;


