# Struktur Folder Berdasarkan Role

## 📁 Struktur Folder

```
frontend/src/
├── pages/
│   ├── user/                    # Halaman untuk role 'user'
│   │   ├── UserDashboard.tsx    # Dashboard anggota
│   │   ├── Savings.tsx          # Manajemen simpanan
│   │   ├── Loans.tsx            # Manajemen pinjaman
│   │   ├── Events.tsx           # Kegiatan koperasi
│   │   ├── Profile.tsx          # Profil anggota
│   │   └── UserRoutes.tsx       # Routing untuk user
│   │
│   ├── admin/                   # Halaman untuk role 'admin'
│   │   ├── AdminDashboard.tsx   # Dashboard admin
│   │   ├── ManageMembers.tsx    # Manajemen anggota
│   │   └── AdminRoutes.tsx      # Routing untuk admin
│   │
│   ├── psda/                    # Halaman untuk role 'psda'
│   │   ├── PSDADashboard.tsx    # Dashboard PSDA
│   │   ├── FinancialReports.tsx # Laporan keuangan
│   │   └── PSDARoutes.tsx       # Routing untuk PSDA
│   │
│   └── [shared pages]           # Halaman yang digunakan bersama
│
├── components/
│   ├── layouts/                 # Layout untuk setiap role
│   │   ├── UserLayout.tsx       # Layout untuk user
│   │   ├── AdminLayout.tsx      # Layout untuk admin
│   │   └── PSDALayout.tsx       # Layout untuk PSDA
│   │
│   ├── RoleRouter.tsx           # Router berdasarkan role
│   └── [other components]
│
└── [other folders]
```

## 🔐 Role-Based Access Control

### User Role (`user`)
- **Path**: `/user/*`
- **Features**:
  - Dashboard anggota
  - Manajemen simpanan
  - Manajemen pinjaman
  - Daftar kegiatan
  - Profil pribadi

### Admin Role (`admin`)
- **Path**: `/admin/*`
- **Features**:
  - Dashboard admin
  - Manajemen anggota
  - Persetujuan pendaftaran
  - Laporan keuangan
  - Pengaturan sistem

### PSDA Role (`psda`)
- **Path**: `/psda/*`
- **Features**:
  - Dashboard PSDA
  - Monitoring keuangan
  - Laporan regulator
  - Audit dan compliance
  - Manajemen data

## 🚀 Routing System

### Main Routes
```typescript
// App.tsx
<Route path="/dashboard/*" element={<ProtectedRoute><RoleRouter /></ProtectedRoute>} />
<Route path="/user/*" element={<ProtectedRoute requireRole="user"><RoleRouter /></ProtectedRoute>} />
<Route path="/admin/*" element={<ProtectedRoute requireRole="admin"><RoleRouter /></ProtectedRoute>} />
<Route path="/psda/*" element={<ProtectedRoute requireRole="psda"><RoleRouter /></ProtectedRoute>} />
```

### Role-Specific Routes
```typescript
// UserRoutes.tsx
<Routes>
  <Route path="/" element={<UserDashboard />} />
  <Route path="/savings" element={<Savings />} />
  <Route path="/loans" element={<Loans />} />
  <Route path="/events" element={<Events />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
```

## 🎨 Layout System

### UserLayout
- Sidebar dengan menu: Dashboard, Simpanan, Pinjaman, Kegiatan, Profil
- Mobile-responsive dengan hamburger menu
- User info di sidebar

### AdminLayout
- Sidebar dengan menu: Dashboard, Manajemen Anggota, Simpanan, Pinjaman, Laporan, Pengaturan
- Admin-specific navigation
- Role indicator di sidebar

### PSDALayout
- Sidebar dengan menu: Dashboard, Monitoring Keuangan, Laporan Keuangan, Manajemen Data, Audit, Laporan Regulator
- PSDA-specific navigation
- Data management focus

## 🔄 Navigation Flow

1. **Login** → Redirect to `/{role}/dashboard`
2. **Role Detection** → RoleRouter determines which routes to render
3. **Layout Application** → Appropriate layout is applied
4. **Page Rendering** → Role-specific pages are rendered

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly navigation
- Consistent UI across all roles

## 🛡️ Security Features

- Role-based route protection
- Automatic redirect based on user role
- Unauthorized access prevention
- Session management per role

## 🔧 Adding New Pages

### For User Role:
1. Create page in `pages/user/`
2. Add route in `UserRoutes.tsx`
3. Add navigation item in `UserLayout.tsx`

### For Admin Role:
1. Create page in `pages/admin/`
2. Add route in `AdminRoutes.tsx`
3. Add navigation item in `AdminLayout.tsx`

### For PSDA Role:
1. Create page in `pages/psda/`
2. Add route in `PSDARoutes.tsx`
3. Add navigation item in `PSDALayout.tsx`

## 📊 Benefits

1. **Organized Code**: Clear separation of concerns
2. **Scalable**: Easy to add new features per role
3. **Maintainable**: Role-specific code is isolated
4. **Secure**: Role-based access control
5. **User-Friendly**: Tailored experience per role
