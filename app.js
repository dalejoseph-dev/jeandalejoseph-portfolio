// Mobile menu toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuIcon.textContent = '☰';
    } else {
        mobileNav.classList.add('active');
        menuToggle.classList.add('active');
        menuIcon.textContent = '×';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNav && mobileNav.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        toggleMobileMenu();
    }
});

// Toggle sidebar sections
function toggleContactSection(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.textContent = '▼';
    } else {
        content.classList.add('hidden');
        arrow.textContent = '▶';
    }
}

function toggleSection(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.arrow');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.textContent = '▼';
    } else {
        content.classList.add('hidden');
        arrow.textContent = '▶';
    }
}

// Update code preview in real-time
function updatePreview() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    
    if (!nameInput || !emailInput || !messageInput) return;
    
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    
    document.getElementById('previewName').textContent = name ? `"${name}"` : '""';
    document.getElementById('previewEmail').textContent = email ? `"${email}"` : '""';
    document.getElementById('previewMessage').textContent = message ? `"${message}"` : '""';
    
    // Update date to current
    const date = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById('previewDate').textContent = `"${formattedDate}"`;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            
            // Hide form, show success message
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        });
    }
    
    // Initialize date on page load
    updatePreview();
});

// Reset form
function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Clear form
    form.reset();
    
    // Update preview
    updatePreview();
    
    // Show form, hide success message
    successMessage.classList.add('hidden');
    form.classList.remove('hidden');
}

// Filter projects
function filterProjects() {
    const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
    const selectedFilters = Array.from(checkboxes).map(cb => cb.value);
    const projectCards = document.querySelectorAll('.project-card');
    
    // Update active filters display
    const activeFiltersElement = document.getElementById('activeFilters');
    if (activeFiltersElement) {
        const activeFiltersText = selectedFilters.length > 0 
            ? selectedFilters.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join('; ')
            : 'All';
        activeFiltersElement.textContent = activeFiltersText;
    }
    
    // Show/hide projects based on filters
    projectCards.forEach(card => {
        const techAttr = card.getAttribute('data-tech');
        const cardTechs = techAttr ? techAttr.split(',') : [];
        
        // Show card if no filters selected OR if any selected filter matches any of the card's tech
        if (selectedFilters.length === 0 || selectedFilters.some(filter => cardTechs.includes(filter))) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle projects sidebar filters
function toggleProjectsSidebar() {
    const filters = document.getElementById('projectsFilters');
    const arrow = document.getElementById('projectsArrow');
    
    if (filters.classList.contains('hidden')) {
        filters.classList.remove('hidden');
        arrow.textContent = '▼';
    } else {
        filters.classList.add('hidden');
        arrow.textContent = '▶';
    }
}

// Toggle snippet details
document.addEventListener('DOMContentLoaded', function() {
    // Toggle snippet description
    document.querySelectorAll('.details-btn').forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.snippet-card');
            const description = card.querySelector('.snippet-description');
            const closeBtn = card.querySelector('.close-btn');
            
            if (description.classList.contains('hidden')) {
                description.classList.remove('hidden');
                closeBtn.style.display = 'block';
            } else {
                description.classList.add('hidden');
                closeBtn.style.display = 'none';
            }
        });
    });

    // Close button for snippets
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.snippet-card');
            const description = card.querySelector('.snippet-description');
            description.classList.add('hidden');
            this.style.display = 'none';
        });
    });
});