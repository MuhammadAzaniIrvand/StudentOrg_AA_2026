import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PendingApproval: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Clock className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Menunggu Persetujuan
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Akun Anda sedang dalam proses persetujuan
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status Pendaftaran</CardTitle>
            <CardDescription>
              Informasi status akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Akun Anda dengan NIM <strong>{user?.nim}</strong> sedang menunggu persetujuan dari admin. 
                Anda akan menerima notifikasi melalui email setelah akun disetujui.
              </AlertDescription>
            </Alert>

            {user?.status === 'rejected' && (
              <Alert variant="destructive">
                <AlertDescription>
                  Akun Anda ditolak. Silakan hubungi admin untuk informasi lebih lanjut.
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingApproval;
