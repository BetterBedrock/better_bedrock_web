import { HeroLoginButton } from "@/pages/login/ui/hero/hero-login-button";
import { HeroHeader } from "./hero-header";
import { Card } from "@/shared/ui/card";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Hero = () => (
  <Card fullWidth>
    <Card.Body>
      <HeroHeader />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <GoogleOAuthProvider clientId="268821429400-jlf4995gbmur5m3a3hg8qrpuu33dv0rs.apps.googleusercontent.com">
        <HeroLoginButton />
      </GoogleOAuthProvider>
    </Card.Body>
  </Card>
);
