# DataViz Pro - Analytics Dashboard

A comprehensive analytics platform for CSV/Excel data visualization, Google Analytics, and YouTube Analytics.

## Features

### 📊 CSV/Excel Analytics
- Upload and analyze CSV or Excel files
- **Facebook Analytics Detection**: Automatically detects Facebook export data
- Interactive charts: Bar, Line, and Pie charts
- Statistical summaries
- Top 10 posts table with:
  - Date formatting for Excel serial numbers
  - Copy to clipboard functionality
  - Sortable columns

### 📈 Google Analytics Dashboard (Demo Mode)
- Real-time user tracking
- Page views and sessions
- Hourly traffic trends
- Top pages visualization
- Traffic source breakdown
- Support for multiple properties:
  - bur.mizzima.com
  - eng.mizzima.com
  - Mizzima TV App

### 🎥 YouTube Analytics Dashboard (Demo Mode)
- Channel metrics (subscribers, views, videos)
- Recent video performance
- Views trend over time
- Top performing videos
- Traffic sources pie chart
- Audience demographics:
  - Age distribution
  - Geographic breakdown

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Vercel

#### Step 1: Login to Vercel
```bash
vercel login
```

#### Step 2: Deploy
```bash
# For staging deployment
vercel

# For production deployment
vercel --prod
```

Your app will be deployed to: `https://solar-viking.vercel.app` (or your custom URL)

### Alternative: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import this repository
4. Click "Deploy"

## File Structure

```
solar-viking/
├── src/
│   ├── components/
│   │   ├── Charts/
│   │   │   ├── BarChartComponent.jsx
│   │   │   ├── LineChartComponent.jsx
│   │   │   └── PieChartComponent.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FacebookDashboard.jsx
│   │   ├── GoogleAnalyticsDashboard.jsx
│   │   ├── YouTubeAnalyticsDashboard.jsx
│   │   ├── FileUpload.jsx
│   │   ├── StatsCard.jsx
│   │   └── TopPostsTable.jsx
│   ├── context/
│   │   └── DataContext.jsx
│   ├── utils/
│   │   └── dataProcessing.js
│   ├── App.jsx
│   └── main.jsx
├── sample.csv                    # Sample CSV data
├── sample_facebook.csv           # Sample Facebook data
├── API_SETUP_GUIDE.md           # Guide for Google/YouTube API setup
├── DEPLOYMENT.md                # Detailed deployment instructions
└── README.md                    # This file
```

## Sample Data

Two sample files are included:
- `sample.csv` - Basic CSV data
- `sample_facebook.csv` - Facebook analytics export format

## API Integration (Optional)

The app currently runs in **demo mode** with sample data. To connect real APIs:

1. See `API_SETUP_GUIDE.md` for detailed instructions
2. Set up backend server for API authentication
3. Update `isDemo={false}` in `App.jsx`
4. Add environment variables for API credentials

## Technologies Used

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Parsing**: PapaParse, XLSX
- **Deployment**: Vercel

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

**Current Status**: ✅ Production build ready | 🚀 Ready for deployment

**Deployment Platform**: Vercel (recommended) | Netlify | GitHub Pages | Custom Server

