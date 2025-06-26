import "./ProfileModal.css"
//should be profile page
import { useState, useEffect } from "react";
import emptyProfilePic from "./empty_profile_picture.png";
function ProfileModal({ onClose }) {
  /* single state object so you have “a variable” to read later */
  const [profile, setProfile] = useState({
    first:    "",
    last:     "",
    street:   "",
    city:     "",
    state:    "",
    zipcode:  ""
  })

  /* generic change handler */
  const handle = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value })

  return (
    <div className="pm-backdrop" onClick={onClose}>
      <div className="pm-dialog" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose}>✕</button>

        <h2 className="pm-title">Your profile</h2>

        {/* photo preview */}
        <div className="pm-photo">
          <img
            src= {emptyProfilePic}
            alt="profile"
          />
        </div>
 

        {/* first / last */}
        <div className="pm-row">
          <input
            className="pm-input"
            placeholder="First name"
            name="first"
            value={profile.first}
            onChange={handle}
          />
          <input
            className="pm-input"
            placeholder="Last name"
            name="last"
            value={profile.last}
            onChange={handle}
          />
        </div>

        {/* street */}
        <input
          className="pm-input full"
          placeholder="Street address"
          name="street"
          value={profile.street}
          onChange={handle}
        />

        {/* city / state / zip */}
        <div className="pm-row">
          <input
            className="pm-input grow"
            placeholder="City"
            name="city"
            value={profile.city}
            onChange={handle}
          />
          <input
            className="pm-input narrow"
            placeholder="State"
            name="state"
            value={profile.state}
            onChange={handle}
          />
          <input
            className="pm-input narrow"
            placeholder="ZIP"
            name="zipcode"
            value={profile.zipcode}
            onChange={handle}
          />
        </div>

        <button className="pm-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
export default ProfileModal;