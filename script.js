let selectedColor = ""; // Menyimpan warna yang dipilih

// Fungsi untuk memilih warna
function selectColor(color, button) {
  selectedColor = color; // Menyimpan warna yang dipilih

  // Menghapus highlight dari semua tombol
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Memberikan highlight pada tombol yang dipilih
  button.classList.add("selected");
}

// Fungsi untuk menghapus warna dari seluruh sel
function clearColors() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.style.backgroundColor = ""; // Menghapus warna latar belakang
  });
  selectedColor = ""; // Menghapus warna yang dipilih

  // Menghapus highlight dari tombol
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });
}

// Fungsi untuk mewarnai sel tabel
document.getElementById("table-container").addEventListener("click", function (event) {
  // Pastikan yang diklik adalah elemen td dan ada warna yang dipilih
  if (event.target.tagName === "TD" && selectedColor) {
    event.target.style.backgroundColor = selectedColor; // Mewarnai latar belakang sel
  }
});

function myFunction() {
  document.getElementById("myForm").reset();
}

// Function to open the side menu
function toggleMenu() {
  document.getElementById("mySidenav").classList.toggle("open");
}

// Function to close the side menu
function closeMenu() {
  document.getElementById("mySidenav").classList.remove("open");
}

// Fungsi untuk memuat data dari URL JSON dan menambahkannya ke dalam elemen HTML
function loadData() {
  fetch("https://021bababa.org/api/data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // Periksa struktur data yang diterima
      //    console.log(jsonData);

      // Pastikan ada properti 'content' dalam data JSON
      if (jsonData.content) {
        // Sisipkan konten HTML dari JSON ke dalam elemen #table-container
        const tableContainer = document.getElementById("table-container");
        tableContainer.innerHTML = jsonData.content; // Isi dengan konten HTML yang diterima
      } else {
        console.error('Properti "content" tidak ditemukan dalam data JSON.');
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat memuat data:", error);
    });
}

// Memuat data saat halaman dimuat
window.onload = loadData;
