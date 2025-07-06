import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from "./pages/NotFound";
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { EventProvider } from '@/contexts/EventContext';
import { MessageProvider } from '@/contexts/MessageContext';
import { WinnerProvider } from '@/contexts/WinnerContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAdmin();
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SonnerToaster position="top-right" />
      <AdminProvider>
        <EventProvider>
          <MessageProvider>
            <WinnerProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </WinnerProvider>
          </MessageProvider>
        </EventProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
