import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import goodTeamIllustration from '@/assets/team checklist-amico.svg';

// --- Komponen untuk File Upload ---
type FileUploadPreviewProps = {
  id: 'ktm' | 'berkas' | 'foto';
  label: string;
  previewUrl: string | null;
  fileName: string | undefined;
  onFileChange: (field: 'ktm' | 'berkas' | 'foto', file: File | null) => void;
  previewType?: 'avatar' | 'image';
};

const FileUploadPreview: React.FC<FileUploadPreviewProps> = ({
  id,
  label,
  previewUrl,
  fileName,
  onFileChange,
  previewType = 'image',
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(id, e.target.files?.[0] || null);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1">
        {!previewUrl ? (
          // Tampilan Awal (Sebelum Upload)
          <label
            htmlFor={id}
            className="relative flex justify-center w-full px-3 py-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500"
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-6 w-6 text-gray-400" />
              <div className="flex text-xs text-gray-600">
                <span className="font-medium text-indigo-600">Upload file</span>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
            </div>
            <input
              id={id}
              name={id}
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleInputChange}
            />
          </label>
        ) : (
          // Tampilan Setelah Upload (Diperbarui)
          <div className="flex items-center gap-4 p-2 border border-gray-300 rounded-md">
            {/* Bagian gambar sekarang menjadi tautan untuk melihat detail */}
            <a href={previewUrl} target="_blank" rel="noopener noreferrer" title="Klik untuk lihat detail">
              <img
                src={previewUrl}
                alt={`Preview ${label}`}
                className={
                  previewType === 'avatar'
                    ? "h-14 w-14 rounded-full object-cover border hover:opacity-80 transition-opacity"
                    : "h-14 w-20 rounded-md object-cover border hover:opacity-80 transition-opacity"
                }
              />
            </a>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-800 truncate" title={fileName}>
                {fileName}
              </p>
              {/* Label ini sekarang menjadi satu-satunya pemicu untuk mengganti file */}
              <label 
                htmlFor={id} 
                className="text-xs font-medium text-indigo-600 cursor-pointer hover:underline"
              >
                Ganti file
              </label>
            </div>
            <input
              id={id}
              name={id}
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};


const registerSchema = z.object({
  nim: z.string().min(1, 'NIM wajib diisi'),
  nama: z.string().min(1, 'Nama lengkap wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  fakultas: z.string().min(1, 'Fakultas wajib dipilih'),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak sama",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

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

// --- Komponen Utama Register ---
const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<{
    ktm: File | null;
    berkas: File | null;
    foto: File | null;
  }>({
    ktm: null,
    berkas: null,
    foto: null,
  });

  const [previews, setPreviews] = useState<{
    ktm: string | null;
    berkas: string | null;
    foto: string | null;
  }>({
    ktm: null,
    berkas: null,
    foto: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleFileChange = (field: 'ktm' | 'berkas' | 'foto', file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    
    if (previews[field]) {
      URL.revokeObjectURL(previews[field] as string);
    }
    
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [field]: newPreviewUrl }));
    } else {
      setPreviews(prev => ({ ...prev, [field]: null }));
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (!files.ktm || !files.berkas || !files.foto) {
      toast({
        title: "Error",
        description: "Semua file (KTM, berkas pendukung, dan foto profil) wajib diupload",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nim', data.nim);
      formData.append('nama', data.nama);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('fakultas', data.fakultas);
      formData.append('jurusan', data.jurusan);
      formData.append('ktm', files.ktm);
      formData.append('berkas', files.berkas);
      formData.append('foto', files.foto);

      await registerUser(formData);
      
      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun Anda telah terdaftar. Silakan tunggu konfirmasi dari admin.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Kiri: Form pendaftaran */}
        <div>
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-[#0D776B] text-center">Daftar Akun</h2>
          </div>

          <Card className="shadow-xl shadow-black/2">
            <CardContent className="pt-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 [&_input]:h-8 [&_input]:py-1 [&_input]:text-sm [&_input]:bg-white [&_input::placeholder]:text-xs">
                {/* NIM */}
                <div>
                  <Label htmlFor="nim">NIM</Label>
                  <Input
                    id="nim"
                    type="text"
                    {...register('nim')}
                    className={errors.nim ? 'border-red-500' : ''}
                  />
                  {errors.nim && (
                    <p className="mt-1 text-sm text-red-600">{errors.nim.message}</p>
                  )}
                </div>

                {/* Nama */}
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    type="text"
                    {...register('nama')}
                    placeholder="Nama lengkap"
                    className={`${errors.nama ? 'border-red-500' : ''} placeholder:text-xs`}
                  />
                  {errors.nama && (
                    <p className="mt-1 text-sm text-red-600">{errors.nama.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className={`${errors.email ? 'border-red-500' : ''} placeholder:text-xs bg-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Fakultas */}
                <div>
                  <Label htmlFor="fakultas">Fakultas</Label>
                  <Select onValueChange={(value) => setValue('fakultas', value)}>
                    <SelectTrigger 
                    className={`
                        ${errors.fakultas ? 'border-red-500' : ''}
                        h-8 text-sm bg-white focus:ring-1 focus:ring-[#00710A] focus:border-[#00710A]
                      `}>
                      <SelectValue placeholder="Pilih fakultas" />
                    </SelectTrigger>
                    <SelectContent>
                      {fakultasOptions.map((fakultas) => (
                        <SelectItem
                          key={fakultas}
                          value={fakultas}
                          className="focus:bg-[#00710A] focus:text-white hover:bg-[#00710A]/90 hover:text-white"
                        >
                          {fakultas}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.fakultas && (
                    <p className="mt-1 text-sm text-red-600">{errors.fakultas.message}</p>
                  )}
                </div>

                {/* Jurusan */}
                <div>
                  <Label htmlFor="jurusan">Jurusan</Label>
                  <Input
                    id="jurusan"
                    type="text"
                    {...register('jurusan')}
                    className={errors.jurusan ? 'border-red-500' : ''}
                  />
                  {errors.jurusan && (
                    <p className="mt-1 text-sm text-red-600">{errors.jurusan.message}</p>
                  )}
                </div>

                {/* File Uploads */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-medium">Upload Dokumen</h3>
                  
                  <FileUploadPreview
                    id="ktm"
                    label="Kartu Tanda Mahasiswa (KTM)"
                    previewUrl={previews.ktm}
                    fileName={files.ktm?.name}
                    onFileChange={handleFileChange}
                  />

                  <FileUploadPreview
                    id="berkas"
                    label="Berkas Pendukung"
                    previewUrl={previews.berkas}
                    fileName={files.berkas?.name}
                    onFileChange={handleFileChange}
                  />

                  <FileUploadPreview
                    id="foto"
                    label="Foto Profil"
                    previewUrl={previews.foto}
                    fileName={files.foto?.name}
                    onFileChange={handleFileChange}
                    previewType="avatar"
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-9 text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mendaftar...
                    </>
                  ) : (
                    'Daftar'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{' '}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanan: Ilustrasi dan deskripsi */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-end">
          <p
            className="mb-10 text-2xl md:text-4xl font-medium text-[#0D776B] max-w-xl leading-tight"
          >
            Bergabunglah dengan kami!
          </p>
          <img
            src={goodTeamIllustration}
            alt="Ilustrasi tim"
            className="w-full max-w-lg md:max-w-xl h-auto drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;