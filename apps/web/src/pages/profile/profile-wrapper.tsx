import { Profile } from "~/pages/profile/profile";
import { UserProfileProvider } from "~/pages/profile/providers/user-profile";
import { AnalyticsProvider } from "~/providers/analytics";

export const ProfileWrapper = () => (
  <AnalyticsProvider>
    <UserProfileProvider>
      <Profile />
    </UserProfileProvider>
  </AnalyticsProvider>
);
