import React from "react";
import {gql} from "../__generated__";
import {useQuery} from "@apollo/client";
import {Layout, QueryResult} from "../components";
import {useParams} from "react-router-dom";

export const GET_TRACK = gql(`
    query GetTrack() {
        track() {
            id
            title
            author {
                id
                name
                photo
            }
            thumbnail
            length
            modulesCount
            numberOfViews
            modules {
                id
                title
                length
            }
            description
        }
    }
`)

const Track = () => {
    const {trackId = ''} = useParams();
    return <Layout></Layout>
}

export default Track;