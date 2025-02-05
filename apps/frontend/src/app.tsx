import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "pages/home/home";
import { Layout } from "components/layout/layout";
import Showcase from "pages/Showcase";
import Downloads from "pages/Downloads";
import Faq from "pages/Faq";

export const App = () => (
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="showcase" element={<Showcase />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="faq" element={<Faq />} />
        {/* <Route path="loading" element={<Loading />} />
      <Route path="downloads" element={<Downloads />} />
      <Route path="showcase" element={<Showcase />} />
      <Route path="client" element={<AndroidClient />} /> */}
      </Routes>
    </BrowserRouter>
  </Layout>
);
