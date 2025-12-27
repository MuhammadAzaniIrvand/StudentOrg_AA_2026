import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Users, FileText, BarChart3, Settings, Shield } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const PSDADashboard: React.FC = () => {
  const { user, logout } = useAuth();

  

  const handleLogout = () => {
    logout();
  };

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [applicationStats, setApplicationStats] = React.useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [eventsTotal, setEventsTotal] = React.useState(0);
  const [eventsByMe, setEventsByMe] = React.useState(0);
  const [recentEvents, setRecentEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Applications counts by status (PSDA endpoints require auth)
        const [pendingRes, approvedRes, rejectedRes, allRes, eventsRes] = await Promise.all([
          apiClient.listApplications('pending').catch(() => null),
          apiClient.listApplications('approved').catch(() => null),
          apiClient.listApplications('rejected').catch(() => null),
          apiClient.listApplications().catch(() => null),
          apiClient.listEvents().catch(() => null)
        ]);

        const pending = pendingRes?.total ?? pendingRes?.count ?? pendingRes?.data?.applications?.length ?? 0;
        const approved = approvedRes?.total ?? approvedRes?.count ?? approvedRes?.data?.applications?.length ?? 0;
        const rejected = rejectedRes?.total ?? rejectedRes?.count ?? rejectedRes?.data?.applications?.length ?? 0;
        const total = allRes?.total ?? allRes?.count ?? allRes?.data?.applications?.length ?? (pending + approved + rejected);

        const events = eventsRes?.data?.events ?? [];
        const totalEvents = events.length;
        const mine = user ? events.filter((e: any) => String(e.createdBy) === String(user.id)).length : 0;
        const recent = events.slice(0, 5);

        if (!mounted) return;
        setApplicationStats({ total, pending, approved, rejected });
        setEventsTotal(totalEvents);
        setEventsByMe(mine);
        setRecentEvents(recent);
      } catch (err: any) {
        console.error('Failed to load PSDA dashboard stats:', err);
        setError(err?.message || 'Gagal memuat statistik');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadStats();
    return () => { mounted = false; };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard PSDA
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
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700">{`Gagal memuat beberapa data: ${error}`}</div>
        )}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Applications Total */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendaftar (Total)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Memuat...</div>
                ) : (
                  <div className="text-2xl font-bold">{applicationStats.total}</div>
                )}
                <p className="text-xs text-muted-foreground">Jumlah keseluruhan pendaftar</p>
              </CardContent>
            </Card>

            {/* Pending */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Memuat...</div>
                ) : (
                  <div className="text-2xl font-bold">{applicationStats.pending}</div>
                )}
                <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
              </CardContent>
            </Card>

            {/* Approved */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Memuat...</div>
                ) : (
                  <div className="text-2xl font-bold">{applicationStats.approved}</div>
                )}
                <p className="text-xs text-muted-foreground">Pendaftar yang disetujui</p>
              </CardContent>
            </Card>

            {/* Rejected */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Memuat...</div>
                ) : (
                  <div className="text-2xl font-bold">{applicationStats.rejected}</div>
                )}
                <p className="text-xs text-muted-foreground">Pendaftar yang ditolak</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Statistik Event */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Statistik Event
                </CardTitle>
                <CardDescription>
                  Ringkasan event dan daftar event terbaru
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {error && (
                  <div className="text-sm text-red-600">{error}</div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">Total Event</div>
                    <div className="text-2xl">{loading ? <Loader2 className="animate-spin" /> : eventsTotal}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">Event Dibuat Saya</div>
                    <div className="text-2xl">{loading ? <Loader2 className="animate-spin" /> : eventsByMe}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Event Terbaru</h3>
                  {loading ? (
                    <div className="flex items-center"><Loader2 className="animate-spin mr-2" /> Memuat...</div>
                  ) : recentEvents.length === 0 ? (
                    <div className="text-sm text-gray-500">Belum ada event</div>
                  ) : (
                    <ul className="space-y-2">
                      {recentEvents.map(ev => (
                        <li key={ev._id} className="text-sm">
                          <div className="font-medium">{ev.title}</div>
                          <div className="text-xs text-muted-foreground">{new Date(ev.date).toLocaleDateString()}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <a href="/psda/events">Kelola Event</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PSDADashboard;
