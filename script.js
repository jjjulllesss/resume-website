// Populate resume data
function populateResume() {
    // Set name and role
    document.getElementById('name').textContent = resumeData.name;
    document.getElementById('role').textContent = resumeData.role;
    
    // Set profile image
    const profileImage = document.getElementById('profileImage');
    profileImage.src = resumeData.profileImage;
    profileImage.alt = `${resumeData.name}'s Profile Picture`;
    
    // Populate social links
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinksContainer.innerHTML = resumeData.socialLinks.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
            <i class="${link.icon}"></i>
            <span>${link.platform}</span>
        </a>
    `).join('');
    
    // Set bio
    document.getElementById('bioText').textContent = resumeData.bio;
    
    // Populate career timeline
    const careerTimeline = document.getElementById('careerTimeline');
    careerTimeline.innerHTML = resumeData.career.map(item => `
        <div class="career-item">
            <div class="career-header">
                <span class="career-company">${item.company}</span>
                <span class="career-period">${item.period}</span>
            </div>
            <div class="career-position">${item.position}</div>
            <div class="career-description">${item.description}</div>
        </div>
    `).join('');
    
    // Populate achievements
    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.innerHTML = resumeData.achievements.map(achievement => `
        <div class="achievement-card">
            <span class="achievement-type ${achievement.type}">${achievement.type}</span>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-details">${achievement.details}</p>
            ${achievement.link ? `
                <a href="${achievement.link}" target="_blank" rel="noopener noreferrer" class="achievement-link">
                    View Details <i class="fas fa-external-link-alt"></i>
                </a>
            ` : ''}
        </div>
    `).join('');
}

// Copy bio to clipboard
function setupCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    const bioText = document.getElementById('bioText');
    
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(bioText.textContent);
            
            // Visual feedback
            const originalText = copyBtn.querySelector('.copy-text').textContent;
            copyBtn.classList.add('copied');
            copyBtn.querySelector('.copy-text').textContent = 'Copied!';
            
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.querySelector('.copy-text').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            alert('Failed to copy text. Please try again.');
        }
    });
}

// Download profile picture
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    const profileImage = document.getElementById('profileImage');
    
    downloadBtn.addEventListener('click', () => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = profileImage.src;
        link.download = `${resumeData.name.replace(/\s+/g, '_')}_profile.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Fetch Medium posts
async function fetchMediumPosts() {
    const postsList = document.getElementById('postsList');
    const username = resumeData.mediumUsername;
    
    if (!username) {
        postsList.innerHTML = '<p class="no-posts">Medium username not configured.</p>';
        return;
    }
    
    try {
        // Use RSS2JSON API to convert Medium RSS feed to JSON (handles CORS)
        const rssUrl = `https://medium.com/feed/@${username}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            displayMediumPosts(data.items);
        } else {
            postsList.innerHTML = '<p class="no-posts">No posts found.</p>';
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        postsList.innerHTML = '<p class="no-posts">Unable to load posts at this time.</p>';
    }
}

// Display Medium posts
function displayMediumPosts(posts) {
    const postsList = document.getElementById('postsList');
    
    // Limit to 10 most recent posts
    const recentPosts = posts.slice(0, 10);
    
    postsList.innerHTML = recentPosts.map(post => {
        // Parse date
        const date = new Date(post.pubDate);
        const formattedDate = date.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        
        // Extract description (first 150 characters)
        const description = post.description 
            ? post.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '';
        
        return `
            <div class="post-item">
                <div class="post-date">${formattedDate}</div>
                <h3 class="post-title">
                    <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                </h3>
                ${description ? `<p class="post-excerpt">${description}</p>` : ''}
            </div>
        `;
    }).join('');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateResume();
    setupCopyButton();
    setupDownloadButton();
    fetchMediumPosts();
});
