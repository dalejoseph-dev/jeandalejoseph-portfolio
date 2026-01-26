 function showPage(pageName) {

            // Show selected page
            const selectedPage = document.getElementById(pageName);
            selectedPage.classList.add('active');

            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Animate skill bars when skills page is shown
            if (pageName === 'skills') {
                setTimeout(() => {
                    const skillBars = document.querySelectorAll('.skill-fill');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                }, 200);
            }
        }

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            e.target.reset();
        });

        // Initialize skill bars on page load
        window.addEventListener('load', () => {
            const skillBars = document.querySelectorAll('.skill-fill');
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
        });