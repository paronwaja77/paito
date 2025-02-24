<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Interval dalam detik (1 jam = 3600 detik)
$interval = 3600; 

// File untuk menyimpan timestamp terakhir pengambilan data
$lastUpdateFile = __DIR__ . '/last_update.txt';

// Cek apakah file last_update.txt ada dan baca timestamp terakhir
if (file_exists($lastUpdateFile)) {
    $lastUpdateTimestamp = file_get_contents($lastUpdateFile);
    if ($lastUpdateTimestamp === false) {
        $lastUpdateTimestamp = 0; // Jika gagal membaca, anggap belum pernah diambil
    }
} else {
    $lastUpdateTimestamp = 0; // Jika file belum ada, anggap belum pernah diambil
}

// Jika sudah cukup waktu dari pengambilan terakhir, ambil data baru
if (time() - $lastUpdateTimestamp >= $interval) {
    // URL Target
    $url = 'http://178.128.93.136/';

    // Mengambil konten dari URL menggunakan cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $content = curl_exec($ch);

    // Periksa apakah cURL berhasil
    if ($content === false) {
        echo date('Y-m-d H:i:s') . " - Gagal mengambil data dari URL. Error: " . curl_error($ch) . "\n";
        curl_close($ch);
        exit();
    }

    curl_close($ch);

    // Regex untuk menangkap seluruh tabel dengan id "drawing-table"
    preg_match('/<table id="drawing-table"[^>]*>.*?<\/table>/s', $content, $matches);

    // Memeriksa apakah konten ditemukan
    if (isset($matches[0])) {
        // Bersihkan karakter newline dan tab dalam konten HTML
        $cleaned_content = str_replace(["\n", "\t"], '', $matches[0]);

        // Menyimpan konten yang dibersihkan dalam format JSON
        $data = ['content' => $cleaned_content];

        // Simpan JSON ke file data.json
        $jsonFile = __DIR__ . '/data.json';
        if (file_put_contents($jsonFile, json_encode($data, JSON_UNESCAPED_UNICODE)) !== false) {
            echo date('Y-m-d H:i:s') . " - Data berhasil disimpan dalam data.json.\n";
        } else {
            echo date('Y-m-d H:i:s') . " - Gagal menyimpan data.json.\n";
        }

        // Simpan timestamp pengambilan data terbaru
        if (file_put_contents($lastUpdateFile, time()) !== false) {
            echo date('Y-m-d H:i:s') . " - Timestamp diperbarui.\n";
        } else {
            echo date('Y-m-d H:i:s') . " - Gagal memperbarui timestamp.\n";
        }
    } else {
        echo date('Y-m-d H:i:s') . " - Konten tabel tidak ditemukan.\n";
    }
} else {
    echo date('Y-m-d H:i:s') . " - Data masih terbaru, tidak perlu update.\n";
}
?>
