import { BrowserRouter } from "react-router-dom";
import { Layout } from "~/components/layout";
import { NotificationProvider } from "~/providers/notification";
import { CheckoutProvider } from "~/providers/checkout";
import { CookiesProvider } from "react-cookie";
import { ScrollToTop } from "~/components/scroll-to-top";
import { AuthProvider } from "~/providers/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProjectProvider } from "~/providers/project";
import { UserProvider } from "~/providers/user";
import { AppRoutes } from "~/app-routes";

export const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <CookiesProvider>
      <NotificationProvider>
        <CheckoutProvider>
          <ProjectProvider>
            <AuthProvider>
              <UserProvider>
                <BrowserRouter>
                  <ScrollToTop>
                    <Layout>
                      <AppRoutes />
                    </Layout>
                  </ScrollToTop>
                </BrowserRouter>
              </UserProvider>
            </AuthProvider>
          </ProjectProvider>
        </CheckoutProvider>
      </NotificationProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
