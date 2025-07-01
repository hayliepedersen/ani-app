import { gql } from "@apollo/client";

export const GET_MEDIA_BY_TITLE = gql`
  query GetMediaByTitle($search: String!) {
    Media(search: $search, type: ANIME) {
      id
      title {
        english
      }
    }
  }
`;

export const GET_MEDIA_DETAILS = gql`
  query GetMediaDetails($mediaId: Int!) {
    Media(id: $mediaId) {
      title {
        romaji
        english
      }
      genres
      description(asHtml: false)
      coverImage {
        large
      }
    }
  }
`;
