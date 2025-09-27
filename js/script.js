// Welcome Message dengan nama user
function updateWelcomeMessage() {
    const userName = localStorage.getItem('userName') || 'Guest';
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
}

// Form validation dan handling
document.addEventListener('DOMContentLoaded', function() {
    updateWelcomeMessage();
    
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            const name = document.getElementById('name').value;
            const birthdate = document.getElementById('birthdate').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const message = document.getElementById('message').value;
            
            if (!name || !birthdate || !gender || !message) {
                alert('Harap isi semua field!');
                return;
            }
            
            // Simpan data ke localStorage
            saveFormData({
                name: name,
                birthdate: formatDate(birthdate),
                gender: gender.value,
                message: message
            });
            
            // Update tabel
            updateDataTable();
            
            // Reset form
            messageForm.reset();
            
            alert('Pesan berhasil dikirim!');
        });
    }
});

// Format tanggal menjadi readable
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Simpan data ke localStorage
function saveFormData(formData) {
    let existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.push(formData);
    localStorage.setItem('formData', JSON.stringify(existingData));
}

// Update tabel dengan data dari localStorage
function updateDataTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    if (!tableBody) return;
    
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    
    tableBody.innerHTML = '';
    
    formData.forEach((data, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.birthdate}</td>
            <td>${data.gender}</td>
            <td>${data.message}</td>
            <td><button onclick="viewProfile(${index})">Klik Disini</button></td>
            <td><input type="checkbox" onchange="deleteData(${index})"></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// View profile function
function viewProfile(index) {
    const formData = JSON.parse(localStorage.getItem('formData')) || [];
    const data = formData[index];
    alert(`Profile: ${data.name}\nTanggal Lahir: ${data.birthdate}\nJenis Kelamin: ${data.gender}\nPesan: ${data.message}`);
}

// Delete data function
function deleteData(index) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        let formData = JSON.parse(localStorage.getItem('formData')) || [];
        formData.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(formData));
        updateDataTable();
    }
}

// Inisialisasi tabel saat page load
document.addEventListener('DOMContentLoaded', function() {
    updateDataTable();
    
    // Simpan nama user dari form input (contoh)
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('change', function() {
            localStorage.setItem('userName', this.value);
            updateWelcomeMessage();
        });
    }
});