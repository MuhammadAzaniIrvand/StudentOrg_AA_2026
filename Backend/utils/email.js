const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
const sendEmail = async (options) => {
  try {
    const message = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  registrationSuccess: (nama) => ({
    subject: 'Pendaftaran Berhasil - Menunggu Persetujuan',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">Koperasi Mahasiswa UIN Sunan Gunung Jati Bandung</h2>
        <h3>Pendaftaran Berhasil Diterima</h3>
        <p>Assalamu'alaikum ${nama},</p>
        <p>Terima kasih telah mendaftar sebagai anggota Koperasi Mahasiswa UIN SGD Bandung.</p>
        <p>Data pendaftaran Anda telah berhasil diterima dan sedang dalam proses verifikasi oleh tim PSDA.</p>
        <p>Kami akan mengirimkan email konfirmasi setelah proses verifikasi selesai.</p>
        <br>
        <p>Wassalamu'alaikum warahmatullahi wabarakatuh</p>
        <p><strong>Tim Koperasi Mahasiswa UIN SGD Bandung</strong></p>
      </div>
    `
  }),

  approved: (nama) => ({
    subject: 'Selamat! Pendaftaran Anda Telah Disetujui',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">Koperasi Mahasiswa UIN Sunan Gunung Jati Bandung</h2>
        <h3 style="color: #28a745;">Pendaftaran Disetujui</h3>
        <p>Assalamu'alaikum ${nama},</p>
        <p>Alhamdulillah, pendaftaran Anda sebagai anggota Koperasi Mahasiswa UIN SGD Bandung telah <strong>DISETUJUI</strong>.</p>
        <p>Anda sekarang sudah dapat login ke sistem dan menikmati layanan koperasi.</p>
        <p>Silakan login kembali untuk mengakses fitur anggota.</p>
        <br>
        <p>Selamat bergabung dengan keluarga besar Koperasi Mahasiswa!</p>
        <p>Wassalamu'alaikum warahmatullahi wabarakatuh</p>
        <p><strong>Tim Koperasi Mahasiswa UIN SGD Bandung</strong></p>
      </div>
    `
  }),

  rejected: (nama, reason) => ({
    subject: 'Pemberitahuan Status Pendaftaran',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">Koperasi Mahasiswa UIN Sunan Gunung Jati Bandung</h2>
        <h3 style="color: #dc3545;">Pendaftaran Belum Dapat Disetujui</h3>
        <p>Assalamu'alaikum ${nama},</p>
        <p>Mohon maaf, pendaftaran Anda sebagai anggota Koperasi Mahasiswa UIN SGD Bandung belum dapat disetujui.</p>
        <p><strong>Alasan:</strong> ${reason}</p>
        <p>Anda dapat mendaftar kembali setelah melengkapi persyaratan yang diperlukan.</p>
        <p>Jika ada pertanyaan, silakan hubungi kami.</p>
        <br>
        <p>Wassalamu'alaikum warahmatullahi wabarakatuh</p>
        <p><strong>Tim Koperasi Mahasiswa UIN SGD Bandung</strong></p>
      </div>
    `
  }),

  resetPassword: (nama, resetUrl) => ({
    subject: 'Reset Password - Koperasi Mahasiswa UIN SGD Bandung',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">Koperasi Mahasiswa UIN Sunan Gunung Jati Bandung</h2>
        <h3>Reset Password</h3>
        <p>Assalamu'alaikum ${nama},</p>
        <p>Anda telah meminta untuk mereset password akun Koperasi Mahasiswa Anda.</p>
        <p>Klik tombol di bawah ini untuk mengatur password baru:</p>
        <br>
        <div style="text-align: center;">
          <a href="${resetUrl}" style="background-color: #2c5530; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <br>
        <p>Link ini akan berlaku selama 10 menit. Jika Anda tidak meminta reset password, abaikan email ini.</p>
        <p>Wassalamu'alaikum warahmatullahi wabarakatuh</p>
        <p><strong>Tim Koperasi Mahasiswa UIN SGD Bandung</strong></p>
      </div>
    `
  })
};

module.exports = { sendEmail, emailTemplates };