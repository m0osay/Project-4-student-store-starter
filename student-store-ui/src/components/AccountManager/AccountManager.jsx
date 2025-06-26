import "./AccountManager.css";
//should be profile page
import { useState, useEffect } from "react";
import backgroundVideo from "./background.mp4";
function AccountManager({ onClose, profile, setProfile, setShowSignInPage }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  //vaildates before saving our data
  async function saveProfile(e) {
    e.preventDefault();
    //check if user clicekd isng in onr signuo

    if (mode === "signin") {
      //check they exist
      console.log("THis works");
      const existProfileStr = await localStorage.getItem(username);
      const existProfile = JSON.parse(existProfileStr); //parse it back to an object
      console.log(existProfile);
      if (existProfile == null) {
        //profile doesnt exist
        alert("Account doesn't exist");
      }

      if (existProfile.password != password) {
        alert("Incorrect passowrd");
        return;
      }
    } else {
      if (!/^\d+$/.test(username)) {
        alert("Username must be numbers only");
        return;
      }
    }

    const newProfile = {
      password: password,
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      zipcode: null,
      state: null,
      name: Number(username)
    };

    // Update state
    setProfile((prev) => ({
      ...prev,
      [username]: newProfile,
    }));

    // Save to localStorage
    localStorage.setItem(username, JSON.stringify(newProfile));
    console.log(localStorage);
    setProfile(newProfile);
    console.log("My profile name: ", profile.name)
    setShowSignInPage(false);
  }
  return (
    <div className="am-backdrop" onClick={onClose}>
      <video
        className="am-bg-video"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    
      <div className="am-dialog" onClick={(e) => e.stopPropagation()}>
          <h1> Student Store</h1>
        <button className="am-close" onClick={onClose}>
          ✕
        </button>

        {/* ── mode toggle ─────────────────────────────────── */}
        <div className="am-tabs">
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
        </div>

        {/* ── form ───────────────────────────────────────── */}
        <form onSubmit={saveProfile} className="am-form">
          <input
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit" className="am-submit">
            {mode === "signup" ? "Create account" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountManager;
