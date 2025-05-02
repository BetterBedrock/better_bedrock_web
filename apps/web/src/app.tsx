import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "~/pages/home/home";
import { Information } from "~/pages/information/information";
import { Downloads } from "~/pages/downloads/downloads";
import { Invalid } from "~/pages/invalid/invalid";
import { Discord } from "~/pages/discord/discord";
import { Layout } from "~/components/layout/layout";
import { Fetch } from "~/pages/fetch";

export const App = () => (
          <Route path="discord" element={<Discord />} />
          <Route path="fetch" element={<Fetch />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
);
