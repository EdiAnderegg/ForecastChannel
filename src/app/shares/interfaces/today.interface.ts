export interface Today {
  location : string;
  temperature : number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  description: string;
  icon : string;
  time : number;
  }