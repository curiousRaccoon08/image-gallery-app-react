import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "./NavBar";
import Photo from "./Photo";
const clientID = `?client_id=PPdRsWv8spvgxbzmBPw60HNj_aMNEGNeTbhZS1P5Wvg`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const mounted = useRef(false);
    const [newImages, setNewImages] = useState(false);

    const fetchImages = async () => {
        setLoading(true);
        let url;
        const queryPage = `&query=${query}`;
        const urlPage = `&page=${page}`;

        if (query) {
            url = `${searchUrl}${clientID}${urlPage}${queryPage}`;
        } else {
            url = `${mainUrl}${clientID}${urlPage}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setPhotos((prevPhotos) => {
                if (query && page === 1) {
                    return data.results;
                } else if (query) {
                    return [...prevPhotos, ...data.results];
                } else {
                    return [...prevPhotos, ...data];
                }
            });
            setNewImages(false);
            setLoading(false);
        } catch (error) {
            setNewImages(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        if (!newImages) return;
        if (loading) return;
        setPage((prev) => prev + 1);
        // eslint-disable-next-line
    }, [newImages]);

    const event = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 2
        ) {
            setNewImages(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", event);
        return () => window.removeEventListener("scroll", event);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!query) return;
        if (page === 1) {
            fetchImages();
        }
        setPage(1);
    };

    return (
        <main>
            <NavBar />
            <section className="search">
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="search"
                        className="form-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="submit-btn"
                        onClick={submitHandler}
                    >
                        <FaSearch />
                    </button>
                </form>
            </section>
            <section className="photos">
                <div className="photos-center">
                    {photos.map((photo, index) => {
                        return <Photo key={index} {...photo} />;
                    })}
                </div>
            </section>
            {loading && <h2 className="loading">Loading...</h2>}
        </main>
    );
}

export default App;
