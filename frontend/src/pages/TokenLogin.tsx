import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const TokenLogin: React.FC = () => {
  const { loginWithToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const [nim] = useState(state?.nim || '');
  const [email] = useState(state?.email || '');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithToken(nim, email, otp);
      toast({ title: 'Berhasil', description: 'Login berhasil.' });
      navigate(from, { replace: true });
    } catch (e: any) {
      toast({ title: 'Gagal', description: e.message || 'Kode token salah', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle>Masuk dengan Token</CardTitle>
            <CardDescription>Masukkan kode token 6 digit yang dikirim ke email Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              {/* NIM and Email are taken from navigation state; no input necessary */}
              <div>
                <Label htmlFor="otp">Kode Token</Label>
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenLogin;


