// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    window.addEventListener('load', function() {
        const loading = document.getElementById('loading');
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add(element.getAttribute('data-animate'));
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Floating animation for elements with .floating class
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength';
        strengthBar.innerHTML = '<div class="password-strength-bar"></div><div class="password-strength-text"></div>';
        passwordInput.parentNode.insertBefore(strengthBar, passwordInput.nextSibling);
        
        passwordInput.addEventListener('input', function() {
            const strengthText = this.nextElementSibling.querySelector('.password-strength-text');
            const strengthBar = this.nextElementSibling.querySelector('.password-strength-bar');
            const strengthContainer = this.nextElementSibling;
            
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length > 7) strength += 1;
            if (password.length > 11) strength += 1;
            
            // Character type checks
            if (password.match(/[a-z]/)) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
            
            // Update UI
            strengthContainer.className = 'password-strength';
            strengthText.textContent = '';
            
            if (password.length > 0) {
                if (strength <= 3) {
                    strengthContainer.classList.add('weak');
                    strengthText.textContent = 'Weak';
                } else if (strength <= 5) {
                    strengthContainer.classList.add('medium');
                    strengthText.textContent = 'Medium';
                } else {
                    strengthContainer.classList.add('strong');
                    strengthText.textContent = 'Strong';
                }
            }
        });
    }
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirm_password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('password').value;
            if (this.value !== password) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            }
        });
    });
});