import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EventDetail from "./pages/EventDetail";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes("YOUR_PUBLISHABLE_KEY_HERE")) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center p-8 border border-red-600 rounded-lg bg-zinc-900">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Clerk Configuration Missing</h1>
          <p className="mb-4">Please add your Clerk Publishable Key to the <code className="bg-black px-2 py-1 rounded text-yellow-400">.env</code> file.</p>
          <p className="text-sm text-gray-400">Variable: <span className="text-white">VITE_CLERK_PUBLISHABLE_KEY</span></p>
          <p className="mt-4 text-xs text-gray-500">Restart the server after adding the key.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/event/:id" element={<EventDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
