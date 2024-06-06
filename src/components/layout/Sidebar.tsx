import AccessibleIcon from "@mui/icons-material/Accessible";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import MailIcon from "@mui/icons-material/Mail";
import MasksIcon from "@mui/icons-material/Masks";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MedicationIcon from "@mui/icons-material/Medication";

import {
  CSSObject,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutContext } from "@/contexts";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = {};

const Sidebar = ({}: Props) => {
  const pathName = usePathname();
  const { openSidebar } = useLayoutContext();

  return (
    <Drawer variant="permanent" open={openSidebar}>
      <DrawerHeader />
      <Divider />
      <List>
        {[
          { label: "Users", link: "/users", Icon: <AdminPanelSettingsIcon /> },
          { label: "Patients", link: "/patients", Icon: <AccessibleIcon /> },
          {
            label: "Departments",
            link: "/departments",
            Icon: <BedroomChildIcon />,
          },
          {
            label: "Appointments",
            link: "/appointments",
            Icon: <MasksIcon />,
          },
          {
            label: "Medical Records",
            link: "/medical-records",
            Icon: <AssignmentIndIcon />,
          },
          {
            label: "Medications",
            link: "/medications",
            Icon: <MedicationIcon />,
          },
        ].map((item, index) => (
          <Link
            key={item.label}
            href={item.link}
            className="no-underline text-black"
          >
            <ListItem
              disablePadding
              className={
                pathName.length > 3 && pathName.includes(item.link)
                  ? `bg-gray-300`
                  : ""
              }
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openSidebar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSidebar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.Icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: openSidebar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: openSidebar ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openSidebar ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: openSidebar ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
