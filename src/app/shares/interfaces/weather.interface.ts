export interface Weather {
  location: string;
  time: number;
}

export interface Current {
  location: string;
  temperature: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  description: string;
  icon: string;
  time: number;
}

export interface Today {
  location: string;
  temperature: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  description: string;
  icon: string;
  time: number;
}

export interface Tomorrow {
  location: string;
  temperature: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  description: string;
  icon: string;
  time: number;
}

export interface week {
  temp1: number;
  temp2: number;
  description: string;
  icon: string;
  day: number;
}

export interface weekArr {
  location: string;
  time: number;
  days: any[];
}

export interface Day {
  sunrise: number;
  sunset: number;
  actual: number;
}
