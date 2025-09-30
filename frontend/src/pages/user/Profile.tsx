import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, GraduationCap, Building, Camera, Save } from 'lucide-react';
import config from '@/config/env';
import { apiClient } from '@/lib/api';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: user?.nama || '',
    email: user?.email || '',
    fakultas: user?.fakultas || '',
    jurusan: user?.jurusan || '',
  });

  const fakultasOptions = [
    'Fakultas Adab dan Humaniora',
    'Fakultas Dakwah dan Komunikasi',
    'Fakultas Ekonomi dan Bisnis Islam',
    'Fakultas Ilmu Tarbiyah dan Keguruan',
    'Fakultas Psikologi',
    'Fakultas Sains dan Teknologi',
    'Fakultas Syariah dan Hukum',
    'Fakultas Ushuluddin'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Update user data
      const updatedUser = {
        ...user,
        ...formData
      };
      updateUser(updatedUser);
      
      toast({
        title: "Profil Berhasil Diperbarui",
        description: "Data profil Anda telah disimpan.",
      });
      
      setIsEditMode(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui profil. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      nama: user?.nama || '',
      email: user?.email || '',
      fakultas: user?.fakultas || '',
      jurusan: user?.jurusan || '',
    });
    setIsEditMode(false);
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const res = await apiClient.uploadProfilePhoto(file);
      if (res.success && res.data) {
        const filename = res.data.fotoProfile;
        if (user) {
          const updatedUser = { ...user, fotoProfile: filename };
          updateUser(updatedUser);
        }
        toast({
          title: "Foto Berhasil Diupload",
          description: "Foto profil Anda telah diperbarui.",
        });
      }
    } catch (err) {
      toast({
        title: "Gagal Upload Foto",
        description: "Silakan coba lagi.",
        variant: 'destructive',
      });
    } finally {
      setIsUploadDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil dan akun Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle>Foto Profil</CardTitle>
                <CardDescription>
                  Foto profil Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={user?.fotoProfile ? `${config.assetsBaseUrl}/uploads/foto/${user.fotoProfile}` : undefined} />
                    <AvatarFallback>
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Foto Profil</DialogTitle>
                        <DialogDescription>
                          Pilih foto baru untuk profil Anda
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handlePhotoUpload(file);
                            }
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Klik ikon kamera untuk mengubah foto
                </p>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Informasi Profil</CardTitle>
                    <CardDescription>
                      Data pribadi dan akademik Anda
                    </CardDescription>
                  </div>
                  {!isEditMode ? (
                    <Button onClick={() => setIsEditMode(true)}>
                      Edit Profil
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button onClick={handleCancel} variant="outline">
                        Batal
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NIM - Read Only */}
                <div>
                  <Label htmlFor="nim">NIM</Label>
                  <Input
                    id="nim"
                    value={user?.nim || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    NIM tidak dapat diubah
                  </p>
                </div>

                {/* Nama */}
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleInputChange('nama', e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Fakultas */}
                <div>
                  <Label htmlFor="fakultas">Fakultas</Label>
                  <Select
                    value={formData.fakultas}
                    onValueChange={(value) => handleInputChange('fakultas', value)}
                    disabled={!isEditMode}
                  >
                    <SelectTrigger className={!isEditMode ? 'bg-gray-50' : ''}>
                      <SelectValue placeholder="Pilih fakultas" />
                    </SelectTrigger>
                    <SelectContent>
                      {fakultasOptions.map((fakultas) => (
                        <SelectItem key={fakultas} value={fakultas}>
                          {fakultas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Jurusan */}
                <div>
                  <Label htmlFor="jurusan">Jurusan</Label>
                  <Input
                    id="jurusan"
                    value={formData.jurusan}
                    onChange={(e) => handleInputChange('jurusan', e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? 'bg-gray-50' : ''}
                  />
                </div>

                {/* Status */}
                <div>
                  <Label>Status Keanggotaan</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Anggota Aktif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
