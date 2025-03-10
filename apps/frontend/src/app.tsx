import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "pages/home/home";
import { Information } from "pages/information/information";
import { Downloads } from "pages/downloads/downloads";
import { Layout } from "components/layout/layout";
import Showcase from "pages/Showcase";

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="showcase" element={<Showcase />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="information" element={<Information />} />
        {/* <Route path="loading" element={<Loading />} />
      <Route path="downloads" element={<Downloads />} />
      <Route path="showcase" element={<Showcase />} />
      <Route path="client" element={<AndroidClient />} /> */}
      </Routes>
    </Layout>
  </BrowserRouter>
);
