import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AlertBox from "../../Components/Alert/alert";
import {
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
   updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import CustomLink from "../../Components/Link/customLink";
import "./login.css";
import GooogleImage from "../../assets/google.png";
import { doc, setDoc } from "firebase/firestore";

const theme = createTheme();
export default function Login() {
   const [userInfo, setUserInfo] = useState({ email: "", password: "" });
   const [alert, setAlert] = useState({ visible: false, severity: "", message: "" });
   const router = useNavigate();
   const timerRef = useRef(null);

   // useEffect(() => {
   //    if (user.isAuthenticated) {
   //       router("/");
   //    }
   // }, [user.isAuthenticated]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      let { email, password } = userInfo;
      try {
         const response = await signInWithEmailAndPassword(auth, email, password);
         let userInfo = {};
         userInfo = {
            displayName: response.user.displayName,
            email: response.user.email,
            uid: response.user.uid,
         };
         router("/");
      } catch (error) {
         console.log(error);
      }
   };

   const handlePassword = () => {
      sendPasswordResetEmail(auth, userInfo.email)
         .then(() => {
            setAlert({ visible: true, severity: "success", message: "Email Sent Successfully" });
            timerRef.current = setTimeout(() => {
               setAlert({ visible: false, severity: "", message: "" });
            }, 2000);
         })
         .catch((error) => {
            setAlert({ visible: true, severity: "error", message: error.message });
            console.log(error.code);
            timerRef.current = setTimeout(() => {
               setAlert({ visible: false, severity: "", message: "" });
            }, 2000);
         });
   };

   const handleGoogleButton = async () => {
      try {
         const response = await signInWithPopup(auth, provider);
         await updateProfile(auth.currentUser, {
            displayName: response.user.displayName,
            phoneNumber: response.user.phoneNumber,
         });
         const userInfo = {
            displayName: response.user.displayName,
            email: response.user.email,
            phoneNumber: response.user.phoneNumber,
            uid: response.user.uid,
         };
         await setDoc(doc(db, "Users", response.user.uid), userInfo);
         return userInfo;
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <AlertBox visible={alert.visible} severity={alert.severity} message={alert.message} />
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Typography component="h1" variant="h5">
                  Sign in
               </Typography>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     value={userInfo.email}
                     onChange={(event) => {
                        setUserInfo({ ...userInfo, email: event.target.value });
                     }}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     value={userInfo.password}
                     onChange={(event) => {
                        setUserInfo({ ...userInfo, password: event.target.value });
                     }}
                  />
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                     Sign In
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <CustomLink message="Forgot Password" handleLink={handlePassword} />
                     </Grid>
                     <Grid item>
                        <Link to="/signup">Don't Have account? Signup</Link>
                     </Grid>
                  </Grid>
               </Box>
               <button className="google_button" onClick={handleGoogleButton}>
                  <img src={GooogleImage} alt="" />
               </button>
            </Box>
         </Container>
      </ThemeProvider>
   );
}
