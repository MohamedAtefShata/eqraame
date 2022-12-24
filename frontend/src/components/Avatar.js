import React from "react";
import "./Styles/Avatar.css";

const Avatar = ({ className, src, alt, ...props }) => {
  const handelOnError = (e) => {
    e.target.src =
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png";
  };
  return (
    <div>
      {src ? (
        <img
          {...props}
          className={`defaultClass ${className}`}
          src={src}
          alt={alt}
          onError={handelOnError}
        />
      ) : (
        <img
          {...props}
          className={`defaultClass ${className}`}
          src={
            "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
          }
          alt={alt}
        />
      )}
    </div>
  );
};

export default Avatar;
