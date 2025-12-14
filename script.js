// LOAD DATA DARI LOCAL STORAGE
let pasien = JSON.parse(localStorage.getItem("pasien")) || [];

// RENDER DATA KE TABEL
function renderTabel() {
    let tabel = "";

    pasien.forEach((p, index) => {
        tabel += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.nama}</td>
                <td>${p.umur}</td>
                <td>${p.penyakit}</td>
                <td>
                    <button class="edit-btn" onclick="editPasien(${index})">Edit</button>
                    <button class="delete-btn" onclick="hapusPasien(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tabelPasien").innerHTML = tabel;

    localStorage.setItem("pasien", JSON.stringify(pasien));
}

// TAMBAH PASIEN
function tambahPasien() {
    let nama = document.getElementById("nama").value;
    let umur = document.getElementById("umur").value;
    let penyakit = document.getElementById("penyakit").value;

    if (!nama || !umur || !penyakit) {
        alert("Semua data harus diisi!");
        return;
    }

    pasien.push({ nama, umur, penyakit });

    renderTabel();
    clearForm();
}

// HAPUS PASIEN
function hapusPasien(index) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        pasien.splice(index, 1);
        renderTabel();
    }
}

// EDIT PASIEN
function editPasien(index) {
    let p = pasien[index];

    let newNama = prompt("Nama baru:", p.nama);
    if (newNama === null) return;

    let newUmur = prompt("Umur baru:", p.umur);
    if (newUmur === null) return;

    let newPenyakit = prompt("Penyakit baru:", p.penyakit);
    if (newPenyakit === null) return;

    pasien[index] = { nama: newNama, umur: newUmur, penyakit: newPenyakit };
    renderTabel();
}

// CLEAR FORM
function clearForm() {
    document.getElementById("nama").value = "";
    document.getElementById("umur").value = "";
    document.getElementById("penyakit").value = "";
}

// TAMPILKAN DATA SAAT AWAL
renderTabel();
