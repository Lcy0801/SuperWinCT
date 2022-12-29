//基于纬度计算瓦片的行号
export const lat2tile=(lat,zoom)=>{
    return Math.floor((90- Number(lat))/180*Math.pow(2,Number(zoom)));
}

//基于经度计算瓦片的列号
export const lon2tile=(lon,zoom)=>{
    return Math.floor(( Number(lon)+180)/360*Math.pow(2,Number(zoom)));
}

//基于经纬度计算行列号
export const lonlat2tile=(lon,lat,zoom)=>{
    return([lon2tile(lon,zoom),lat2tile(lat,zoom)]);
}

/**
 * 基于瓦片编号计算瓦片对应的四至范围
 * @param {*} x 瓦片列号
 * @param {*} y 瓦片行号
 * @param {*} zoom 瓦片层级
 */
export const tile2bounds=(x,y,zoom)=>{
    const dlon=360/Math.pow(2,zoom);
    const dlat=180/Math.pow(2,zoom);
    const minLon=x*dlon-180;
    const maxLon=(x+1)*dlon-180;
    const maxLat=90- y*dlat;
    const minLat=90-(y+1)*dlat;
    return {minLon,maxLon,minLat,maxLat};
}