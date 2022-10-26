import React from "react";
import defaultPicture from "../images/defaultUser.png";
import style from "../styles/PostProfilePicture.module.css";

const PostProfilePicture = ({ picture, fromCommentProfile }) => {
  console.log(fromCommentProfile)

  if (picture !== "" && fromCommentProfile !== true)
    return (
      <div
        className={style.profilePicture}
        style={{
          backgroundImage: `url(http://localhost:4000/images/users/${picture})`,
        }}
      />
    );

  if (picture === "" && fromCommentProfile !== true)
    return (
      <div
        className={style.profilePicture}
        style={{ backgroundImage: `url(${defaultPicture})` }}
      />
    );

    if (picture !== "" && fromCommentProfile === true)
    return (
      <div
        className={style.fromCommentProfile}
        style={{
          backgroundImage: `url(http://localhost:4000/images/users/${picture})`
        }}
      />
    );

  if (picture === "" && fromCommentProfile === true)
    return (
      <div
        className={style.fromCommentProfile}
        style={{ backgroundImage: `url(${defaultPicture})` }}
      />
    );
};

export default PostProfilePicture;

/* fromCommentProfile
?
{'width': '25px'}
:
null */
