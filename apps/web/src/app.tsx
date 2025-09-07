import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "~/pages/home/home";
import { Information } from "~/pages/information/information";
import { Downloads } from "~/pages/downloads/downloads";
import { Discord } from "~/pages/discord/discord";
import { Layout } from "~/components/layout/layout";
import { Fetch } from "~/pages/fetch";
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
import { Terms } from "./pages/terms";
import { Categories } from "~/pages/information/components/categories";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Profile } from "~/pages/profile";
import { Projects } from "~/pages/profile/components/user/projects";
import { Projects as PanelProjects } from "~/pages/panel/projects";
import { Drafts } from "~/pages/profile/components/user/drafts";
import { Editor } from "~/pages/creator";
import { ProjectProvider } from "~/providers/project";
import { UserProvider } from "~/providers/user";
import { Stats } from "~/pages/profile/components/user/stats";
import { DownloadProvider } from "~/providers/download";
import { Main } from "~/pages/downloads/components/main";
import { BetterBedrock } from "~/pages/downloads/components/better-bedrock";
import { ReportProvider } from "~/providers/report";
import { Reports } from "~/pages/panel/reports";

export const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <CookiesProvider>
      <NotificationProvider>
        <CheckoutProvider>
          <ProjectProvider>
            <DownloadProvider>
              <AuthProvider>
                <UserProvider>
                  <ReportProvider>
                    <BrowserRouter>
                      <ScrollToTop>
                        <Layout>
                          <Routes>
                            <Route index element={<Home />} />
                            <Route path="downloads" element={<Downloads />}>
                              <Route index element={<Navigate to="main" replace />} />
                              <Route path="better-bedrock" element={<BetterBedrock />} />
                              <Route path="main" element={<Main />} />
                            </Route>
                            <Route path="information" element={<Information />}>
                              <Route path=":category" element={<Categories />} />
                            </Route>
                            <Route path="discord" element={<Discord />} />
                            <Route path="fetch" element={<Fetch />} />
                            <Route path="preview/:file" element={<Preview mode="view" />} />
                            <Route path="create" element={<Editor />} />
                            <Route path="editor/:file" element={<Preview mode="edit" />} />
                            <Route path="review/:file" element={<Preview mode="review" />} />
                            <Route path="login" element={<Login />} />
                            <Route path="profile/:id" element={<Profile />}>
                              <Route index element={<Navigate to="projects" replace />} />

                              <Route path="projects" element={<Projects />} />
                              <Route path="stats" element={<Stats />} />
                              <Route path="drafts" element={<Drafts />} />
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
                              <Route
                                path="projects"
                                element={
                                  <ProtectedRoute>
                                    <PanelProjects />
                                  </ProtectedRoute>
                                }
                              />
                              <Route
                                path="reports"
                                element={
                                  <ProtectedRoute>
                                    <Reports />
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
                  </ReportProvider>
                </UserProvider>
              </AuthProvider>
            </DownloadProvider>
          </ProjectProvider>
        </CheckoutProvider>
      </NotificationProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
