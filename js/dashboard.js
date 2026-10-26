// 1. Konfigurasi Supabase
const supabaseUrl = 'https://uweenslijjanscmbwabq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZWVuc2xpamphbnNjbWJ3YWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NzA2NzQsImV4cCI6MjEwODM0NjY3NH0.Lq3cFfCB5ZsZ5CVMmdKb4bqXgAnNXrtft7zqH1jfTMI';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// ==========================================
// FUNGSI SISWA
// ==========================================
async function muatDataSiswa() {
    const tabelSiswa = document.getElementById('tabelDataSiswa');
    if (!tabelSiswa) return; 
    try {
        const { data, error } = await supabaseClient.from('siswa').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data.length === 0) return tabelSiswa.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada data siswa.</td></tr>';
        
        let barisHTML = '';
        data.forEach((siswa) => {
            const jk = siswa.jenis_kelamin === 'L' ? 'Laki-laki' : (siswa.jenis_kelamin === 'P' ? 'Perempuan' : '-');
            barisHTML += `<tr>
                <td class="px-4 fw-medium text-secondary">${siswa.nis}</td>
                <td><div class="d-flex align-items-center"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(siswa.nama_lengkap)}&background=random" class="rounded-circle me-3" width="32"><div><h6 class="mb-0 fw-semibold">${siswa.nama_lengkap}</h6><small class="text-muted">${siswa.email_ortu || '-'}</small></div></div></td>
                <td>${siswa.kelas}</td><td>${jk}</td>
                <td><span class="badge bg-success-subtle text-success px-2 py-1 rounded-pill">${siswa.status || 'Aktif'}</span></td>
                <td class="text-center"><button class="btn btn-sm btn-light text-warning me-1" onclick="siapkanEditSiswa('${siswa.id}')"><i class="fas fa-edit"></i></button><button class="btn btn-sm btn-light text-danger" onclick="hapusDataSiswa('${siswa.id}')"><i class="fas fa-trash"></i></button></td>
            </tr>`;
        });
        tabelSiswa.innerHTML = barisHTML;
    } catch (error) { tabelSiswa.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error: ${error.message}</td></tr>`; }
}

async function hapusDataSiswa(id) {
    if (confirm("Hapus data siswa ini?")) { await supabaseClient.from('siswa').delete().eq('id', id); muatDataSiswa(); }
}

window.siapkanEditSiswa = async function(id) {
    const { data } = await supabaseClient.from('siswa').select('*').eq('id', id).single();
    if (data) {
        document.getElementById('id_siswa_edit').value = data.id;
        document.getElementById('nis').value = data.nis;
        document.getElementById('nama_lengkap').value = data.nama_lengkap;
        document.getElementById('jenis_kelamin').value = data.jenis_kelamin;
        document.getElementById('kelas').value = data.kelas;
        document.getElementById('alamat').value = data.alamat;
        document.getElementById('email_ortu').value = data.email_ortu;
        document.getElementById('modalTambahLabel').innerText = "Edit Data Siswa";
        new bootstrap.Modal(document.getElementById('modalTambahSiswa')).show();
    }
};

// ==========================================
// FUNGSI GURU
// ==========================================
async function muatDataGuru() {
    const tabelGuru = document.getElementById('tabelDataGuru');
    if (!tabelGuru) return; 
    try {
        const { data, error } = await supabaseClient.from('guru').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data.length === 0) return tabelGuru.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada data guru.</td></tr>';
        
        let barisHTML = '';
        data.forEach((guru) => {
            barisHTML += `<tr>
                <td class="px-4 fw-medium text-secondary">${guru.nip}</td>
                <td><div class="d-flex align-items-center"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(guru.nama_lengkap)}&background=random" class="rounded-circle me-3" width="32"><h6 class="mb-0 fw-semibold">${guru.nama_lengkap}</h6></div></td>
                <td>${guru.mata_pelajaran || '-'}</td><td>${guru.no_hp || '-'}</td>
                <td><span class="badge bg-success-subtle text-success px-2 py-1 rounded-pill">${guru.status || 'Aktif'}</span></td>
                <td class="text-center"><button class="btn btn-sm btn-light text-warning me-1" onclick="siapkanEditGuru('${guru.id}')"><i class="fas fa-edit"></i></button><button class="btn btn-sm btn-light text-danger" onclick="hapusDataGuru('${guru.id}')"><i class="fas fa-trash"></i></button></td>
            </tr>`;
        });
        tabelGuru.innerHTML = barisHTML;
    } catch (error) { tabelGuru.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error: ${error.message}</td></tr>`; }
}

