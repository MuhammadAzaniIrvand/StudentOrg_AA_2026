import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Users, UserCheck, UserX, FileText, CreditCard, BarChart3, Settings, Clock, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          apiClient.getAdminStats(),
          apiClient.getActivityLogs(1, 10)
        ]);
        
        if (statsRes.success) setStats(statsRes.data);
        if (logsRes.success) setLogs(logsRes.data?.logs || []);
      } catch (error) {
        console.error("Gagal memuat dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="p-8 text-center">Memuat Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
              <p className="text-gray-600">
                Selamat datang, {user?.nama}!
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.stats?.total || 0}</div>
                <p className="text-xs text-muted-foreground">Mahasiswa terdaftar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.stats?.pending || 0}</div>
                <p className="text-xs text-muted-foreground">Perlu tindakan segera</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.stats?.approved || 0}</div>
                <p className="text-xs text-muted-foreground">Anggota aktif</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                <UserX className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.stats?.rejected || 0}</div>
                <p className="text-xs text-muted-foreground">Pendaftaran ditolak</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Log Aktivitas Terbaru */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Log Aktivitas Terbaru
                </CardTitle>
                <CardDescription>
                  Memantau tindakan yang dilakukan oleh pengguna dan sistem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Waktu</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Aksi</TableHead>
                        <TableHead>Deskripsi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.length > 0 ? (
                        logs.map((log: any) => (
                          <TableRow key={log._id}>
                            <TableCell className="text-xs text-gray-500">
                              {new Date(log.createdAt).toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell className="font-medium text-sm">
                              {log.user?.nama || 'System'}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {log.action.replace(/_/g, ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {log.description}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                            Belum ada aktivitas tercatat.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Statistik Fakultas */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribusi Fakultas</CardTitle>
                <CardDescription>Jumlah pendaftar per fakultas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.facultyStats?.map((fac: any) => (
                    <div key={fac._id} className="flex items-center">
                      <div className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate max-w-[200px]" title={fac._id}>
                            {fac._id}
                          </span>
                          <span className="text-sm text-gray-500">{fac.count}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${(fac.count / stats.stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!stats?.facultyStats || stats.facultyStats.length === 0) && (
                    <div className="text-center text-gray-500 py-8">Belum ada data fakultas.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
