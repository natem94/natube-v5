import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constans";
import { SearchBar } from "./";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{ position: "sticky", background: "#000", top: 0, justifyContent: "space-between" }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>

      <SearchBar />

      {!isAuthenticated ? (
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/login" variant="outlined" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/register" variant="contained" color="primary">
            Register
          </Button>
        </Stack>
      ) : (
       
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      )}
    </Stack>
  );
};

export default Navbar;
