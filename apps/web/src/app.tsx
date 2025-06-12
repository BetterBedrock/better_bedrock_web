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

export const App = () => (
  <CheckoutProvider>
    <NotificationProvider>
      <ContentProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="information" element={<Information />} />
              <Route path="discord" element={<Discord />} />
              <Route path="fetch" element={<Fetch />} />
              <Route path="login" element={<Login />} />
              <Route path="preview/:file" element={<Preview />} />
              <Route path="panel">
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              <Route path="*" element={<Invalid />} />
              <Route path="latest" element={<Latest />} />
              <Route path="checkout">
                <Route path="cancel" element={<Cancel />} />
                <Route path="success" element={<Success />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ContentProvider>
    </NotificationProvider>
  </CheckoutProvider>
);
