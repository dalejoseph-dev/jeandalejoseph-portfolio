function toggleMobileMenu() {
            // Mobile menu toggle
            const mobileNav = document.getElementById('mobileNav');
            const menuIcon = document.getElementById('menuIcon');
            
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                menuIcon.textContent = '☰';
            } else {
                mobileNav.classList.add('active');
                menuIcon.textContent = '×';
            }
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileNav = document.getElementById('mobileNav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileNav.classList.contains('active') && 
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

        // Update code preview in real-time
        function updatePreview() {
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const message = document.getElementById('messageInput').value;
            
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
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formContainer = document.getElementById('formContainer');
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            
            // Hide form, show success message
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
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

        document.addEventListener('click', function(event) {
            const mobileNav = document.getElementById('mobileNav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileNav && mobileNav.classList.contains('active') && 
                !mobileNav.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                toggleMobileMenu();
            }
        });

        // Initialize date on page load
        window.addEventListener('DOMContentLoaded', function() {
            updatePreview();
        });

        function filterProjects() {
            const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
            const selectedFilters = Array.from(checkboxes).map(cb => cb.value);
            const projectCards = document.querySelectorAll('.project-card');
            
            // Update active filters display
            const activeFiltersText = selectedFilters.length > 0 
                ? selectedFilters.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join('; ')
                : 'All';
            document.getElementById('activeFilters').textContent = activeFiltersText;
            
            // Show/hide projects based on filters
            projectCards.forEach(card => {
                const tech = card.getAttribute('data-tech');
                if (selectedFilters.length === 0 || selectedFilters.includes(tech)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
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

        // Toggle snippet description
        document.querySelectorAll('.details-btn').forEach((btn, index) => {
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

