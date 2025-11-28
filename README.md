# VMotiv Notes

A powerful note-taking application with AI-powered features, built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vmotiv-notes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
pnpm install
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your API keys in the `.env.local` file:
- `UPLOADTHING_SECRET` - UploadThing secret key
- `UPLOADTHING_APP_ID` - UploadThing app ID
- `ANTHROPIC_API_KEY` - Anthropic API key for Claude
- `NANO_BANANA_API_KEY` - Nano Banana API key
- `GEMINI_API_KEY` - Google Gemini API key

4. Run the development server:
```bash
npm run dev
# or
yarn dev
pnpm dev
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and animations
├── components/
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── badge.tsx
│       ├── label.tsx
│       ├── alert.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       └── use-toast.ts
├── tailwind.config.ts     # Tailwind configuration with design tokens
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── .env.example           # Environment variables template
```

## 🎨 Design System

### Colors

- **Primary (Purple)**: Gradient-based purple palette for main CTAs and highlights
- **Secondary (Purple)**: Supporting purple shades for secondary elements
- **Accent (Purple)**: Accent colors for interactive elements
- **Neutral**: Soft neutral grays for backgrounds and text
- **Status Colors**: Success (green), warning (yellow), destructive (red), info (blue)

### Shadows

- **soft**: `0 8px 16px rgba(0, 0, 0, 0.08)`
- **soft-md**: `0 10px 20px rgba(0, 0, 0, 0.1)`
- **soft-lg**: `0 12px 24px rgba(0, 0, 0, 0.12)`
- **soft-xl**: `0 14px 32px rgba(0, 0, 0, 0.14)`
- **soft-2xl**: `0 20px 40px rgba(0, 0, 0, 0.16)`

### Typography

- **Font**: Inter (imported from Google Fonts)
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl

### Animations

- **fade-in**: Fade in animation (300ms)
- **fade-out**: Fade out animation (300ms)
- **slide-in-up**: Slide up animation (400ms)
- **slide-in-down**: Slide down animation (400ms)
- **slide-in-left**: Slide left animation (400ms)
- **slide-in-right**: Slide right animation (400ms)
- **pulse-soft**: Soft pulse animation (2s infinite)

## 🛠️ Available Scripts

### Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📦 Dependencies

### Core
- **next**: ^15.0.0
- **react**: ^19.0.0-rc
- **react-dom**: ^19.0.0-rc

### Styling
- **tailwindcss**: ^3.4.0
- **autoprefixer**: ^10.4.0
- **postcss**: ^8.4.0

### UI Components
- **@radix-ui/react-slot**: ^2.1.0
- **@radix-ui/react-label**: ^2.1.0
- **@radix-ui/react-separator**: ^1.1.0
- **@radix-ui/react-toast**: ^1.2.0

### Utilities
- **class-variance-authority**: ^0.7.0
- **clsx**: ^2.1.0
- **lucide-react**: ^0.344.0

### Development
- **typescript**: ^5.3.0
- **@types/node**: ^20.0.0
- **@types/react**: ^19.0.0-rc
- **@types/react-dom**: ^19.0.0-rc
- **eslint**: ^8.55.0
- **eslint-config-next**: ^15.0.0

## 🎯 Component Usage

### Button

```tsx
import { Button } from "@/components/ui/button"

export default function App() {
  return <Button>Click me</Button>
}
```

### Card

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
    </Card>
  )
}
```

### Toast

```tsx
import { useToast } from "@/components/ui/use-toast"

export default function App() {
  const { toast } = useToast()

  return (
    <button
      onClick={() =>
        toast({
          title: "Success!",
          description: "Operation completed successfully.",
          variant: "success",
        })
      }
    >
      Show Toast
    </button>
  )
}
```

## 🔧 Configuration

### Tailwind Configuration

The Tailwind configuration includes:
- Extended color palette with primary, secondary, accent, and neutral colors
- Custom shadow system
- Border radius settings (rounded-2xl defaults)
- Typography with Inter font
- Custom animations (fade, slide, pulse)
- Spacing utilities

### TypeScript Configuration

- Strict mode enabled
- App Router support
- Path aliasing with `@/*`
- Latest ES2020 target

## 📝 Environment Variables

See `.env.example` for all required environment variables:

- `UPLOADTHING_SECRET` - UploadThing authentication
- `UPLOADTHING_APP_ID` - UploadThing app identifier
- `ANTHROPIC_API_KEY` - Claude AI integration
- `NANO_BANANA_API_KEY` - Banana API integration
- `GEMINI_API_KEY` - Google Gemini integration
- `NEXT_PUBLIC_APP_NAME` - Application name (public)
- `NEXT_PUBLIC_APP_URL` - Application URL (public)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please email support@vmotiviznotes.com or open an issue on GitHub.
