import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShieldX, ArrowLeft } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ShieldX className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Akses Ditolak
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Anda tidak memiliki izin untuk mengakses halaman ini
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Error 403</CardTitle>
            <CardDescription>
              Akses tidak diizinkan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <ShieldX className="h-4 w-4" />
              <AlertDescription>
                Anda tidak memiliki hak akses untuk mengakses halaman ini. 
                Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
              </AlertDescription>
            </Alert>

            <div className="pt-4 space-y-2">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Ke Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;
