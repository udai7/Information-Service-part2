# Frontend Documentation

## 📱 Overview

The frontend is a modern React application built with TypeScript, providing a user-friendly interface for citizens to access government services and an administrative dashboard for service management.

## 🛠️ Technology Stack

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **React Query (TanStack Query)**: Server state management
- **Radix UI**: Accessible UI primitives
- **shadcn/ui**: Beautiful, customizable components
- **Framer Motion**: Animation library
- **React Three Fiber**: 3D graphics
- **Axios**: HTTP client
- **React Hook Form**: Form management
- **Zod**: Schema validation

## 📁 Project Structure

```
frontend/
├── public/                      # Static assets
│   └── robots.txt
├── src/
│   ├── components/              # Reusable components
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       ├── toast.tsx
│   │       └── ... (40+ components)
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   ├── use-toast.ts         # Toast notifications
│   │   └── useSchemeServices.ts # Scheme data fetching
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # Helper functions
│   │   ├── utils.spec.ts        # Unit tests
│   │   └── localStorageUtils.ts # Local storage helpers
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Landing page
│   │   ├── UserDashboard.tsx    # User homepage
│   │   ├── AdminDashboard.tsx   # Admin panel
│   │   ├── UserSchemeService.tsx
│   │   ├── UserCertificateService.tsx
│   │   ├── UserContactService.tsx
│   │   ├── UserFeedbackService.tsx
│   │   ├── UserGrievancesService.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminRegister.tsx
│   │   └── ... (30+ pages)
│   ├── types/                   # TypeScript definitions
│   │   └── api.ts               # API types
│   ├── App.tsx                  # Root component
│   ├── global.css               # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── components.json              # shadcn/ui configuration
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env` in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3001
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🎨 UI Components

### Available Components (shadcn/ui)

All components are located in `src/components/ui/`:

- **Layout**: Card, Separator, Scroll Area
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- **Buttons**: Button, Toggle, Toggle Group
- **Navigation**: Tabs, Menubar, Navigation Menu, Breadcrumb
- **Overlays**: Dialog, Alert Dialog, Popover, Tooltip, Hover Card
- **Feedback**: Toast, Alert, Progress
- **Data Display**: Table, Avatar, Badge, Accordion, Collapsible
- **Advanced**: Command, Context Menu, Dropdown Menu, Carousel

### Usage Example

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🗺️ Routing

### Route Structure

```tsx
// App.tsx
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<Index />} />
  <Route path="/dashboard" element={<UserDashboard />} />
  <Route path="/schemes" element={<UserSchemeService />} />
  <Route path="/schemes/:id" element={<ServiceDetails />} />
  <Route path="/certificates" element={<UserCertificateService />} />
  <Route path="/contact" element={<UserContactService />} />
  <Route path="/emergency" element={<UserEmergencyService />} />
  <Route path="/feedback" element={<UserFeedbackService />} />
  <Route path="/grievances" element={<UserGrievancesService />} />

  {/* Admin Routes */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/register" element={<AdminRegister />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/schemes" element={<AdminSchemeService />} />
  <Route path="/admin/certificates" element={<AdminCertificateService />} />
  <Route path="/admin/contacts" element={<AdminContactService />} />
  <Route path="/admin/feedback" element={<AdminFeedbackService />} />
  <Route path="/admin/grievances" element={<AdminGrievancesService />} />
  <Route path="/admin/profile" element={<AdminProfile />} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

## 🔐 Authentication

### Auth Context

```tsx
// contexts/AuthContext.tsx
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Usage in components
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();

  // ... component logic
}
```

### Protected Routes

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  return <>{children}</>;
}
```

## 📡 API Integration

### Using React Query

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch data
function useSchemes() {
  return useQuery({
    queryKey: ["schemes"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/schemes`);
      return data;
    },
  });
}

// Mutate data
function useCreateScheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schemeData) => {
      const { data } = await axios.post(`${API_URL}/api/schemes`, schemeData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] });
    },
  });
}

// Usage in component
function MyComponent() {
  const { data: schemes, isLoading, error } = useSchemes();
  const createScheme = useCreateScheme();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {schemes.map((scheme) => (
        <div key={scheme.id}>{scheme.name}</div>
      ))}
      <button onClick={() => createScheme.mutate(newScheme)}>Add Scheme</button>
    </div>
  );
}
```

## 📝 Form Handling

### With React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## 🎭 State Management

### Local State

- `useState` for component-level state
- `useReducer` for complex state logic

### Global State

- **React Context**: Authentication, theme
- **React Query**: Server state (caching, synchronization)
- **Local Storage**: Persistent user preferences

### Example: Custom Hook

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework used throughout:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
  <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
    Click Me
  </button>
</div>
```

### Custom Utilities

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn("base-class", isActive && "active-class", className)} />;
```

## 📱 Responsive Design

### Mobile-First Approach

```tsx
// Tailwind breakpoints
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>;

// Custom hook for mobile detection
import { useMobile } from "@/hooks/use-mobile";

function MyComponent() {
  const isMobile = useMobile();

  return <div>{isMobile ? <MobileView /> : <DesktopView />}</div>;
}
```

## 🔔 Notifications

### Toast System

```tsx
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Success!",
      description: "Your action was completed.",
      variant: "default", // or 'destructive'
    });
  };

  return <button onClick={showNotification}>Show Toast</button>;
}
```

## 🎯 Type Safety

### Type Definitions

```tsx
// types/api.ts
export interface Scheme {
  id: number;
  name: string;
  summary: string;
  type: string;
  targetAudience: string[];
  applicationMode: string;
  onlineUrl?: string;
  offlineAddress?: string;
  status: "draft" | "pending" | "published";
  isActive: boolean;
  eligibilityDetails: string[];
  schemeDetails: string[];
  processDetails: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 🧪 Testing

### Running Tests

```bash
# Run unit tests (if configured)
npm test

# Type checking
npm run typecheck
```

### Example Test

```tsx
// lib/utils.spec.ts
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });
});
```

## 🚀 Build & Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` directory containing optimized static files

### Environment Variables for Production

```env
VITE_API_URL=https://api.yourapp.com
```

### Deployment Options

1. **Static Hosting**: Netlify, Vercel, GitHub Pages
2. **CDN**: Cloudflare, AWS CloudFront
3. **Docker**: Using nginx (see docker-compose.yml)

## 🔍 Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use composition over inheritance
   - Extract reusable logic into hooks

2. **Type Safety**

   - Define interfaces for all data structures
   - Use TypeScript strict mode
   - Avoid `any` type

3. **Performance**

   - Lazy load routes and components
   - Memoize expensive computations
   - Use React Query for caching

4. **Accessibility**

   - Use semantic HTML
   - Include ARIA labels
   - Ensure keyboard navigation

5. **Code Quality**
   - Follow ESLint rules
   - Use Prettier for formatting
   - Write meaningful comments

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Radix UI Docs](https://www.radix-ui.com/primitives/docs/overview/introduction)

---

**Happy Coding! 🎉**
