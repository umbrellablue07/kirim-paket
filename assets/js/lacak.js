// Database simulasi data pelacakan resi paket
const databaseResi = {
    "KP123456789": {
        status: "DITERIMA",
        penerima: "Budi Santoso",
        kotaTujuan: "Surabaya",
        history: [
            { waktu: "14 Jun 2026 10:00", pesan: "Paket telah diterima oleh [Budi Santoso] (Ybs)" },
            { waktu: "13 Jun 2026 14:20", pesan: "Paket dibawa oleh kurir menuju alamat penerima" },
            { waktu: "13 Jun 2026 03:15", pesan: "Paket telah tiba di Gudang Pusat Surabaya" },
            { waktu: "12 Jun 2026 19:30", pesan: "Paket dalam perjalanan dari Jakarta ke Surabaya" },
            { waktu: "12 Jun 2026 11:00", pesan: "Paket berhasil di-input oleh Agen Jakarta Pusat" }
        ]
    },
    "KP987654321": {
        status: "ON PROCESS",
        penerima: "Siti Rahma",
        kotaTujuan: "Bandung",
        history: [
            { waktu: "14 Jun 2026 08:45", pesan: "Paket dalam perjalanan ke Gudang Transit Bandung" },
            { waktu: "13 Jun 2026 21:00", pesan: "Paket berhasil di-input oleh Agen Jakarta Barat" }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const btnLacakResi = document.getElementById('btn-lacak-resi');

    if (btnLacakResi) {
        btnLacakResi.addEventListener('click', () => {
            const noResi = document.getElementById('no-resi').value.trim().toUpperCase();
            const hasilContainer = document.getElementById('hasil-lacak');

            // Validasi input kosong
            if (noResi === "") {
                hasilContainer.innerHTML = `<p style="color: red; font-size: 14px; font-weight: 600;">⚠️ Mohon isi nomor resi terlebih dahulu!</p>`;
                return;
            }

            // Cari data resi di database simulasi
            const dataPaket = databaseResi[noResi];

            if (!dataPaket) {
                // Jika resi tidak ditemukan
                hasilContainer.innerHTML = `
                    <div style="background: #fef2f2; border: 1px solid #fca5a5; padding: 15px; border-radius: 12px; margin-top: 15px; color: #991b1b; font-size: 14px;">
                        ❌ Nomor resi <strong>"${noResi}"</strong> tidak ditemukan. Coba gunakan nomor simulasi: <strong>KP123456789</strong> atau <strong>KP987654321</strong>.
                    </div>
                `;
                return;
            }

            // Jika resi ditemukan, buat tampilan detail status pelacakannya
            let statusColor = dataPaket.status === "DITERIMA" ? "#16a34a" : "#f59e0b";
            
            let historyHtml = "";
            dataPaket.history.forEach((track, index) => {
                // Membuat desain timeline vertikal sederhana menggunakan CSS inline
                let isLatest = index === 0; // Tandai riwayat paling baru
                historyHtml += `
                    <div style="display: flex; gap: 15px; margin-bottom: 15px; position: relative;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${isLatest ? statusColor : '#d1d5db'}; z-index: 2;"></div>
                            ${index !== dataPaket.history.length - 1 ? `<div style="width: 2px; flex: 1; background: #e5e7eb; margin-top: 4px; margin-bottom: -15px; z-index: 1;"></div>` : ''}
                        </div>
                        <div style="font-size: 13px; padding-bottom: 5px;">
                            <span style="color: #6b7280; font-size: 11px; display: block;">${track.waktu}</span>
                            <span style="color: ${isLatest ? '#111827' : '#4b5563'}; font-weight: ${isLatest ? '600' : 'normal'};">${track.pesan}</span>
                        </div>
                    </div>
                `;
            });

            hasilContainer.innerHTML = `
                <div style="background: white; border: 1px solid #e5e7eb; padding: 15px; border-radius: 12px; margin-top: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px;">
                        <div>
                            <span style="font-size: 11px; color: #6b7280; display: block;">Status Paket:</span>
                            <strong style="color: ${statusColor}; font-size: 16px;">${dataPaket.status}</strong>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-size: 11px; color: #6b7280; display: block;">Tujuan:</span>
                            <strong style="color: #1e3a8a; font-size: 14px;">${dataPaket.kotaTujuan}</strong>
                        </div>
                    </div>
                    
                    <h4 style="font-size: 13px; color: #1e3a8a; margin-bottom: 15px;">📌 Riwayat Pengiriman</h4>
                    <div style="margin-top: 10px; padding-left: 5px;">
                        ${historyHtml}
                    </div>
                </div>
            `;
        });
    }
});