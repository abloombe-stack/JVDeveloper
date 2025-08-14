// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// Property Filtering
function filterProperties(filter) {
    const properties = document.querySelectorAll('.property-card');
    properties.forEach(property => {
        if (filter === 'all') {
            property.style.display = 'block';
        } else {
            const status = property.getAttribute('data-status');
            property.style.display = status === filter ? 'block' : 'none';
        }
    });
}

// Login Modal
function showLoginModal(type) {
    const modal = document.getElementById('loginModal');
    const title = document.getElementById('modalTitle');
    
    if (type === 'investor') {
        title.textContent = 'Investor Login';
    } else {
        title.textContent = 'Property Owner Login';
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');

    document.getElementById('qualification-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Underwriting Logic
        const underwritingResult = performUnderwriting(data);
        
        if (underwritingResult.status === 'approved') {
            alert('🎉 Congratulations! Your property qualifies for our JV development program.\n\nScore: ' + Math.round(underwritingResult.score) + '/100\n\nOur team will contact you within 24 hours with your JV agreement and next steps.');
            
            // Send welcome email (in production)
            sendWelcomeEmail(data.email, data.propertyAddress);
            
        } else if (underwritingResult.status === 'review') {
            alert('📋 Thank you for your submission! Your property requires additional review.\n\nScore: ' + Math.round(underwritingResult.score) + '/100\n\nOur underwriting team will contact you within 48 hours to discuss your options and potential pathways to qualification.');
        } else {
            alert('Thank you for your interest in JVDeveloper.\n\nScore: ' + Math.round(underwritingResult.score) + '/100\n\nBased on our initial assessment, your property may not meet our current development criteria. However, our team will still contact you to discuss alternative options and potential future opportunities.');
        }
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const modalTitle = document.getElementById('modalTitle').textContent;
        
        if (email && document.getElementById('password').value) {
            closeModal();
            
            if (modalTitle.includes('Investor')) {
                showPage('investor-dashboard');
            } else {
                showPage('owner-dashboard');
            }
            
            alert('Login successful! Welcome to your dashboard.');
        }
    });
});

// Underwriting Tool - Enhanced Algorithm
function performUnderwriting(propertyData) {
    const score = calculatePropertyScore(propertyData);
    
    if (score >= 75) {
        return { status: 'approved', score: score };
    } else if (score >= 55) {
        return { status: 'review', score: score };
    } else {
        return { status: 'declined', score: score };
    }
}

function calculatePropertyScore(data) {
    let score = 40; // Base score
    
    // Lot size assessment (major factor)
    const lotSize = parseInt(data.lotSize);
    if (lotSize >= 10000) score += 25;
    else if (lotSize >= 7500) score += 20;
    else if (lotSize >= 5000) score += 15;
    else if (lotSize >= 3000) score += 10;
    else if (lotSize >= 2000) score += 5;
    
    // Mortgage balance assessment
    const mortgageBalance = parseInt(data.mortgageBalance);
    if (mortgageBalance === 0) score += 20;
    else if (mortgageBalance < 150000) score += 15;
    else if (mortgageBalance < 300000) score += 10;
    else if (mortgageBalance < 500000) score += 5;
    
    // Liens assessment (critical factor)
    if (data.hasLiens === 'no') {
        score += 15;
    } else {
        score -= 10; // Liens significantly impact qualification
    }
    
    // Location scoring based on address (simplified)
    const address = data.propertyAddress.toLowerCase();
    if (address.includes('austin') || address.includes('denver') || address.includes('nashville') || address.includes('miami')) {
        score += 10; // High-growth markets
    } else if (address.includes('tx') || address.includes('co') || address.includes('tn') || address.includes('fl')) {
        score += 5; // Good state markets
    }
    
    // Add some realistic randomization for market conditions, zoning, etc.
    const marketVariation = (Math.random() - 0.5) * 15;
    score += marketVariation;
    
    return Math.max(10, Math.min(95, score));
}

// Welcome Email Function (pseudo-implementation)
function sendWelcomeEmail(email, propertyAddress) {
    // In production, this would call your email service
    console.log('Sending welcome email to:', email);
    console.log('Property:', propertyAddress);
    
    // The email template would be populated and sent
    const emailTemplate = getWelcomeEmailTemplate(email, propertyAddress);
    console.log('Email template ready for:', email);
}

// Welcome Email Template
function getWelcomeEmailTemplate(email, propertyAddress) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 2rem; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 2rem; border: 1px solid #e5e7eb; }
        .cta-button { background: #f59e0b; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 1rem 0; }
        .dual-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
        .homeowner-section { background: #f0fdf4; padding: 1rem; border-radius: 5px; border-left: 3px solid #10b981; }
        .investor-section { background: #f3f4f6; padding: 1rem; border-radius: 5px; border-left: 3px solid #8b5cf6; }
        .disclaimer { background: #fef3c7; padding: 1rem; border-left: 4px solid #f59e0b; margin: 1rem 0; font-size: 0.9rem; }
        .footer { background: #f8fafc; padding: 1rem; border-radius: 0 0 10px 10px; font-size: 0.9rem; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to JVDeveloper — Your Partner in Property Profits</h1>
        </div>
        
        <div class="content">
            <h2>Welcome ${email.split('@')[0]}!</h2>
            
            <div class="dual-section">
                <div class="homeowner-section">
                    <h4>For Homeowners</h4>
                    <p>We turn your property into a high-value development. You keep ownership during the process — we raise capital, build, and sell. All you do is collect your share of the profit.</p>
                </div>
                
                <div class="investor-section">
                    <h4>For Experienced Owners</h4>
                    <p>Our experienced JV team manages every phase — from capital stack to construction oversight — ensuring professional execution and maximum value.</p>
                </div>
            </div>
            
            <div style="text-align: center; margin: 2rem 0;">
                <a href="[LOGIN_LINK]" class="cta-button">Log In and Get Started</a>
            </div>
            
            <h3>Your Property: ${propertyAddress}</h3>
            <p>Congratulations! Your property has been approved for our JV development program. Here's what happens next:</p>
            
            <ol>
                <li><strong>JV Agreement Review</strong> - We'll send your personalized agreement within 24 hours</li>
                <li><strong>Market Analysis</strong> - Our team will complete a detailed feasibility study</li>
                <li><strong>Capital Raising</strong> - We begin securing investor funding for your project</li>
                <li><strong>Development Launch</strong> - Permits, construction, and project management begin</li>
                <li><strong>Profit Distribution</strong> - You receive your share upon successful completion</li>
            </ol>
            
            <div class="disclaimer">
                <strong>Important:</strong> All investments carry risk; timelines and returns are not guaranteed.
            </div>
        </div>
        
        <div class="footer">
            <p>Questions? Contact us at info@jvdeveloper.com or (555) 123-4567</p>
            <p>JVDeveloper | 123 Business Ave, Suite 100, Austin, TX 78701</p>
        </div>
    </div>
</body>
</html>
            `;
}