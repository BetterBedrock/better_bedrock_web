import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "~/pages/home/home";
import { Information } from "~/pages/information/information";
import { Downloads } from "~/pages/downloads/downloads";
import { Discord } from "~/pages/discord/discord";
import { Layout } from "~/components/layout/layout";
import { Fetch } from "~/pages/fetch";
import { ContentProvider } from "~/providers/content";
import { NotificationProvider } from "~/providers/notification";
import { Login } from "~/pages/login";
import { Analytics } from "~/pages/panel/analytics";
import { Dashboard } from "~/pages/panel/dashboard";
import { Preview } from "~/pages/preview";
import { CheckoutProvider } from "~/providers/checkout";
import { Invalid } from "~/pages/invalid";
import { Latest } from "~/pages/latest";
import { Cancel } from "~/pages/checkout/cancel";
import { Success } from "~/pages/checkout/success";
import { CookiesProvider } from "react-cookie";
import { PrivacyPolicy } from "~/pages/privacy-policy";
import { ScrollToTop } from "~/components/scroll-to-top";
import { Voucher } from "~/pages/panel/voucher";
import { PanelWrapper } from "~/pages/panel";
import { ProtectedRoute } from "~/components/protected-route/protected-route";
import { AuthProvider } from "~/providers/auth";
import { Main } from "~/pages/downloads/components/main";
import { Terms } from "./pages/terms";
import { Categories } from "~/pages/information/components/categories";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Profile } from "~/pages/profile";
import { Projects } from "~/pages/profile/components/user/projects";
import { Submissions } from "~/pages/profile/components/user/submissions";

export const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <CookiesProvider>
      <NotificationProvider>
        <CheckoutProvider>
          <ContentProvider>
            <AuthProvider>
              <BrowserRouter>
                <ScrollToTop>
                  <Layout>
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path="downloads" element={<Downloads />}>
                        <Route path=":category" element={<Main />} />
                      </Route>
                      <Route path="information" element={<Information />}>
                        <Route path=":category" element={<Categories />} />
                      </Route>
                      <Route path="discord" element={<Discord />} />
                      <Route path="fetch" element={<Fetch />} />
                      <Route path="preview/:file" element={<Preview />} />
                      <Route path="create" element={<Preview create/>} />
                      <Route path="login" element={<Login />} />
                      <Route path="profile/:id" element={<Profile />}>
                        <Route path="projects" element={<Projects />} />
                        <Route path="reviews" element={<Projects />} />
                        <Route path="submissions" element={<Submissions />} />
                      </Route>

                      <Route path="panel" element={<PanelWrapper />}>
                        <Route
                          index
                          element={
                            <ProtectedRoute>
                              <Dashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="analytics"
                          element={
                            <ProtectedRoute>
                              <Analytics />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="voucher"
                          element={
                            <ProtectedRoute>
                              <Voucher />
                            </ProtectedRoute>
                          }
                        />
                      </Route>

                      <Route path="*" element={<Invalid />} />
                      <Route path="latest" element={<Latest />} />
                      <Route path="privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="terms" element={<Terms />} />
                      <Route path="checkout">
                        <Route path="cancel" element={<Cancel />} />
                        <Route path="success" element={<Success />} />
                      </Route>
                    </Routes>
                  </Layout>
                </ScrollToTop>
              </BrowserRouter>
            </AuthProvider>
          </ContentProvider>
        </CheckoutProvider>
      </NotificationProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
