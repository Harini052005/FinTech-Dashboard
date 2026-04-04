# 💰 FinTech Dashboard

A modern, fully responsive financial management dashboard built with React and Tailwind CSS. Track your income, expenses, and financial insights with beautiful visualizations and an intuitive user interface.

![Dashboard Preview](https://img.shields.io/badge/React-18.0-blue?logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)

## ✨ Features

### 📊 Dashboard Overview

- **Summary Cards**: Quick view of balance, income, and expenses with gradient designs
- **Financial Charts**:
  - Income vs Expenses bar chart
  - Spending breakdown by category (pie chart)
  - Yearly income/expense tracking
  - Monthly calendar with transaction indicators
- **Real-time Insights**:
  - Total expenses summary
  - Top spending categories
  - Monthly spending comparisons

### 💳 Transaction Management

- **View Transactions**: Recently added transactions (10 per page with pagination)
- **Add Transactions**: Quick add dialog with category selection
- **Edit Transactions**: Modify existing transaction details
- **Delete Transactions**: Remove transactions with confirmation
- **Search & Filter**:
  - Search by category
  - Filter by transaction type (income/expense)
  - Sort by date or amount

### 🎨 User Experience

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Hover Effects**: Interactive card highlighting with smooth animations
- **Role-Based Access**: Switch between User and Admin roles
- **Smooth Animations**: 300ms transitions throughout the app

### 🔐 Role-Based Features

- **Viewer Role**: View-only access to all financial data
- **Admin Role**:
  - Add new transactions
  - Edit existing transactions
  - Delete transactions
  - Full data management capabilities

## 🚀 Tech Stack

### Frontend

- **React 18**: Modern UI library with hooks
- **Vite**: Next-generation build tool for fast development
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library
- **Lucide React**: Beautiful SVG icon library
- **Zustand**: Lightweight state management

### Styling

- Responsive Tailwind classes for mobile-first design
- Custom hover and transition effects
- Gradient backgrounds and shadows
- Dark mode support

## 📁 Project Structure

```
FinTech-Dashboard/
├── dashboard-ui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── BalanceChart.jsx      # Charts and yearly tracking
│   │   │   │   ├── MonthlyCalendar.jsx   # Transaction calendar
│   │   │   │   └── SummaryCards.jsx      # Balance/Income/Expense cards
│   │   │   ├── insights/
│   │   │   │   └── Insights.jsx          # Financial insights display
│   │   │   ├── layout/
│   │   │   │   └── Navbar.jsx            # Navigation bar with role selection
│   │   │   └── transactions/
│   │   │       ├── AddTransactionModal.jsx
│   │   │       ├── EditTransactionModal.jsx
│   │   │       ├── TransactionFilters.jsx
│   │   │       └── TransactionTable.jsx
│   │   ├── data/
│   │   │   └── mockData.js               # Sample transaction data
│   │   ├── pages/
│   │   │   └── Dashboard.jsx             # Main dashboard page
│   │   ├── store/
│   │   │   └── useStore.js               # Zustand state management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/FinTech-Dashboard.git
cd FinTech-Dashboard
```

2. **Navigate to dashboard-ui directory**

```bash
cd dashboard-ui
```

3. **Install dependencies**

```bash
npm install
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage Guide

### Starting the Application

```bash
cd dashboard-ui
npm run dev
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Key Features Walkthrough

#### 1. **Navigation & Role Selection**

- Use the dropdown in the navbar to switch between **User** and **Admin** roles
- Toggle dark mode using the moon/sun icon

#### 2. **Viewing Financial Overview**

- Summary cards display total balance, income, and expenses
- Charts visualize spending patterns across categories and years
- Monthly calendar shows transaction activity on specific dates

#### 3. **Managing Transactions**

- **Recent Transactions**: First 10 transactions displayed by default
- **See All**: Click "See All Transactions" to view the complete list
- **Filter & Search**:
  - Use search to filter by category
  - Filter by transaction type
  - Sort by date or amount

#### 4. **Add/Edit Transactions** (Admin Only)

- Click "Add Transaction" button
- Fill in date, amount, category, and type
- Save or cancel the operation
- Edit or delete existing transactions by clicking action buttons

#### 5. **Dark Mode**

- Click the moon/sun icon to toggle between light and dark themes
- Preference is maintained across the session

## 🎯 State Management

The app uses **Zustand** for simple, efficient state management. Key store actions:

```javascript
// Transaction Management
addTransaction(transaction);
updateTransaction(id, updatedData);
deleteTransaction(id);

// Filtering & Search
setSearch(searchTerm);
setFilterType(type);
setSortBy(criteria);

// UI Controls
setRole(role); // 'viewer' or 'admin'
toggleDarkMode(); // Toggle theme
```

## 📊 Sample Data

The application comes with mock transaction data in `src/data/mockData.js` that includes:

- Various income sources
- Multiple expense categories
- Transactions spanning different dates
- Both income and expense records

## 🎨 Customization

### Colors & Theme

Modify `tailwind.config.js` to change the color scheme and theme variables.

### Categories

Update `src/components/transactions/AddTransactionModal.jsx` to add/remove transaction categories:

```javascript
const commonCategories = [
  "Food",
  "Hospital",
  "Trips",
  "Entertainment",
  "Shopping",
];
```

### Chart Styles

Customize chart colors and styling in `src/components/dashboard/BalanceChart.jsx`

## 📱 Responsive Breakpoints

The dashboard is optimized for:

- **Mobile**: 320px - 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

All components use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) for perfect scaling.

