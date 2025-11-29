# API Setup Guide for Google Analytics and YouTube Analytics

## Google Analytics Setup

### 1. Enable Google Analytics API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google Analytics Data API" and "Google Analytics Reporting API"
4. Create OAuth 2.0 credentials for web application

### 2. Required Scopes
```
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/analytics
```

### 3. Get GA4 Property IDs
- **bur.mizzima.com**: Get your GA4 Property ID from Google Analytics
- **eng.mizzima.com**: Get your GA4 Property ID from Google Analytics
- **Mizzima TV App**: Get your GA4 Property ID from Google Analytics

### 4. Backend Implementation (Node.js/Express Example)
```javascript
// server/api/google-analytics.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY
  }
});

app.post('/api/google-analytics', async (req, res) => {
  const { propertyId } = req.body;
  
  try {
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: 'unifiedScreenName' }],
      metrics: [{ name: 'activeUsers' }]
    });
    
    const [reportResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: 'today', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'source' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ]
    });
    
    res.json({
      realTimeUsers: realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || 0,
      // Process and return other metrics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## YouTube Analytics Setup

### 1. Enable YouTube Data API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "YouTube Data API v3" and "YouTube Analytics API"
3. Create API Key (for basic data) and OAuth 2.0 (for analytics)

### 2. Required Scopes
```
https://www.googleapis.com/auth/youtube.readonly
https://www.googleapis.com/auth/yt-analytics.readonly
```

### 3. OAuth Flow for Channel Access
User needs to authenticate with YouTube to grant access to their channel analytics.

### 4. Backend Implementation (Node.js/Express Example)
```javascript
// server/api/youtube-analytics.js
const { google } = require('googleapis');

const youtube = google.youtube('v3');
const youtubeAnalytics = google.youtubeAnalytics('v2');

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

app.get('/api/youtube-auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly'
    ]
  });
  res.redirect(authUrl);
});

app.get('/api/youtube-callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // Store tokens securely
  res.redirect('/youtube-analytics');
});

app.get('/api/youtube-analytics', async (req, res) => {
  oauth2Client.setCredentials(req.session.tokens);
  
  try {
    // Get channel info
    const channelResponse = await youtube.channels.list({
      auth: oauth2Client,
      part: 'snippet,statistics',
      mine: true
    });
    
    // Get analytics data
    const analyticsResponse = await youtubeAnalytics.reports.query({
      auth: oauth2Client,
      ids: 'channel==MINE',
      startDate: '2024-11-01',
      endDate: '2024-11-28',
      metrics: 'views,estimatedMinutesWatched,averageViewDuration,subscribersGained',
      dimensions: 'day'
    });
    
    res.json({
      channelMetrics: channelResponse.data.items[0].statistics,
      analytics: analyticsResponse.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Environment Variables (.env)
```env
# Google Analytics
GA_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GA_PROPERTY_ID_BUR=123456789
GA_PROPERTY_ID_ENG=987654321
GA_PROPERTY_ID_APP=456789123

# YouTube
YOUTUBE_API_KEY=your-api-key-here
YOUTUBE_CLIENT_ID=your-client-id.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=your-client-secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/youtube-callback
```

---

## Frontend Integration

Update the dashboard components to call your backend API:

```javascript
// In GoogleAnalyticsDashboard.jsx
const fetchGoogleAnalyticsData = async () => {
  const response = await fetch('/api/google-analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ propertyId: selectedSite })
  });
  const data = await response.json();
  setAnalyticsData(data);
};

// In YouTubeAnalyticsDashboard.jsx
const fetchYouTubeAnalytics = async () => {
  const response = await fetch('/api/youtube-analytics');
  const data = await response.json();
  setAnalyticsData(processYouTubeData(data));
};
```

---

## Quick Start with Demo Mode

The dashboards are currently showing demo data. To test with real data:
1. Set up backend server with API endpoints
2. Obtain API credentials from Google Cloud Console
3. Implement OAuth flow for YouTube
4. Update `isDemo={false}` props in App.jsx
5. Test authentication and data fetching

---

## Required NPM Packages (Backend)
```bash
npm install googleapis @google-analytics/data express express-session
```

This will get you started with both Google Analytics and YouTube Analytics integration!
