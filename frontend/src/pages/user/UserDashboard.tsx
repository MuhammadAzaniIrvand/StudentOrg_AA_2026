import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User, Mail, GraduationCap, Building, FileText, Calendar, CreditCard } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Anggota
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profil Saya
                </CardTitle>
                <CardDescription>
                  Informasi akun anggota
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{user?.nim}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{user?.fakultas}</span>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Anggota Aktif
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Keanggotaan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Keanggotaan
                </CardTitle>
                <CardDescription>
                  Status keanggotaan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    Aktif
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Anggota Koperasi Mahasiswa
                  </p>
                  <Button className="mt-4" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Simpanan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Simpanan
                </CardTitle>
                <CardDescription>
                  Tabungan dan investasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    Rp 0
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Total Simpanan
                  </p>
                  <Button className="mt-4" size="sm" variant="outline">
                    Kelola Simpanan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pinjaman */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pinjaman
                </CardTitle>
                <CardDescription>
                  Pinjaman dan cicilan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    Rp 0
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Total Pinjaman Aktif
                  </p>
                  <Button className="mt-4" size="sm" variant="outline">
                    Ajukan Pinjaman
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Kegiatan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Kegiatan
                </CardTitle>
                <CardDescription>
                  Acara dan kegiatan koperasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    0
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Kegiatan Mendatang
                  </p>
                  <Button className="mt-4" size="sm" variant="outline">
                    Lihat Jadwal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Laporan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Laporan
                </CardTitle>
                <CardDescription>
                  Laporan keuangan dan transaksi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    Laporan Simpanan
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    Laporan Pinjaman
                  </Button>
                  <Button className="w-full justify-start" variant="outline" size="sm">
                    Laporan Transaksi
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

export default UserDashboard;
