document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const priceRange = document.getElementById('priceRange');
    const priceLimitLabel = document.getElementById('price-limit');
    const categoryFilter = document.getElementById('categoryFilter');
    const innerSearch = document.getElementById('innerSearch');
    const resetBtn = document.getElementById('resetFilters');
    const jobCards = document.querySelectorAll('.job-card');
    const jobCount = document.getElementById('job-count');

    // --- 1. Navigation Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- 2. Filter Logic ---
    function applyFilters() {
        const maxPrice = parseInt(priceRange.value);
        const selectedCat = categoryFilter.value;
        const searchText = innerSearch.value.toLowerCase();
        let visibleItems = 0;

        // Update the UI label for price
        priceLimitLabel.textContent = maxPrice;

        jobCards.forEach(card => {
            const price = parseInt(card.getAttribute('data-price'));
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.job-title').textContent.toLowerCase();

            const matchesPrice = price <= maxPrice;
            const matchesCategory = (selectedCat === 'all' || category === selectedCat);
            const matchesSearch = title.includes(searchText);

            if (matchesPrice && matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleItems++;
            } else {
                card.style.display = 'none';
            }
        });

        jobCount.textContent = visibleItems;
    }

    // --- 3. Event Listeners ---
    priceRange.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    innerSearch.addEventListener('input', applyFilters);

    // Clear All Button
    resetBtn.addEventListener('click', () => {
        innerSearch.value = '';
        categoryFilter.value = 'all';
        priceRange.value = 2000;
        applyFilters();
    });

    // Post a Job Button
    const postJobBtn = document.getElementById('postJobBtn');
    postJobBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Redirecting to the 'Post a Job' form...");
    });

    // View Project Buttons
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function() {
            const projectName = this.closest('.job-card').querySelector('.job-title').textContent;
            alert("Viewing details for: " + projectName);
        });
    });

    // Favorite/Heart Button Logic
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.style.color = icon.classList.contains('fas') ? '#ff4757' : '#ccc';
        });
    });

    // Run filters once on load
    applyFilters();
});