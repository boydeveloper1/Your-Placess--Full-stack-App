import React from "react";

import { useParams } from "react-router-dom";

import PlaceList from "../../components/Place-List/place-list.components";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://images.unsplash.com/photo-1652689035535-c297e19d6dbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp State Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://images.unsplash.com/photo-1652689035535-c297e19d6dbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    address: "20 W 34th St., New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
  // This gives the dynamic part of route from App.js
  const userId = useParams().userId;
  // Compare it against the data we have to render exactly places based on the user
  const loadedPlace = DUMMY_PLACES.filter(
    (places) => places.creator === userId
  );
  return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
