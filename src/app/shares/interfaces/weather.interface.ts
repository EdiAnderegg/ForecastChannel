
export interface Weather {
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
  day : number;
}


export interface Current {
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
  day : number;
}


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
  day : number;
}


export interface Tomorrow {
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
  day : number;
}
