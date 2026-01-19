import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button";
import { Link } from "@/shared/ui/link";
import { NavbarDivider } from "./navbar-divider";
import styles from "./navbar.module.scss";
import { useAuth } from "../../../../../app/providers/auth";
import { usePathname } from "next/navigation";
import { UserDto } from "@/shared/lib/openapi";

interface NavItem {
  name: string;
  path: string;
}

interface NavbarNavItemsProps {
  onNavClick: () => void;
  isMobile?: boolean;
}

const getNavItems = (location: string, user?: UserDto): NavItem[] => {
  const isPanelSection =
    location === "/panel" || location.startsWith("/panel/");
  if (isPanelSection && user?.admin) {
    return [
      { name: "Dashboard", path: "/panel/dashboard" },
      { name: "Analytics", path: "/panel/analytics" },
      { name: "Vouchers", path: "/panel/vouchers" },
      { name: "Projects", path: "/panel/projects" },
      { name: "Reports", path: "/panel/reports" },
    ];
  } else {
    return [
      { name: "Home", path: "/" },
      { name: "Downloads", path: "/downloads/main" },
      { name: "Information", path: "/information/:general" },
      user
        ? { name: "Profile", path: `/profile/${user.name}/:projects` }
        : { name: "Login", path: "/login" },
    ];
  }
};

const getFinalNavPath = (path: string, location: string) => {
  const navPaths = path.split("/");
  const locationPaths = location.split("/");
  if (navPaths[1] === locationPaths[1]) {
    return navPaths
      .map((p, index) =>
        p.startsWith(":") ? (locationPaths[index] ?? p.replace(":", "")) : p,
      )
      .join("/");
  } else {
    return navPaths
      .map((p) => (p.startsWith(":") ? p.replace(":", "") : p))
      .join("/");
  }
};

export const NavbarNavItems = ({
  onNavClick,
  isMobile = false,
}: NavbarNavItemsProps) => {
  const location = usePathname()!;
  const { user } = useAuth();
  const navItems = getNavItems(location, user);

  return (
    <>
      {navItems.map(({ name, path }, index) => {
        const finalNavPath = getFinalNavPath(path, location);
        const isActive = location === finalNavPath;
        return (
          <nav key={path} className={styles.nav}>
            <Link
              link={finalNavPath}
              hideStyles={true}
              className={styles.buttonContainer}
            >
              {isMobile && index === 0 && <NavbarDivider type="horizontal" />}
              {!isMobile && <NavbarDivider />}
              <SimpleButton
                navPaddings
                key={name}
                width="100%"
                isClicked={isActive}
                className={styles.button}
                onTap={onNavClick}
              >
                <BedrockText
                  text={name}
                  type="p"
                  extraClassName={styles.text}
                />
              </SimpleButton>
              {isMobile && <NavbarDivider type="horizontal" />}
            </Link>
          </nav>
        );
      })}
    </>
  );
};
