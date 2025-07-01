"use client";

import { useState, useEffect } from "react";
import { Image } from "next/image";
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA_BY_TITLE, GET_MEDIA_DETAILS } from "@/lib/queries";

export default function AniSearch() {
  const [title, setTitle] = useState("");
  const [getMediaByTitle, { data: titleData, loading: loadingTitle }] =
    useLazyQuery(GET_MEDIA_BY_TITLE);
  const [
    getMediaDetails,
    { data: detailData, loading: loadingDetails, error },
  ] = useLazyQuery(GET_MEDIA_BY_TITLE);

  useEffect(() => {
    if (titleData?.Media?.id) {
      getMediaDetails({
        variables: { mediaId: titleData.Media.id },
      });
    }
  }, [titleData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      getMediaByTitle({
        variables: { search: title.trim() },
      });
    }
  };

  return (
    <div>
      <h1>
        Find out which pokemon/sanrio? character you are based on your favorite
        anime!
      </h1>
      <p>weeb.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="i.e. frieren (peak)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">whoami</button>
      </form>

      {(loadingTitle || loadingDetails) && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {detailData?.Media && (
        <div>
          <h2>
            {detailData.Media.title.english || detailData.Media.title.romaji}
          </h2>
          <Image
            src={detailData.Media.coverImage.large}
            alt={`Cover image for ${
              detailData.Media.title.english || detailData.Media.title.romaji
            }`}
            width={200}
            height={300} 
            priority={false} 
          />
          <p>
            <strong>Genres:</strong> {detailData.Media.genres.join(", ")}
          </p>
          <p>
            <strong>Description:</strong> {detailData.Media.description}
          </p>
        </div>
      )}
    </div>
  );
}
