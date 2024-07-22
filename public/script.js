document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const uploadForm = document.querySelector('.upload-form');
    const originalFormContent = uploadForm.innerHTML; 

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        uploadForm.innerHTML = '<h2>Launching your file to space!</h2>';
        await animateCountdown(uploadForm);

        uploadForm.innerHTML = `<h2>Your file has landed!</h2>`;
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        uploadForm.innerHTML = originalFormContent;

        loadFiles();
        displayCelestialInfo(data.nasaData, data.celestialBody);
    } catch (error) {
        alert('Error uploading file');
        uploadForm.innerHTML = originalFormContent;
    }
});

async function animateCountdown(element) {
    for (let i = 3; i > 0; i--) {
        element.innerHTML = `<h2>Launching your file to space!</h2><p class="countdown">${i}</p>`;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    element.innerHTML = '<h2>Launching your file to space!</h2><p class="countdown">Takeoff!</p>';
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function loadFiles() {
    try {
        const response = await fetch('/files');
        const files = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            
            const filenameSpan = document.createElement('span');
            filenameSpan.className = 'filename';
            filenameSpan.textContent = `${file.originalName} - Landed on ${file.celestialBody}`;
            li.appendChild(filenameSpan);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteFile(file.filename);
            li.appendChild(deleteButton);
            
            fileList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading files:', error);
    }
}

function displayCelestialInfo(nasaData, celestialBody) {
    const celestialInfo = document.getElementById('celestialInfo');
    if (nasaData) {
        celestialInfo.innerHTML = `
            <h3>Your file has safely landed! Here's some information about its new home:</h3>
            <h4>${nasaData.title}</h4>
            <p>${nasaData.description}</p>
            <img src="${nasaData.imageUrl}" alt="${nasaData.title}" style="max-width: 100%;">
        `;
    } else {
        celestialInfo.innerHTML = '<p>No celestial information available.</p>';
    }
}
loadFiles();