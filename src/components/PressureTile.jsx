import React from 'react';

const PressureTile = ({ pressure, sea_level, grnd_level }) => (
  <div className="bento-item tile pressure-tile">
    <h3>Pression</h3>
    <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://em-content.zobj.net/source/microsoft/379/magnifying-glass-tilted-left_1f50d.png" loading="lazy" alt="15.1" width="24" height="24" /> Pression : {pressure} hPa</p>
    {sea_level && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Water-Wave-3d-icon.png" width="24" height="24"/> Mer : {sea_level} hPa</p>}
    {grnd_level && <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/World-Map-3d-icon.png" width="24" height="24"/> Sol : {grnd_level} hPa</p>}
  </div>
);

export default PressureTile;
