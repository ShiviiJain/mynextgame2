# mynextgame - AI-Powered Gaming Recommendations

A modern, AI-powered gaming recommendation platform built with Next.js 14, featuring real-time game discovery, intelligent recommendations, and a beautiful user interface inspired by Juicebox.

## 🚀 Features

### ✨ Core Features
- **AI-Powered Recommendations** - Get personalized game suggestions using OpenAI embeddings and GPT-4
- **Real Game Data** - Integration with RAWG API for authentic game information
- **Smart Search** - Real-time search with live results
- **Advanced Filtering** - Filter by genre, platform, price, and difficulty
- **Beautiful UI** - Clean, modern design with dark theme
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🎮 Gaming Features
- **Game Discovery** - Browse featured and trending games
- **Detailed Game Cards** - Rich game information with ratings, genres, and metadata
- **Platform Support** - PC, PlayStation, Xbox, Nintendo Switch, Mobile
- **Price Tracking** - View current prices and discounts
- **Genre Filtering** - Filter by 20+ game genres

### 🤖 AI Features
- **Semantic Similarity** - Uses OpenAI embeddings to find similar games
- **GPT-4 Explanations** - AI-generated explanations for why games are recommended
- **Preference Learning** - Learns from your liked games to improve recommendations
- **Smart Matching** - Considers genres, descriptions, and gameplay elements

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **AI**: OpenAI API (GPT-4, text-embedding-ada-002)
- **Game Data**: RAWG API
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mynextgame
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI API Key for embeddings and GPT-4 explanations
   OPENAI_API_KEY=your-openai-api-key-here
   
   # RAWG API Key for game data
   RAWG_API_KEY=your-rawg-api-key-here
   ```

4. **Get API Keys**
   - **OpenAI API**: Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **RAWG API**: Get your free key from [RAWG.io](https://rawg.io/apidocs)

5. **Run the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting AI Recommendations

1. **Navigate to AI Recommendations**
   - Click "Get AI Recommendations" on the homepage
   - Or go to `/ai-recommendations`

2. **Add Your Favorite Games**
   - Enter game names you love (e.g., "The Witcher 3", "Stardew Valley")
   - Add multiple games for better recommendations

3. **Set Your Preferences**
   - Choose your max budget
   - Select your preferred platform
   - Click "Get AI Recommendations"

4. **View Results**
   - See personalized game suggestions
   - Read AI explanations for each recommendation
   - View game details, ratings, and genres

### Browsing Games

1. **Featured Games** - Handpicked games on the homepage
2. **Trending Games** - Popular games everyone's playing
3. **Search** - Use the search bar to find specific games
4. **Filtered Recommendations** - Use the recommendations page with filters

## 🔧 API Endpoints

### `/api/games`
- **GET** - Fetch games with optional filters
- **Query Parameters**:
  - `type`: `featured` | `trending` | `search`
  - `limit`: Number of games to return
  - `q`: Search query (for search type)

### `/api/recommend`
- **POST** - Get AI-powered game recommendations
- **Request Body**:
  ```json
  {
    "likedGames": ["The Witcher 3", "Stardew Valley"],
    "budget": 60,
    "platform": "PC"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "recommendations": [
      {
        "title": "Game Name",
        "reason": "AI explanation",
        "coverImage": "image-url",
        "rating": 4.5,
        "genres": ["RPG", "Action"],
        "platforms": ["PC", "PlayStation"],
        "price": 49.99
      }
    ]
  }
  ```

## 🎨 Design System

### Colors
- **Primary**: Clean white on dark background
- **Secondary**: Muted grays for secondary elements
- **Accent**: Subtle highlights for interactive elements
- **Destructive**: Red for errors and warnings

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clean hierarchy
- **Body**: Readable, accessible text

### Components
- **Game Cards**: Hover effects, ratings, genre tags
- **Forms**: Clean inputs with validation
- **Navigation**: Responsive header with search
- **Loading States**: Smooth animations and spinners

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Works with Next.js static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `RAWG_API_KEY` | RAWG API key for game data | Yes |

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized images and code splitting
- **PWA Ready**: Can be converted to Progressive Web App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **RAWG API** for comprehensive game data
- **OpenAI** for AI-powered recommendations
- **Next.js** for the amazing framework
- **Tailwind CSS** for beautiful styling
- **Lucide** for beautiful icons

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ for gamers by gamers**