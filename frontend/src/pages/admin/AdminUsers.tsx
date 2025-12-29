import React, { useEffect, useState } from 'react';
import { apiClient, User } from '@/lib/api'; // Pastikan import User juga
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast'; // Tambahkan toast untuk feedback

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      // Gunakan apiClient yang sudah benar URL-nya
      const response = await apiClient.getUsers();
      if (response.success && response.data) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Gagal memuat user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memuat data pengguna.",
      });
    }
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
      // Gunakan apiClient untuk update role juga
      await apiClient.updateUserRole(userId, role);
      toast({
        title: "Berhasil",
        description: "Role pengguna berhasil diperbarui.",
      });
      await load();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Gagal mengubah role pengguna.",
      });
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
                    <TableRow key={u.id || u._id}> {/* Handle id/underscore id */}
                      <TableCell className="font-medium">{u.nim}</TableCell>
                      <TableCell>{u.nama}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Select defaultValue={u.role} onValueChange={(val) => updateRole(u.id || u._id, val)}>
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
                        <Button variant="outline" size="sm" disabled={saving === (u.id || u._id)} onClick={() => updateRole(u.id || u._id, u.role)}>
                          {saving === (u.id || u._id) ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Tidak ada data pengguna.
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

export default AdminUsers;


