fetch('manifest.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const dateSelect = document.getElementById('dateSelect');
        const imageGallery = document.getElementById('imageGallery');

        // Group images by date
        const imagesByDate = data.reduce((acc, img) => {
            acc[img.date] = acc[img.date] || [];
            acc[img.date].push(img);
            return acc;
        }, {});

        // Populate the dropdown
        Object.keys(imagesByDate).forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dateSelect.appendChild(option);
        });

        // Handle date selection
        dateSelect.addEventListener('change', function() {
            const selectedDate = this.value;
            imageGallery.innerHTML = '';

            imagesByDate[selectedDate].forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img.url;
                imgElement.alt = img.time;
                imgElement.addEventListener('click', () => openModal(img.url));
                imageGallery.appendChild(imgElement);
            });
        });
    })
    .catch(error => console.error('Error fetching manifest:', error));

// Modal functionality
function openModal(imgUrl) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgUrl;
    modal.style.display = 'block';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};
