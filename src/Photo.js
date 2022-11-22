import React from "react";

const Photo = ({ urls, likes, user }) => {
    const { regular } = urls;
    const {
        name,
        portfolio_url,
        profile_image: { medium },
    } = user;

    return (
        <article className="photo">
            <img src={regular} alt="" />
            <div className="photo-info">
                <div>
                    <h4>{name}</h4>
                    <p>{likes} Likes</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt={name} className="user-img" />
                </a>
            </div>
        </article>
    );
};

export default Photo;
