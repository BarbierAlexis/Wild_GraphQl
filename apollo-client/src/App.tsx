import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
      id
    }
  }
`;

type LaunchType = {
  details: string
  launch_date_utc: string
  launch_success: boolean
  links: {
    video_link: string
  }
  rocket: {
    rocket_name: string
  }
  id: string
}

function App() {
  const { loading, error, data } = useQuery(LAUNCHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Apollo app</h1>
      {data.launches.map((launch: LaunchType, index: number) => (
  
        <div key={launch.id}>
          <h2>Launch n°{index + 1}</h2>
          <p>Date: {launch.launch_date_utc}</p>
          <p>Success: {launch.launch_success ? <DoneIcon/> : <ClearIcon/> }</p>
          <p>Rocket: {launch.rocket.rocket_name} 🚀</p>
          <p>Détails: {launch.details}</p>
          <p>Vidéo link: {launch.links.video_link}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
