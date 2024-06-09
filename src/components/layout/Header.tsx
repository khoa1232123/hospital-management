import { useLayoutContext } from "@/contexts";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuSettings from "./MenuSettings";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

type Props = {};

const Header = ({}: Props) => {
  const { toggleSidebar } = useLayoutContext();
  return (
    <AppBar position="fixed">
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hospital Management
          </Typography>
        </Box>
        <Box>
          <MenuSettings />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
