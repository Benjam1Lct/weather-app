import React from 'react';
import Compass from './Compass';

const WindTile = ({ speed, gust, deg }) => (
  <div className="bento-item tile wind-tile">
    <h3>Vent</h3>
    <div className="wind-info">
      <div className="wind-arrow">
        <Compass deg={deg} />

      </div>
      <div className="wind-data">
        <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dashing%20Away.png" alt="Dashing Away" width="25" height="25" /> Vitesse : {speed} m/s</p>
        {gust && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Collision.png" alt="Collision" width="25" height="25" /> Rafales : {gust} m/s</p>}
        <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://em-content.zobj.net/source/microsoft-teams/337/compass_1f9ed.png" loading="lazy" alt="1.0" width={"25"} height={"25"}/> Direction : {deg}°</p>
      </div>
      
    </div>
  </div>
);

export default WindTile;
