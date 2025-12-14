import { useState, useEffect } from "react";

function App() {
  const [pasien, setPasien] = useState([]);
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [penyakit, setPenyakit] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load data dari localStorage saat awal
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pasien")) || [];
    setPasien(data);
  }, []);

  // Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("pasien", JSON.stringify(pasien));
  }, [pasien]);

  const handleSubmit = () => {
    if (!nama || !umur || !penyakit) {
      alert("Semua data harus diisi!");
      return;
    }

    if (editIndex !== null) {
      const dataBaru = [...pasien];
      dataBaru[editIndex] = { nama, umur, penyakit };
      setPasien(dataBaru);
      setEditIndex(null);
    } else {
      setPasien([...pasien, { nama, umur, penyakit }]);
    }

    clearForm();
  };

  const handleEdit = (index) => {
    const p = pasien[index];
    setNama(p.nama);
    setUmur(p.umur);
    setPenyakit(p.penyakit);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const dataBaru = pasien.filter((_, i) => i !== index);
      setPasien(dataBaru);
    }
  };

  const clearForm = () => {
    setNama("");
    setUmur("");
    setPenyakit("");
  };

  return (
    <div style={styles.container}>
      <h2>Primaya Hospital</h2>

      <h3>Tambah Data Pasien</h3>

      <input
        type="text"
        placeholder="Nama Pasien"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Umur"
        value={umur}
        onChange={(e) => setUmur(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Penyakit"
        value={penyakit}
        onChange={(e) => setPenyakit(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        {editIndex !== null ? "Update Pasien" : "Tambah Pasien"}
      </button>

      <h3>Daftar Pasien</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Penyakit</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.nama}</td>
              <td>{p.umur}</td>
              <td>{p.penyakit}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    padding: "20px",
    background: "#f4f4f4",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#0a9f59",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },
};

export default App;
