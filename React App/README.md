# EcoWise - Food Waste Tracking Application

A modern, responsive web application for tracking food waste and providing personalized recommendations to reduce waste. Built with React, React Router, and styled with CSS.

## 🚀 **Features**

### **Authentication System**
- **Login Page**: Secure authentication with email/password
- **Signup Page**: User registration with form validation
- **Dashboard**: Protected dashboard with waste tracking

### **Routing System**
- **React Router**: Client-side routing with proper navigation
- **Route Protection**: Automatic redirects and navigation guards
- **URL-based Navigation**: Clean URLs for all pages

### **Dashboard Features**
- **Modern Dark Theme**: Clean, professional dark interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Components**: 
  - Collapsible sidebar navigation
  - Overview cards with waste statistics
  - Pie chart showing food waste categories
  - Personalized recommendations
  - Data table with recent waste logs

## 📋 **Routing Structure**

### **Route Definitions**
```javascript
/                    → Redirect to /login
/login              → Login page
/signup             → Signup page  
/dashboard          → Main dashboard
/*                  → Redirect to /login (404 handling)
```

### **Navigation Flow**
```
Login Page → Dashboard (on successful login)
Signup Page → Dashboard (on successful registration)
Dashboard → Login Page (on logout)
```

### **Route Protection**
- **Default Route**: `/` automatically redirects to `/login`
- **404 Handling**: Any invalid route redirects to `/login`
- **Authentication Flow**: Login/Signup success redirects to dashboard
- **Logout Flow**: Dashboard logout redirects to login page

## 🎨 **Design System**

### **Color Palette**
- **Primary Green**: `#97EC20` (buttons, accents)
- **Dark Background**: `#18181B` (main background)
- **Card Background**: `#09090B` (component backgrounds)
- **Text Colors**: `#D6DDE6` (primary), `#71717A` (secondary)
- **Error Colors**: `#C51B1B` (validation errors)

### **Typography**
- **Primary Font**: Plus Jakarta Sans
- **Secondary Font**: Inter
- **Font Weights**: 400, 500, 600, 700

## 📱 **Pages & Components**

### **Login Page** (`/login`)
- **Email/Password Form**: With validation
- **Remember Me**: Checkbox functionality
- **Forgot Password**: Placeholder for password reset
- **Signup Link**: Navigation to registration
- **Form Validation**: Real-time error handling

### **Signup Page** (`/signup`)
- **Registration Form**: Name, email, password, confirm password
- **Terms Agreement**: Required checkbox
- **Password Validation**: Minimum 6 characters, confirmation matching
- **Email Validation**: Proper email format checking
- **Login Link**: Navigation to login page

### **Dashboard** (`/dashboard`)
- **Sidebar Navigation**: Collapsible with menu items
- **Header**: Breadcrumb navigation and search
- **Overview Cards**: Waste statistics and trends
- **Charts**: Pie chart for waste categories
- **Recommendations**: Personalized tips
- **Data Table**: Recent waste logs with actions
- **Logout Functionality**: Sidebar logout button

## 🛠 **Technical Implementation**

### **Dependencies**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.8.0",
  "vite": "^6.0.5"
}
```

### **Project Structure**
```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── Sidebar.css
│   ├── Header.jsx           # Top header with breadcrumbs
│   ├── Header.css
│   ├── OverviewCards.jsx    # Statistics cards
│   ├── OverviewCards.css
│   ├── WasteChart.jsx       # Pie chart component
│   ├── WasteChart.css
│   ├── Recommendations.jsx  # Tips and recommendations
│   ├── Recommendations.css
│   ├── WasteTable.jsx       # Data table
│   └── WasteTable.css
├── LoginPage.jsx            # Login page component
├── LoginPage.css            # Login page styles
├── SignupPage.jsx           # Signup page component
├── SignupPage.css           # Signup page styles
├── Dashboard.jsx            # Main dashboard component
├── Dashboard.css            # Dashboard layout styles
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css               # Global styles
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn

### **Installation**

1. Navigate to the project directory:
```bash
cd "React App"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 **Navigation Examples**

### **Login Flow**
1. Visit `/` → Redirects to `/login`
2. Enter credentials → Click "Log In"
3. Success → Redirects to `/dashboard`

### **Signup Flow**
1. Visit `/login` → Click "Sign up"
2. Fill registration form → Click "Sign Up"
3. Success → Redirects to `/dashboard`

### **Dashboard Navigation**
1. Use sidebar menu items (Dashboard, Analytics, Logs, Recommendations)
2. Click "Logout" in sidebar → Redirects to `/login`

## 🎯 **Form Validation**

### **Login Page Validation**
- ✅ Email is required
- ✅ Email must be valid format
- ✅ Password is required

### **Signup Page Validation**
- ✅ Name is required
- ✅ Email is required and valid format
- ✅ Password must be at least 6 characters
- ✅ Confirm password must match
- ✅ Terms and conditions must be agreed to

## 📱 **Responsive Design**

### **Breakpoints**
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### **Mobile Features**
- Collapsible sidebar for mobile devices
- Responsive grid layouts
- Optimized table scrolling
- Touch-friendly buttons and inputs

## 🔧 **Development**

### **Adding New Routes**
1. Add route in `App.jsx`
2. Create component file
3. Add corresponding CSS file
4. Update navigation links

### **Styling Guidelines**
- Use CSS custom properties for colors
- Follow BEM methodology for class names
- Maintain consistent spacing (8px grid)
- Ensure accessibility compliance

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📄 **License**

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, React Router, and modern CSS**
