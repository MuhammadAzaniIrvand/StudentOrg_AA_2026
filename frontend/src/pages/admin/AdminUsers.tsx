import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/admin/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    setUsers(data.data?.users || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter((u) =>
    (u.nama || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.nim || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  const updateRole = async (userId: string, role: string) => {
    setSaving(userId);
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ role })
      });
      await load();
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Role User</h1>
            <p className="text-gray-600">Ubah role pengguna: user, admin, psda</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Pengguna</CardTitle>
              <CardDescription>Pencarian berdasarkan nama, NIM, email</CardDescription>
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
                    <TableHead>Role</TableHead>
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
                      <TableCell>
                        <Select defaultValue={u.role} onValueChange={(val) => updateRole(u._id, val)}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="admin">admin</SelectItem>
                            <SelectItem value="psda">psda</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{u.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled={saving === u._id} onClick={() => updateRole(u._id, u.role)}>
                          {saving === u._id ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500">Tidak ada data</TableCell>
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

export default AdminUsers;


