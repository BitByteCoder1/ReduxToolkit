import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Home, Logout } from "@mui/icons-material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export default function CustomDrawer() {
	const drawerWidth = 240;
	const router = useNavigate();
	React.useEffect(() => {
		const authentication = onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				router("/login");
			}
		});

		return authentication;
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("signout");
			})
			.catch((error) => {
				// An error happened.
			});
	};

	const handleClick = (text) => {
		switch (text) {
			case "Home":
				router("/");
				break;
			case "Post":
				router("/post");
				break;
			case "Logout":
				handleLogout();
				break;
			default:
				break;
		}
	};

	const drawerIcon = (text) => {
		switch (text) {
			case "Home":
				return <Home />;
			case "Post":
				return <Edit />;
			case "Logout":
				return <Logout />;
			default:
				break;
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />

				<Divider />
				<List>
					{["Home", "Post", "Logout"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => handleClick(text)}>
								<ListItemIcon>{drawerIcon(text)}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
}
