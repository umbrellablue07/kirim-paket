// Database simulasi tarif dasar per kg antar kota
const databaseOngkir = {
    "jakarta-surabaya": 15000,
    "jakarta-bandung": 10000,
    "jakarta-medan": 35000,
    "surabaya-jakarta": 16000,
    "surabaya-bandung": 12000,
    "bandung-jakarta": 10000,
    "bandung-surabaya": 13000
};

// Tarif default jika rute kota tidak terdaftar di database atas
const TARIF_DEFAULT_PER_KG = 20000;

document.addEventListener('DOMContentLoaded', () => {
    const btnCekOngkir = document.getElementById('btn-cek-ongkir');
    
    if (btnCekOngkir) {
        btnCekOngkir.addEventListener('click', () => {
            // Ambil input dari halaman HTML dan ubah ke huruf kecil semua agar cocok dengan database
            const asal = document.getElementById('asal').value.trim().toLowerCase();
            const tujuan = document.getElementById('tujuan').value.trim().toLowerCase();
            const berat = parseFloat(document.getElementById('berat').value) || 1;
            const hasilContainer = document.getElementById('hasil-ongkir');

            // Validasi input kosong
            if (asal === "" || tujuan === "") {
                hasilContainer.innerHTML = `<p style="color: red; font-size: 14px; font-weight: 600;">⚠️ Mohon isi kota asal dan tujuan!</p>`;
                return;
            }

            // Buat kunci pencarian (misal: "jakarta-surabaya")
            const ruteKey = `${asal}-${tujuan}`;
            let tarifPerKg = databaseOngkir[ruteKey] || TARIF_DEFAULT_PER_KG;
            
            // Hitung total harga
            const totalOngkir = tarifPerKg * berat;

            // Tampilkan hasil ke layar dengan desain kartu manifes mini
            hasilContainer.innerHTML = `
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 12px; margin-top: 15px;">
                    <h4 style="color: #1e3a8a; margin-bottom: 10px; font-size: 15px;">📋 Hasil Estimasi Tarif</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr style="height: 25px;">
                            <td style="color: #6b7280;">Rute:</td>
                            <td style="text-transform: capitalize; font-weight: 600; text-align: right;">${asal} ➔ ${tujuan}</td>
                        </tr>
                        <tr style="height: 25px;">
                            <td style="color: #6b7280;">Berat Paket:</td>
                            <td style="font-weight: 600; text-align: right;">${berat} Kg</td>
                        </tr>
                        <tr style="height: 25px; border-bottom: 1px dashed #bfdbfe;">
                            <td style="color: #6b7280;">Tarif per Kg:</td>
                            <td style="font-weight: 600; text-align: right;">Rp ${tarifPerKg.toLocaleString('id-ID')}</td>
                        </tr>
                        <tr style="height: 35px;">
                            <td style="color: #1e3a8a; font-weight: bold; font-size: 15px;">Total Ongkir:</td>
                            <td style="color: #f59e0b; font-weight: bold; font-size: 18px; text-align: right;">Rp ${totalOngkir.toLocaleString('id-ID')}</td>
                        </tr>
                    </table>
                </div>
            `;
        });
    }
});