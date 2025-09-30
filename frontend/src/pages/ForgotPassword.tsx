import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const { requestLoginToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestLoginToken(nim, email);
      toast({ title: 'Kode terkirim', description: 'Kode verifikasi telah dikirim ke email anda.' });
      // Redirect to token login and carry nim+email in state so the page knows whom to log in
      navigate('/token-login', { state: { nim, email } });
    } catch (e: any) {
      const msg = e?.message || 'Akun tidak tersedia';
      const isNotFound = /Akun tidak tersedia/i.test(msg) || /404/.test(msg);
      toast({ title: isNotFound ? 'Akun tidak tersedia' : 'Gagal', description: isNotFound ? 'NIM dan email tidak cocok dengan data kami.' : msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle>Login dengan Token</CardTitle>
            <CardDescription>Masukkan NIM dan email untuk menerima kode token.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              <div>
                <Label htmlFor="nim">NIM</Label>
                <Input id="nim" value={nim} onChange={(e) => setNim(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Token'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;


