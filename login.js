 // Tab Switching Logic
        function switchTab(type) {
            const tabs = document.querySelectorAll('.tab');
            const forms = document.querySelectorAll('.form-box');
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            if(type === 'login') {
                tabs[0].classList.add('active');
                document.getElementById('login-form').classList.add('active');
            } else {
                tabs[1].classList.add('active');
                document.getElementById('register-form').classList.add('active');
            }
        }

        // Custom Alert Logic
        function showAlert(message, isError = false) {
            const alertBox = document.getElementById('custom-alert');
            alertBox.innerText = message;
            alertBox.style.background = isError ? '#ef4444' : '#10b981';
            alertBox.style.display = 'block';

            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 3000);
        }

        // Authentication Logic
        function handleAuth(event, type) {
            event.preventDefault();

            if (type === 'login') {
                const email = document.getElementById('login-email').value;
                // Simple validation check
                if (email) {
                    showAlert("Success! Redirecting to dashboard...");
                    setTimeout(() => {
                        window.location.href = 'account.html';
                    }, 1500);
                }
            } else {
                const pass = document.getElementById('reg-pass').value;
                if (pass.length < 8) {
                    showAlert("Password must be at least 8 characters.", true);
                } else {
                    showAlert("Account created successfully!");
                    setTimeout(() => {
                        switchTab('login');
                    }, 1500);
                }
            }
        }