import React from 'react';

const TemperatureTile = ({ temp_max, temp_min, feels_like }) => (
  <div className="bento-item tile temperature-tile">
    <h3>Températures</h3>
    <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Thermometer-3d-icon.png" loading="lazy" alt="15.1" width="24" height="24" /> Max : {temp_max}°C</p>
    <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Thermometer-3d-icon.png" loading="lazy" alt="15.1" width="24" height="24" style={{filter: "hue-rotate(240deg) saturate(2) brightness(1)"}} /> Min : {temp_min}°C</p>
    <p style={{display:"flex", alignItems:"center", gap:'0.5rem'}}><img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Deciduous-Tree-3d-icon.png" loading="lazy" alt="15.1" width="24" height="24" /> Ressenti : {feels_like}°C</p>
  </div>
);

export default TemperatureTile;
