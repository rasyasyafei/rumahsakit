import React, { useState, useEffect } from "react";

function App() {
  const [pasien, setPasien] = useState([]);
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [penyakit, setPenyakit] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pasien")) || [];
    setPasien(data);
  }, []);

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

  return React.createElement(
    "div",
    { style: styles.container },
    React.createElement("h2", null, "Primaya Hotspital"),
    React.createElement("h3", null, "Tambah Data Pasien"),
    React.createElement("input", {
      type: "text",
      placeholder: "Nama Pasien",
      value: nama,
      onChange: (e) => setNama(e.target.value),
      style: styles.input,
    }),
    React.createElement("input", {
      type: "number",
      placeholder: "Umur",
      value: umur,
      onChange: (e) => setUmur(e.target.value),
      style: styles.input,
    }),
    React.createElement("input", {
      type: "text",
      placeholder: "Penyakit",
      value: penyakit,
      onChange: (e) => setPenyakit(e.target.value),
      style: styles.input,
    }),
    React.createElement(
      "button",
      { onClick: handleSubmit, style: styles.button },
      editIndex !== null ? "Update Pasien" : "Tambah Pasien"
    ),
    React.createElement("h3", null, "Daftar Pasien"),
    React.createElement(
      "table",
      { style: styles.table },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "No"),
          React.createElement("th", null, "Nama"),
          React.createElement("th", null, "Umur"),
          React.createElement("th", null, "Penyakit"),
          React.createElement("th", null, "Aksi")
        )
      ),
      React.createElement(
        "tbody",
        null,
        pasien.map((p, index) =>
          React.createElement(
            "tr",
            { key: index },
            React.createElement("td", null, index + 1),
            React.createElement("td", null, p.nama),
            React.createElement("td", null, p.umur),
            React.createElement("td", null, p.penyakit),
            React.createElement(
              "td",
              null,
              React.createElement(
                "button",
                { onClick: () => handleEdit(index) },
                "Edit"
              ),
              React.createElement(
                "button",
                { onClick: () => handleDelete(index) },
                "Hapus"
              )
            )
          )
        )
      )
    )
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "50px auto",
    padding: "20px",
    background: "#f9f9f9",
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
