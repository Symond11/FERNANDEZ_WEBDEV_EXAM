/**
 * ==============================================================================
 * HAVEN SOCIAL - PRIVACY-FIRST SOCIAL MEDIA PROTOTYPE
 * Script: src/js/main.js
 * 
 * Simple Vanilla JavaScript logic for student web development:
 * - Uses localStorage to save users, posts, and login session.
 * - Uses alert(), console.log(), and document.location.href as practiced in lecture.
 * ==============================================================================
 */

// Keys used in localStorage
const STORAGE_KEYS = {
  CURRENT_USER: 'haven_current_user',
  USERS: 'haven_users',
  POSTS: 'haven_posts',
  SETTINGS: 'haven_settings'
};

// Initial base users (includes instructor's sample user 'qwer' / '1234')
const DEFAULT_USERS = [
  {
    username: 'qwer',
    password: '1234',
    displayName: 'Student Pioneer',
    bio: 'Protecting personal data from AI scrapers. Simple and private.',
    joinedDate: 'October 2026',
    shieldStatus: 'Protected (No AI Scraping)'
  },
  {
    username: 'alice',
    password: 'password123',
    displayName: 'Alice Cipher',
    bio: 'Data privacy advocate. Keeping social interaction human-only.',
    joinedDate: 'September 2026',
    shieldStatus: 'Protected (No AI Scraping)'
  }
];

// Initial starter posts
const DEFAULT_POSTS = [
  {
    id: 1,
    author: 'Alice Cipher',
    username: 'alice',
    timestamp: '10 minutes ago',
    privacyBadge: 'Anti-AI Shielded',
    privacyType: 'shielded',
    content: 'Welcome to Haven! Traditional social networks scrape our posts to feed machine learning datasets. Here, we prioritize human privacy and keep our data sovereign.',
    likes: 5,
    likedBy: [],
    comments: [
      { author: 'qwer', text: 'Glad to be here! Clean, simple, and safe from scrapers.' }
    ]
  },
  {
    id: 2,
    author: 'Student Pioneer',
    username: 'qwer',
    timestamp: '1 hour ago',
    privacyBadge: 'Zero Metadata',
    privacyType: 'zeroscrape',
    content: 'Testing the client-side metadata stripper. All tracking tags are removed before displaying posts. No AI models allowed!',
    likes: 12,
    likedBy: ['qwer'],
    comments: []
  }
];

// 1. Initialize data in localStorage if not already present
function initializeData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    console.log('Default users initialized in localStorage.');
  }

  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(DEFAULT_POSTS));
    console.log('Default posts initialized in localStorage.');
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      blockAiScrapers: true,
      stripExifMetadata: true,
      ephemeralPostExpiry: false
    }));
  }
}

// 2. Auth: Get Current User
function getCurrentUser() {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
}

// 3. Auth: Login Function (like instructor sample)
function loginUser(username, password) {
  console.log('Attempting login for:', username);

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const match = users.find(u => u.username === username && u.password === password);

  if (match) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(match));
    console.log('Login success for:', username);
    return { success: true, user: match };
  } else {
    console.log('Login failed for:', username);
    return { success: false, message: 'Invalid username or password! You can use demo user "qwer" with password "1234"' };
  }
}

// 4. Auth: Register / Sign Up Function
function registerUser(displayName, username, password) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());

  if (exists) {
    return { success: false, message: 'Username is already taken. Please choose another.' };
  }

  const newUser = {
    username: username,
    password: password,
    displayName: displayName,
    bio: 'New member defending digital privacy.',
    joinedDate: 'Today',
    shieldStatus: 'Protected (No AI Scraping)'
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

  console.log('New user registered:', newUser);
  return { success: true, user: newUser };
}

// 5. Auth: Logout Function
function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  alert('You have logged out.');
  document.location.href = 'login.html';
}

// 6. Feed: Add a New Post
function addPost(content, privacyType = 'shielded') {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('Please log in first to create a post.');
    document.location.href = 'login.html';
    return false;
  }

  if (!content || content.trim() === '') {
    alert('Post cannot be empty.');
    return false;
  }

  const badgeMap = {
    shielded: 'Anti-AI Shielded',
    zeroscrape: 'Zero-Scrape Tag',
    ephemeral: 'Ephemeral (24h)'
  };

  const newPost = {
    id: Date.now(),
    author: currentUser.displayName || currentUser.username,
    username: currentUser.username,
    timestamp: 'Just now',
    privacyBadge: badgeMap[privacyType] || 'Anti-AI Shielded',
    privacyType: privacyType,
    content: content.trim(),
    likes: 0,
    likedBy: [],
    comments: []
  };

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
  posts.unshift(newPost); // Add to the top of list
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

  console.log('New post published:', newPost);
  return true;
}

// 7. Feed: Like / Unlike a Post
function togglePostLike(postId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('Please log in to like posts.');
    return;
  }

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
  const post = posts.find(p => p.id === postId);

  if (post) {
    if (!post.likedBy) post.likedBy = [];
    const index = post.likedBy.indexOf(currentUser.username);

    if (index === -1) {
      post.likedBy.push(currentUser.username);
      post.likes = (post.likes || 0) + 1;
    } else {
      post.likedBy.splice(index, 1);
      post.likes = Math.max(0, (post.likes || 1) - 1);
    }

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    renderFeed();
  }
}

// 8. Feed: Add Comment to a Post
function addPostComment(postId, commentText) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('Please log in to comment.');
    return;
  }

  if (!commentText || commentText.trim() === '') return;

  const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
  const post = posts.find(p => p.id === postId);

  if (post) {
    if (!post.comments) post.comments = [];
    post.comments.push({
      author: currentUser.username,
      text: commentText.trim()
    });

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    renderFeed();
  }
}

