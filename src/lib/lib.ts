export const round:(num:number) => number = (num:number) => Math.round(num);

export const capitalizeFirstLetter:(str:string) => string = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getBigIcon = (icon:string) => icon.replace('64x64', '128x128');

export const isCelcsius = (temperatureUnit:string) => temperatureUnit === 'c';
export const isFahrenheit = (temperatureUnit:string) => temperatureUnit === 'f';