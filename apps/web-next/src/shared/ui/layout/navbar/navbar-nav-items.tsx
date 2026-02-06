import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button";
import { Link } from "@/shared/ui/link";
import { NavbarDivider } from "./navbar-divider";
import styles from "./navbar.module.scss";
import { useAuth } from "@/app/providers/auth";
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

const getNavItems = (pathname: string, user?: UserDto): NavItem[] => {
  const isPanelSection = pathname === "/panel" || pathname.startsWith("/panel/");

  if (isPanelSection && user?.admin) {
    return [
      { name: "Dashboard", path: "/panel/dashboard" },
      { name: "Analytics", path: "/panel/analytics" },
      { name: "Vouchers", path: "/panel/vouchers" },
      { name: "Projects", path: "/panel/projects" },
      { name: "Reports", path: "/panel/reports" },
    ];
  }

  return [
    ...(user?.admin ? [{ name: "Panel", path: "/panel" }] : []),
    { name: "Home", path: "/" },
    { name: "Downloads", path: "/downloads/main" },
    { name: "Information", path: "/information/:general" },
    user
      ? { name: "Profile", path: `/profile/${user.name}/:projects` }
      : { name: "Login", path: "/login" },
  ];
};

const resolveDynamicSegment = (segment: string, fallback?: string): string =>
  segment.startsWith(":") ? (fallback ?? segment.replace(":", "")) : segment;

const getFinalNavPath = (path: string, location: string): string => {
  const navSegments = path.split("/");
  const locationSegments = location.split("/");
  const isSameSection = navSegments[1] === locationSegments[1];

  return navSegments
    .map((segment, i) =>
      resolveDynamicSegment(segment, isSameSection ? locationSegments[i] : undefined)
    )
    .join("/");
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
