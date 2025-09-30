import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const PSDAApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [reason, setReason] = useState('');

  const load = async () => {
    const res = await apiClient.getApplication(id!);
    setData(res.data?.application || null);
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleApprove = async () => {
    await apiClient.approveApplication(id!);
    toast({ title: 'Berhasil', description: 'Pendaftaran disetujui' });
    navigate('/psda/applications');
  };

  const handleReject = async () => {
    await apiClient.rejectApplication(id!, reason);
    toast({ title: 'Ditolak', description: 'Pendaftaran ditolak' });
    navigate('/psda/applications');
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Detail Pendaftar</CardTitle>
              <CardDescription>Verifikasi dokumen dan data pendaftar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-2 font-medium">Data Pribadi</div>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-gray-500">Nama:</span> {data.nama}</div>
                    <div><span className="text-gray-500">NIM:</span> {data.nim}</div>
                    <div><span className="text-gray-500">Email:</span> {data.email}</div>
                    <div><span className="text-gray-500">Fakultas:</span> {data.fakultas}</div>
                    <div><span className="text-gray-500">Jurusan:</span> {data.jurusan}</div>
                    <div><span className="text-gray-500">Status:</span> <Badge variant="secondary">{data.status}</Badge></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 font-medium">Dokumen</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">KTM</div>
                      <a href={data.ktmFile ? `/uploads/ktm/${data.ktmFile}` : '#'} target="_blank" rel="noreferrer">
                        <img src={data.ktmFile ? `/uploads/ktm/${data.ktmFile}` : ''} alt="KTM" className="w-full h-24 object-cover bg-gray-200" />
                      </a>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Berkas</div>
                      <a href={data.berkasFile ? `/uploads/berkas/${data.berkasFile}` : '#'} target="_blank" rel="noreferrer">
                        <img src={data.berkasFile ? `/uploads/berkas/${data.berkasFile}` : ''} alt="Berkas" className="w-full h-24 object-cover bg-gray-200" />
                      </a>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Foto</div>
                      <a href={data.fotoProfile ? `/uploads/foto/${data.fotoProfile}` : '#'} target="_blank" rel="noreferrer">
                        <img src={data.fotoProfile ? `/uploads/foto/${data.fotoProfile}` : ''} alt="Foto" className="w-full h-24 object-cover bg-gray-200" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleApprove}>Setujui</Button>
                <div className="space-y-2">
                  <Textarea placeholder="Alasan penolakan (opsional)" value={reason} onChange={(e) => setReason(e.target.value)} />
                  <Button variant="destructive" onClick={handleReject}>Tolak</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PSDAApplicationDetail;


