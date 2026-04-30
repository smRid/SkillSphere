# SunCart – Summer Essentials Store

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more. Built with Next.js, Tailwind CSS, DaisyUI, and BetterAuth.

**Assignment Category:** category-A8-Jackfruit

## Live URL

[https://suncart.vercel.app](https://suncart.vercel.app)

## Key Features

- **Beautiful Summer-Themed UI** – Vibrant gradient hero slider, animated sections, and modern card layouts
- **Product Browsing** – Browse 8+ summer products with search and category filtering
- **Protected Routes** – Product details page requires authentication
- **User Authentication** – Email/password registration & login with BetterAuth
- **Google Social Login** – One-click sign in with Google OAuth
- **User Profile** – View and update profile information (name & photo)
- **Lottie Animations** – Animated sun graphic on the hero section (bonus)
- **Fully Responsive** – Optimized for mobile, tablet, and desktop
- **Toast Notifications** – User-friendly feedback on all actions
- **Environment Variables** – All secrets secured via `.env.local`

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [DaisyUI 5](https://daisyui.com/) | Component library |
| [BetterAuth](https://better-auth.com/) | Authentication |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [Lottie React](https://lottiereact.com/) | Animations (bonus) |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

## NPM Packages Used

- `next` – React framework
- `react` / `react-dom` – UI library
- `tailwindcss` – CSS utility framework
- `daisyui` – Tailwind CSS component library
- `better-auth` – Authentication solution
- `react-hot-toast` – Toast notifications
- `lottie-react` – Lottie animation player
- `react-icons` – Icon components

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/suncart.git
cd suncart
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory (see `.env.example`):

```
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    page.tsx              # Home page
    layout.tsx            # Root layout (Navbar + Footer)
    login/page.tsx        # Login page
    register/page.tsx     # Register page
    products/page.tsx     # All products page
    products/[id]/page.tsx # Product details (protected)
    my-profile/page.tsx   # User profile
    my-profile/update/page.tsx # Update profile
    privacy-policy/page.tsx
    api/auth/[...all]/route.ts # BetterAuth API
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    LottieAnimation.tsx
  data/
    products.json         # Product data
    sun-animation.json    # Lottie animation
  lib/
    auth.ts               # BetterAuth server config
    auth-client.ts        # BetterAuth client
```

## Deployment

Deployed on Vercel. Supports reload on all routes without errors (Next.js App Router SPA behavior).
