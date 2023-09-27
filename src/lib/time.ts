export const currentTime = new Date().getHours();

export const sunrise:number = (sunrise) => new Date (sunrise * 1000).getHours();
export const sunset:number = (sunset) => new Date (sunset * 1000).getHours();

export const dayTime = currentTime > sunrise && currentTime < sunset 
  ? 'day'
  : 'night';