import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const PSDAApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    const res = await apiClient.listApplications('pending');
    setApplications(res.data?.applications || []);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = applications.filter((a) =>
    (a.nama || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.nim || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0D776B]">Pendaftaran Menunggu</h1>
            <p className="text-gray-600">Review pendaftaran anggota baru</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>List Pendaftar</CardTitle>
              <CardDescription>Filter berdasarkan nama, NIM, atau email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIM</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fakultas</TableHead>
                    <TableHead>Jurusan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell className="font-medium">{u.nim}</TableCell>
                      <TableCell>{u.nama}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.fakultas}</TableCell>
                      <TableCell>{u.jurusan}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{u.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-primary hover:underline" onClick={() => navigate(`/psda/applications/${u._id}`)}>Detail</button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500">Tidak ada data</TableCell>
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

export default PSDAApplications;