async function hapusDataGuru(id) {
    if (confirm("Hapus data guru ini?")) { await supabaseClient.from('guru').delete().eq('id', id); muatDataGuru(); }
}

window.siapkanEditGuru = async function(id) {
    const { data } = await supabaseClient.from('guru').select('*').eq('id', id).single();
    if (data) {
        document.getElementById('id_guru_edit').value = data.id;
        document.getElementById('nip').value = data.nip;
        document.getElementById('nama_guru').value = data.nama_lengkap;
        document.getElementById('mata_pelajaran').value = data.mata_pelajaran;
        document.getElementById('no_hp').value = data.no_hp;
        document.getElementById('alamat_guru').value = data.alamat;
        document.getElementById('modalGuruLabel').innerText = "Edit Data Guru";
        new bootstrap.Modal(document.getElementById('modalTambahGuru')).show();
    }
};

// ==========================================
// FUNGSI KELAS
// ==========================================
async function muatDataKelas() {
    const tabelKelas = document.getElementById('tabelDataKelas');
    if (!tabelKelas) return; 
    try {
        const { data, error } = await supabaseClient.from('kelas').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (data.length === 0) return tabelKelas.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-muted">Belum ada data kelas.</td></tr>';
        
        let barisHTML = '';
        data.forEach((kelas) => {
            barisHTML += `<tr>
                <td class="px-4 fw-bold text-primary">${kelas.nama_kelas}</td>
                <td><span class="badge bg-secondary">${kelas.tingkat}</span></td>
                <td><i class="fas fa-user-tie me-2 text-muted"></i>${kelas.wali_kelas || '-'}</td>
                <td class="text-center"><button class="btn btn-sm btn-light text-warning me-1" onclick="siapkanEditKelas('${kelas.id}')"><i class="fas fa-edit"></i></button><button class="btn btn-sm btn-light text-danger" onclick="hapusDataKelas('${kelas.id}')"><i class="fas fa-trash"></i></button></td>
            </tr>`;
        });
        tabelKelas.innerHTML = barisHTML;
    } catch (error) { tabelKelas.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error: ${error.message}</td></tr>`; }
}

async function hapusDataKelas(id) {
    if (confirm("Hapus data kelas ini?")) { await supabaseClient.from('kelas').delete().eq('id', id); muatDataKelas(); }
}

window.siapkanEditKelas = async function(id) {
    const { data } = await supabaseClient.from('kelas').select('*').eq('id', id).single();
    if (data) {
        document.getElementById('id_kelas_edit').value = data.id;
        document.getElementById('nama_kelas').value = data.nama_kelas;
        document.getElementById('tingkat_kelas').value = data.tingkat;
        document.getElementById('wali_kelas').value = data.wali_kelas;
        document.getElementById('modalKelasLabel').innerText = "Edit Data Kelas";
        new bootstrap.Modal(document.getElementById('modalTambahKelas')).show();
    }
};

// ==========================================
// INISIALISASI HALAMAN & EVENT LISTENER
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    // Fungsi yang sudah ada sebelumnya
    muatDataSiswa(); 
    muatDataGuru(); 
    muatDataKelas();

    // ++++++++++++++++++++++++++++++++++++++++++
    // TAMBAHKAN KODE STATISTIK INI DI SINI
    // ++++++++++++++++++++++++++++++++++++++++++
    async function muatStatistikDashboard() {
        const elSiswa = document.getElementById('totalSiswa');
        const elGuru = document.getElementById('totalGuru');
        const elKelas = document.getElementById('totalKelas');

        // Jika kita tidak ada di halaman index.html, hentikan fungsi ini
        if (!elSiswa && !elGuru && !elKelas) return; 

        try {
            // Kita minta Supabase MENGHITUNG (count) barisnya saja, tanpa mengunduh isinya (biar cepat)
            const { count: countSiswa } = await supabaseClient.from('siswa').select('*', { count: 'exact', head: true });
            const { count: countGuru } = await supabaseClient.from('guru').select('*', { count: 'exact', head: true });
            const { count: countKelas } = await supabaseClient.from('kelas').select('*', { count: 'exact', head: true });

            // Tempelkan hasil hitungannya ke layar HTML
            if (elSiswa) elSiswa.innerText = countSiswa || 0;
            if (elGuru) elGuru.innerText = countGuru || 0;
            if (elKelas) elKelas.innerText = countKelas || 0;
        } catch (error) {
            console.error("Gagal memuat statistik:", error.message);
        }
    }
    
    // Langsung jalankan fungsi hitungnya saat halaman dibuka
    muatStatistikDashboard();

    // Sidebar
    const menuToggle = document.getElementById("menu-toggle");
    const wrapper = document.getElementById("wrapper");
    if (menuToggle && wrapper) menuToggle.addEventListener("click", e => { e.preventDefault(); wrapper.classList.toggle("toggled"); });

    // Chart Dashboard
    const chartCanvas = document.getElementById('attendanceChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(13, 110, 253, 0.2)'); gradient.addColorStop(1, 'rgba(13, 110, 253, 0)');
        new Chart(ctx, { type: 'line', data: { labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'], datasets: [{ data: [92, 94, 91, 95, 96], backgroundColor: gradient, borderColor: '#0d6efd', fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 80, max: 100 }, x: { grid: { display: false } } } } });
    }

    // Modal & Simpan: Siswa
    const btnBukaSiswa = document.getElementById('btnBukaModalTambah');
    if (btnBukaSiswa) btnBukaSiswa.addEventListener('click', () => { document.getElementById('formTambahSiswa').reset(); document.getElementById('id_siswa_edit').value = ""; document.getElementById('modalTambahLabel').innerText = "Tambah Data Siswa Baru"; });
    const btnSimpanSiswa = document.getElementById('btnSimpanSiswa');
    if (btnSimpanSiswa) btnSimpanSiswa.addEventListener('click', async function() {
        const idEdit = document.getElementById('id_siswa_edit').value;
        const payload = { nis: document.getElementById('nis').value, nama_lengkap: document.getElementById('nama_lengkap').value, jenis_kelamin: document.getElementById('jenis_kelamin').value, kelas: document.getElementById('kelas').value, alamat: document.getElementById('alamat').value, email_ortu: document.getElementById('email_ortu').value };
        if (!payload.nis || !payload.nama_lengkap || !payload.kelas) return alert("NIS, Nama, dan Kelas wajib diisi!");
        btnSimpanSiswa.innerHTML = 'Menyimpan...'; btnSimpanSiswa.disabled = true;
        try { if (idEdit) await supabaseClient.from('siswa').update(payload).eq('id', idEdit); else await supabaseClient.from('siswa').insert([payload]); alert("Berhasil menyimpan siswa!"); bootstrap.Modal.getInstance(document.getElementById('modalTambahSiswa')).hide(); document.querySelectorAll('.modal-backdrop').forEach(b => b.remove()); document.body.classList.remove('modal-open'); muatDataSiswa(); } catch (error) { alert("Error: " + error.message); } finally { btnSimpanSiswa.innerHTML = 'Simpan Data'; btnSimpanSiswa.disabled = false; }
    });

    // Modal & Simpan: Guru
    const btnBukaGuru = document.getElementById('btnBukaModalTambahGuru');
    if (btnBukaGuru) btnBukaGuru.addEventListener('click', () => { document.getElementById('formTambahGuru').reset(); document.getElementById('id_guru_edit').value = ""; document.getElementById('modalGuruLabel').innerText = "Tambah Data Guru Baru"; });
    const btnSimpanGuru = document.getElementById('btnSimpanGuru');
    if (btnSimpanGuru) btnSimpanGuru.addEventListener('click', async function() {
        const idEdit = document.getElementById('id_guru_edit').value;
        const payload = { nip: document.getElementById('nip').value, nama_lengkap: document.getElementById('nama_guru').value, mata_pelajaran: document.getElementById('mata_pelajaran').value, no_hp: document.getElementById('no_hp').value, alamat: document.getElementById('alamat_guru').value };
        if (!payload.nip || !payload.nama_lengkap) return alert("NIP dan Nama wajib diisi!");
        btnSimpanGuru.innerHTML = 'Menyimpan...'; btnSimpanGuru.disabled = true;
        try { if (idEdit) await supabaseClient.from('guru').update(payload).eq('id', idEdit); else await supabaseClient.from('guru').insert([payload]); alert("Berhasil menyimpan guru!"); bootstrap.Modal.getInstance(document.getElementById('modalTambahGuru')).hide(); document.querySelectorAll('.modal-backdrop').forEach(b => b.remove()); document.body.classList.remove('modal-open'); muatDataGuru(); } catch (error) { alert("Error: " + error.message); } finally { btnSimpanGuru.innerHTML = 'Simpan Data'; btnSimpanGuru.disabled = false; }
    });

    // Modal & Simpan: Kelas
    const btnBukaKelas = document.getElementById('btnBukaModalTambahKelas');
    if (btnBukaKelas) btnBukaKelas.addEventListener('click', () => { document.getElementById('formTambahKelas').reset(); document.getElementById('id_kelas_edit').value = ""; document.getElementById('modalKelasLabel').innerText = "Tambah Kelas Baru"; });
    const btnSimpanKelas = document.getElementById('btnSimpanKelas');
    if (btnSimpanKelas) btnSimpanKelas.addEventListener('click', async function() {
        const idEdit = document.getElementById('id_kelas_edit').value;
        const payload = { nama_kelas: document.getElementById('nama_kelas').value, tingkat: document.getElementById('tingkat_kelas').value, wali_kelas: document.getElementById('wali_kelas').value };
        if (!payload.nama_kelas || !payload.tingkat) return alert("Nama Kelas dan Tingkat wajib diisi!");
        btnSimpanKelas.innerHTML = 'Menyimpan...'; btnSimpanKelas.disabled = true;
        try { if (idEdit) await supabaseClient.from('kelas').update(payload).eq('id', idEdit); else await supabaseClient.from('kelas').insert([payload]); alert("Berhasil menyimpan kelas!"); bootstrap.Modal.getInstance(document.getElementById('modalTambahKelas')).hide(); document.querySelectorAll('.modal-backdrop').forEach(b => b.remove()); document.body.classList.remove('modal-open'); muatDataKelas(); } catch (error) { alert("Error: " + error.message); } finally { btnSimpanKelas.innerHTML = 'Simpan Data'; btnSimpanKelas.disabled = false; }
    });
// ==========================================
    // FUNGSI ABSENSI
    // ==========================================
    const tanggalAbsensi = document.getElementById('tanggalAbsensi');
    const btnMuatAbsensi = document.getElementById('btnMuatAbsensi');
    const btnSimpanAbsensi = document.getElementById('btnSimpanAbsensi');
    const tabelDataAbsensi = document.getElementById('tabelDataAbsensi');

    if (tanggalAbsensi) {
        // Set tanggal hari ini sebagai default
        tanggalAbsensi.valueAsDate = new Date();
    }

    if (btnMuatAbsensi) {
        btnMuatAbsensi.addEventListener('click', async function() {
            const tanggal = tanggalAbsensi.value;
            if (!tanggal) return alert("Pilih tanggal terlebih dahulu!");
            
            tabelDataAbsensi.innerHTML = '<tr><td colspan="4" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Memuat...</td></tr>';
            
            try {
                // Ambil semua siswa
                const { data: siswaData, error: errSiswa } = await supabaseClient.from('siswa').select('id, nis, nama_lengkap, kelas').order('nama_lengkap', { ascending: true });
                if (errSiswa) throw errSiswa;
                
                if (siswaData.length === 0) {
                    tabelDataAbsensi.innerHTML = '<tr><td colspan="4" class="text-center py-4">Belum ada data siswa.</td></tr>';
                    btnSimpanAbsensi.style.display = 'none';
                    return;
                }

                // Ambil data absensi jika sudah ada di tanggal tersebut
                const { data: absenData, error: errAbsen } = await supabaseClient.from('absensi').select('*').eq('tanggal', tanggal);
                if (errAbsen) throw errAbsen;

                let barisHTML = '';
                siswaData.forEach(siswa => {
                    // Cek apakah siswa ini sudah diabsen hari ini
                    const absenSiswa = absenData.find(a => a.siswa_id === siswa.id);
                    const status = absenSiswa ? absenSiswa.status : 'Hadir'; // Default Hadir

                    barisHTML += `
                        <tr class="baris-absen" data-id="${siswa.id}">
                            <td class="px-4">${siswa.nis}</td>
                            <td class="fw-bold">${siswa.nama_lengkap}</td>
                            <td>${siswa.kelas}</td>
                            <td class="text-center">
                                <div class="btn-group" role="group">
                                    <input type="radio" class="btn-check" name="absen_${siswa.id}" id="hadir_${siswa.id}" value="Hadir" ${status === 'Hadir' ? 'checked' : ''}>
                                    <label class="btn btn-outline-success btn-sm px-3" for="hadir_${siswa.id}">Hadir</label>

                                    <input type="radio" class="btn-check" name="absen_${siswa.id}" id="izin_${siswa.id}" value="Izin" ${status === 'Izin' ? 'checked' : ''}>
                                    <label class="btn btn-outline-warning btn-sm px-3" for="izin_${siswa.id}">Izin</label>

                                    <input type="radio" class="btn-check" name="absen_${siswa.id}" id="sakit_${siswa.id}" value="Sakit" ${status === 'Sakit' ? 'checked' : ''}>
                                    <label class="btn btn-outline-info btn-sm px-3" for="sakit_${siswa.id}">Sakit</label>

                                    <input type="radio" class="btn-check" name="absen_${siswa.id}" id="alpa_${siswa.id}" value="Alpa" ${status === 'Alpa' ? 'checked' : ''}>
                                    <label class="btn btn-outline-danger btn-sm px-3" for="alpa_${siswa.id}">Alpa</label>
                                </div>
                            </td>
                        </tr>
                    `;
                });

                tabelDataAbsensi.innerHTML = barisHTML;
                btnSimpanAbsensi.style.display = 'inline-block'; // Tampilkan tombol simpan

            } catch (error) {
                console.error(error);
                tabelDataAbsensi.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error: ${error.message}</td></tr>`;
            }
        });
    }

    if (btnSimpanAbsensi) {
        btnSimpanAbsensi.addEventListener('click', async function() {
            const tanggal = tanggalAbsensi.value;
            const barisSiswa = document.querySelectorAll('.baris-absen');
            let dataUntukDisimpan = [];

            // Kumpulkan data dari setiap baris
            barisSiswa.forEach(baris => {
                const siswaId = baris.getAttribute('data-id');
                const radioPilihan = document.querySelector(`input[name="absen_${siswaId}"]:checked`);
                
                if (radioPilihan) {
                    dataUntukDisimpan.push({
                        tanggal: tanggal,
                        siswa_id: siswaId,
                        status: radioPilihan.value
                    });
                }
            });

            if (dataUntukDisimpan.length === 0) return;

            btnSimpanAbsensi.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Menyimpan...';
            btnSimpanAbsensi.disabled = true;

            try {
                // Hapus data lama di tanggal ini agar tidak double (kemudian insert yang baru)
                await supabaseClient.from('absensi').delete().eq('tanggal', tanggal);
                const { error } = await supabaseClient.from('absensi').insert(dataUntukDisimpan);
                
                if (error) throw error;
                alert("Absensi berhasil disimpan!");
            } catch (error) {
                alert("Gagal menyimpan: " + error.message);
            } finally {
                btnSimpanAbsensi.innerHTML = '<i class="fas fa-save me-2"></i>Simpan Absensi';
                btnSimpanAbsensi.disabled = false;
            }
        });
    }// ==========================================
    // FUNGSI LAPORAN
    // ==========================================
    const tanggalLaporan = document.getElementById('tanggalLaporan');
    const btnTampilkanLaporan = document.getElementById('btnTampilkanLaporan');
    const tabelDataLaporan = document.getElementById('tabelDataLaporan');
    const teksTanggalLaporan = document.getElementById('teksTanggalLaporan');

    if (tanggalLaporan) {
        tanggalLaporan.valueAsDate = new Date();
    }

    if (btnTampilkanLaporan) {
        btnTampilkanLaporan.addEventListener('click', async function() {
            const tanggal = tanggalLaporan.value;
            if (!tanggal) return alert("Pilih tanggal terlebih dahulu!");
            
            tabelDataLaporan.innerHTML = '<tr><td colspan="5" class="text-center py-4"><i class="fas fa-spinner fa-spin me-2"></i>Memuat laporan...</td></tr>';
            
            // Format tanggal untuk judul cetak (misal: 25 Oktober 2026)
            const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            teksTanggalLaporan.innerText = "Tanggal: " + new Date(tanggal).toLocaleDateString('id-ID', opsiTanggal);

            try {
                // Kehebatan Supabase: Menarik data Absensi sekaligus menggabungkannya dengan data Siswa (JOIN)
                const { data, error } = await supabaseClient
                    .from('absensi')
                    .select(`
                        status,
                        siswa ( nis, nama_lengkap, kelas )
                    `)
                    .eq('tanggal', tanggal)
                    .order('siswa(nama_lengkap)', { ascending: true });

                if (error) throw error;

                if (data.length === 0) {
                    tabelDataLaporan.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">Tidak ada data absensi untuk tanggal ini.</td></tr>';
                    return;
                }

                let barisHTML = '';
                let nomor = 1;
                data.forEach(item => {
                    // Karena JOIN, data siswanya ada di dalam objek item.siswa
                    const siswa = item.siswa;
                    
                    // Beri warna berbeda tergantung status
                    let badgeWarna = 'bg-success'; // Hadir
                    if (item.status === 'Izin') badgeWarna = 'bg-warning text-dark';
                    if (item.status === 'Sakit') badgeWarna = 'bg-info text-dark';
                    if (item.status === 'Alpa') badgeWarna = 'bg-danger';

                    barisHTML += `
                        <tr>
                            <td class="text-center">${nomor++}</td>
                            <td class="text-center">${siswa.nis}</td>
                            <td class="fw-medium">${siswa.nama_lengkap}</td>
                            <td class="text-center">${siswa.kelas}</td>
                            <td class="text-center"><span class="badge ${badgeWarna}">${item.status}</span></td>
                        </tr>
                    `;
                });

                tabelDataLaporan.innerHTML = barisHTML;

            } catch (error) {
                console.error("Gagal memuat laporan:", error);
                tabelDataLaporan.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Gagal memuat data: ${error.message}</td></tr>`;
            }
        });
    }// ==========================================
    // FUNGSI PENGATURAN
    // ==========================================
    const formPengaturan = document.getElementById('formPengaturan');
    const btnSimpanPengaturan = document.getElementById('btnSimpanPengaturan');

    if (formPengaturan) {
        // Fungsi untuk mengambil data saat halaman Pengaturan dibuka
        async function muatDataPengaturan() {
            try {
                const { data, error } = await supabaseClient
                    .from('pengaturan')
                    .select('*')
                    .eq('id', 1)
                    .single();

                if (error) throw error;

                if (data) {
                    document.getElementById('pengaturan_nama_sekolah').value = data.nama_sekolah || '';
                    document.getElementById('pengaturan_nama_kepsek').value = data.nama_kepsek || '';
                    document.getElementById('pengaturan_nip_kepsek').value = data.nip_kepsek || '';
                    document.getElementById('pengaturan_tahun_ajaran').value = data.tahun_ajaran || '';
                    document.getElementById('pengaturan_semester').value = data.semester || 'Ganjil';
                    document.getElementById('pengaturan_alamat').value = data.alamat_sekolah || '';
                }
            } catch (error) {
                console.error("Gagal memuat pengaturan:", error.message);
            }
        }
        
        // Panggil otomatis
        muatDataPengaturan();

        // Fungsi Simpan
        btnSimpanPengaturan.addEventListener('click', async function() {
            const namaSekolah = document.getElementById('pengaturan_nama_sekolah').value;
            if (!namaSekolah) return alert("Nama sekolah wajib diisi!");

            btnSimpanPengaturan.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Menyimpan...';
            btnSimpanPengaturan.disabled = true;

            const payload = {
                nama_sekolah: namaSekolah,
                nama_kepsek: document.getElementById('pengaturan_nama_kepsek').value,
                nip_kepsek: document.getElementById('pengaturan_nip_kepsek').value,
                tahun_ajaran: document.getElementById('pengaturan_tahun_ajaran').value,
                semester: document.getElementById('pengaturan_semester').value,
                alamat_sekolah: document.getElementById('pengaturan_alamat').value,
                updated_at: new Date().toISOString()
            };

            try {
                // Update data pengaturan yang memiliki id = 1
                const { error } = await supabaseClient
                    .from('pengaturan')
                    .update(payload)
                    .eq('id', 1);

                if (error) throw error;
                alert("Pengaturan berhasil disimpan!");
            } catch (error) {
                alert("Gagal menyimpan pengaturan: " + error.message);
            } finally {
                btnSimpanPengaturan.innerHTML = '<i class="fas fa-save me-2"></i>Simpan Perubahan';
                btnSimpanPengaturan.disabled = false;
            }
        });
    }});