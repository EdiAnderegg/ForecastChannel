
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

}

export interface week {
  location : string;
  temp1 : number;
  temp2 : number;
  description : string;
  icon : string;
  day : number;
}