## 🖼️ Features in Detail

### Hover Effects

- **Cards**: Scale up and brightness increase on hover
- **Buttons**: Shadow and scale transformations
- **Table Rows**: Background color changes with smooth transitions
- **Inputs**: Shadow enhancement on focus

### Animations

- Smooth 200-300ms transitions on all interactive elements
- Scale transformations for depth feedback
- Shadow effects for elevation
- Brightness adjustments for dark mode

## 🔄 Pagination

The recent transactions section implements smart pagination:

- Shows **10 most recent transactions** by default
- "See All Transactions" button displays total count
- Toggle between views with one click
- Respects current filters and search parameters

## 🧪 Testing

To test different features:

1. **Switch Roles**: Use navbar dropdown to test viewer vs admin features
2. **Toggle Theme**: Click dark mode button to verify styling
3. **Add/Edit**: Admin can add and edit transactions
4. **Filter**: Test search and filter combinations
5. **Responsive**: Resize window to test mobile responsiveness

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "zustand": "^4.4.0",
  "recharts": "^2.10.0",
  "lucide-react": "^0.263.0",
  "tailwindcss": "^3.3.0",
  "vite": "^5.0.0"
}
```

## 🚀 Performance Optimizations

- **Vite**: Lightning-fast build times and HMR
- **Tailwind CSS**: Minimal CSS bundle with PurgeCSS
- **Component Memoization**: Optimized re-renders
- **Zustand**: Lightweight state without Redux overhead
- **Responsive Images**: Optimized for all screen sizes

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Use a different port
npm run dev -- --port 3000
```

### Styling Issues

```bash
# Rebuild Tailwind CSS
npm run build:css
```

### State Not Updating

- Clear browser localStorage
- Check browser console for errors
- Verify Zustand store initialization

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Recharts Documentation](https://recharts.org)
- [Vite Guide](https://vitejs.dev/guide/)

## 📈 Future Enhancements

- [ ] Data export to CSV/PDF
- [ ] Budget tracking and alerts
- [ ] Recurring transaction categories
- [ ] Multi-currency support
- [ ] Cloud sync functionality
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Transaction history graphs
- [ ] Custom date ranges
- [ ] Email notifications

## ✅ Checklist

- ✅ Fully responsive design
- ✅ Dark mode support
- ✅ Role-based access control
- ✅ Transaction management (CRUD)
- ✅ Financial charts and visualizations
- ✅ Search and filtering
- ✅ Pagination support
- ✅ Smooth animations and hover effects
- ✅ Professional UI/UX
- ✅ Clean, maintainable code

---

**Made with ❤️ using React, Tailwind CSS, and modern web technologies**

_Last Updated: April 2026_