// 9. Feed: Render Posts into the page
function renderFeed(filter = 'all') {
  const feedContainer = document.getElementById('feed-container');
  if (!feedContainer) return;

  const currentUser = getCurrentUser();
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');

  const filtered = posts.filter(post => {
    if (filter === 'all') return true;
    return post.privacyType === filter;
  });

  if (filtered.length === 0) {
    feedContainer.innerHTML = '<div class="box"><p>No posts in this category yet.</p></div>';
    return;
  }

  let html = '';
  for (let i = 0; i < filtered.length; i++) {
    const post = filtered[i];
    const isLiked = currentUser && post.likedBy && post.likedBy.includes(currentUser.username);

    // Build comments list
    let commentsHtml = '';
    if (post.comments && post.comments.length > 0) {
      for (let j = 0; j < post.comments.length; j++) {
        const c = post.comments[j];
        commentsHtml += `
          <div class="comment-row">
            <span class="comment-author">${escapeText(c.author)}:</span> 
            <span>${escapeText(c.text)}</span>
          </div>
        `;
      }
    }

    html += `
      <div class="post-item" id="post-${post.id}">
        <div class="post-header">
          <div>
            <span class="post-author">${escapeText(post.author)}</span> 
            <span class="post-meta">(@${escapeText(post.username)} • ${post.timestamp})</span>
          </div>
          <span class="post-tag">${post.privacyBadge}</span>
        </div>

        <div class="post-content">
          ${escapeText(post.content)}
        </div>

        <div class="post-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="togglePostLike(${post.id})">
            ${isLiked ? '❤️ Liked' : '🤍 Like'} (${post.likes || 0})
          </button>
          <span class="post-meta">Protected from AI scraping</span>
        </div>

        <div class="comment-section">
          <div class="comment-list">
            ${commentsHtml}
          </div>
          <form class="comment-form" onsubmit="handleCommentForm(event, ${post.id})">
            <input type="text" id="comment-input-${post.id}" placeholder="Write a reply..." required>
            <button type="submit" class="btn btn-primary btn-sm">Reply</button>
          </form>
        </div>
      </div>
    `;
  }

  feedContainer.innerHTML = html;
}

// 10. Comment Form Event Handler
function handleCommentForm(event, postId) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${postId}`);
  if (input) {
    addPostComment(postId, input.value);
    input.value = '';
  }
}

// 11. Profile Page Renderer
function renderProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert('Please log in first.');
    document.location.href = 'login.html';
    return;
  }

  const nameEl = document.getElementById('profile-name');
  const userEl = document.getElementById('profile-handle');
  const bioEl = document.getElementById('profile-bio');
  const shieldEl = document.getElementById('profile-shield');
  const joinedEl = document.getElementById('profile-joined');
  const postCountEl = document.getElementById('profile-post-count');
  const postsListEl = document.getElementById('profile-posts-list');

  if (nameEl) nameEl.textContent = currentUser.displayName || currentUser.username;
  if (userEl) userEl.textContent = '@' + currentUser.username;
  if (bioEl) bioEl.textContent = currentUser.bio || 'Zero AI tracking profile.';
  if (shieldEl) shieldEl.textContent = currentUser.shieldStatus || 'Protected';
  if (joinedEl) joinedEl.textContent = currentUser.joinedDate || 'Recently';

  // Find posts by this user
  const allPosts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
  const myPosts = allPosts.filter(p => p.username === currentUser.username);

  if (postCountEl) postCountEl.textContent = myPosts.length;

  if (postsListEl) {
    if (myPosts.length === 0) {
      postsListEl.innerHTML = '<p>You have not created any posts yet.</p>';
    } else {
      let listHtml = '';
      for (let i = 0; i < myPosts.length; i++) {
        const p = myPosts[i];
        listHtml += `
          <div class="post-item">
            <div class="post-header">
              <span class="post-meta">${p.timestamp}</span>
              <span class="post-tag">${p.privacyBadge}</span>
            </div>
            <p>${escapeText(p.content)}</p>
            <span class="post-meta">Likes: ${p.likes || 0} | Comments: ${(p.comments || []).length}</span>
          </div>
        `;
      }
      postsListEl.innerHTML = listHtml;
    }
  }
}

// 12. Profile: Save Bio
function saveProfileBio(newBio) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  currentUser.bio = newBio.trim();
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

  // Update in users array
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const idx = users.findIndex(u => u.username === currentUser.username);
  if (idx !== -1) {
    users[idx].bio = currentUser.bio;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  alert('Bio updated successfully!');
  renderProfile();
}

// 13. Update Navigation Bar according to login status
function updateNavbar() {
  const currentUser = getCurrentUser();
  const navContainer = document.getElementById('auth-nav-items');
  if (!navContainer) return;

  const isPages = window.location.pathname.includes('/pages/');
  const prefix = isPages ? '' : 'pages/';

  if (currentUser) {
    navContainer.innerHTML = `
      <span class="nav-user">User: @${escapeText(currentUser.username)}</span>
      <a href="${prefix}profile.html" class="btn btn-secondary btn-sm">Profile</a>
      <button type="button" class="btn btn-secondary btn-sm" onclick="logoutUser()">Logout</button>
    `;
  } else {
    navContainer.innerHTML = `
      <a href="${prefix}login.html" class="btn btn-secondary btn-sm">Login</a>
      <a href="${prefix}signup.html" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}

// 14. Simple string sanitizer
function escapeText(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Run when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initializeData();
  updateNavbar();
});
