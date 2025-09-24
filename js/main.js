@@ .. @@
 // Main JavaScript functionality for KindNet platform

 // Global variables
 let map;
 let donationModal;
 let campaignModal;
 let lightboxModal;
 let currentLightboxImages = [];
 let currentLightboxIndex = 0;
+let currentUser = null;

 // Initialize the application
 document.addEventListener('DOMContentLoaded', function() {
+    checkUserSession();
     initializeNavigation();
     initializeModals();
     initializeCounters();
     initializeForms();
     initializeMap();
     initializeFilters();
     initializeDonationFlow();
     initializeFileUpload();
     initializeInteractiveElements();
     initializeImageUpload();
     initializeLightbox();
     initializeImageGalleries();
 });

+// Check user session and update navigation
+function checkUserSession() {
+    const userData = localStorage.getItem('kindnet_user');
+    if (userData) {
+        currentUser = JSON.parse(userData);
+        updateNavigationForUser();
+    }
+}
+
+// Update navigation based on user login status
+function updateNavigationForUser() {
+    const loginBtn = document.getElementById('login-btn');
+    const userInfo = document.getElementById('user-info');
+    const userName = document.getElementById('user-name');
+    const logoutBtn = document.getElementById('logout-btn');
+
+    if (currentUser && loginBtn && userInfo) {
+        loginBtn.style.display = 'none';
+        userInfo.style.display = 'flex';
+        if (userName) userName.textContent = currentUser.name;
+        
+        if (logoutBtn) {
+            logoutBtn.addEventListener('click', function() {
+                localStorage.removeItem('kindnet_user');
+                window.location.href = 'login.html';
+            });
+        }
+    }
+}

 // Navigation functionality
 function initializeNavigation() {
     const navToggle = document.getElementById('nav-toggle');
     const navMenu = document.getElementById('nav-menu');
     
     if (navToggle && navMenu) {
         navToggle.addEventListener('click', function() {
             navMenu.classList.toggle('active');
             navToggle.classList.toggle('active');
         });
     }
     
     // Close mobile menu when clicking on links
     const navLinks = document.querySelectorAll('.nav-link');
     navLinks.forEach(link => {
         link.addEventListener('click', function() {
             navMenu.classList.remove('active');
             navToggle.classList.remove('active');
         });
     });
     
     // Navbar scroll effect
     window.addEventListener('scroll', function() {
         const navbar = document.querySelector('.navbar');
         if (window.scrollY > 100) {
             navbar.classList.add('scrolled');
         } else {
             navbar.classList.remove('scrolled');
         }
     });
+    
+    // Handle login button click
+    const loginBtn = document.getElementById('login-btn');
+    if (loginBtn) {
+        loginBtn.addEventListener('click', function() {
+            window.location.href = 'login.html';
+        });
+    }
 }