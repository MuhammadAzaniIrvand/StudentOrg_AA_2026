import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CreditCard, TrendingUp, Download, Eye } from 'lucide-react';

const Savings: React.FC = () => {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock data - replace with actual API calls
  const savingsData = {
    totalBalance: 2500000,
    monthlyDeposit: 500000,
    interestRate: 6.5,
    lastDeposit: '2024-01-15'
  };

  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 500000,
      date: '2024-01-15',
      description: 'Setoran bulanan',
      status: 'completed'
    },
    {
      id: '2',
      type: 'interest',
      amount: 13542,
      date: '2024-01-01',
      description: 'Bunga bulanan',
      status: 'completed'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 1000000,
      date: '2023-12-15',
      description: 'Setoran awal',
      status: 'completed'
    }
  ];

  const getTransactionType = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Badge variant="default">Setoran</Badge>;
      case 'withdraw':
        return <Badge variant="destructive">Penarikan</Badge>;
      case 'interest':
        return <Badge variant="secondary">Bunga</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const handleDeposit = () => {
    console.log('Deposit amount:', depositAmount);
    // Implement deposit logic
    setIsDepositDialogOpen(false);
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    console.log('Withdraw amount:', withdrawAmount);
    // Implement withdraw logic
    setIsWithdrawDialogOpen(false);
    setWithdrawAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Simpanan Saya</h1>
            <p className="text-gray-600">Kelola simpanan dan tabungan Anda</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Saldo
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(savingsData.totalBalance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Saldo saat ini
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Setoran Bulanan
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(savingsData.monthlyDeposit)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Rata-rata per bulan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Suku Bunga
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savingsData.interestRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Per tahun
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Setoran Terakhir
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savingsData.lastDeposit}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tanggal setoran
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>
                  Lakukan transaksi simpanan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Setor Uang
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Setor Uang</DialogTitle>
                      <DialogDescription>
                        Masukkan jumlah uang yang ingin disetor
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="deposit-amount">Jumlah Setoran</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="Masukkan jumlah"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleDeposit} className="w-full">
                        Setor Uang
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Tarik Uang
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tarik Uang</DialogTitle>
                      <DialogDescription>
                        Masukkan jumlah uang yang ingin ditarik
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="withdraw-amount">Jumlah Penarikan</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="Masukkan jumlah"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleWithdraw} className="w-full">
                        Tarik Uang
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Laporan
                </Button>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>
                  Daftar transaksi simpanan terbaru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Keterangan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{getTransactionType(transaction.type)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
