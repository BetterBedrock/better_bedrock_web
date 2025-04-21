import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "~/pages/home/home";
import { Information } from "~/pages/information/information";
import { Downloads } from "~/pages/downloads/downloads";
import { Invalid } from "~/pages/invalid/invalid";
import { Discord } from "~/pages/discord/discord";
import { Layout } from "~/components/layout/layout";

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="information" element={<Information />} />
        <Route path="discord" element={<Discord />} />
        <Route path="*" element={<Invalid />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
