// Auth-specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = this.querySelector('#username');
            const password = this.querySelector('#password');
            
            if (!username.value.trim()) {
                e.preventDefault();
                alert('Please enter your username');
                username.focus();
                return false;
            }
            
            if (!password.value.trim()) {
                e.preventDefault();
                alert('Please enter your password');
                password.focus();
                return false;
            }
        });
    }
    
    // Signup form validation
    const signupForm = document.querySelector('.auth-form');
    if (signupForm && signupForm.querySelector('#email')) {
        signupForm.addEventListener('submit', function(e) {
            const username = this.querySelector('#username');
            const email = this.querySelector('#email');
            const password = this.querySelector('#password');
            const confirmPassword = this.querySelector('#confirm_password');
            
            if (!username.value.trim()) {
                e.preventDefault();
                alert('Please enter a username');
                username.focus();
                return false;
            }
            
            if (!email.value.trim()) {
                e.preventDefault();
                alert('Please enter your email');
                email.focus();
                return false;
            }
            
            if (!password.value.trim()) {
                e.preventDefault();
                alert('Please enter a password');
                password.focus();
                return false;
            }
            
            if (password.value !== confirmPassword.value) {
                e.preventDefault();
                alert('Passwords do not match');
                confirmPassword.focus();
                return false;
            }
        });
    }
    
    // Forgot password functionality
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                // In a real app, you would send a reset password email here
                alert(`A password reset link has been sent to ${email}`);
            }
        });
    }
});