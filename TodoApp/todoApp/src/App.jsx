import "./App.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from "./components/SignIn";
import Home from "./components/Home";

function App() {
  return (
    <>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
    </>
  );
}

export default App;
