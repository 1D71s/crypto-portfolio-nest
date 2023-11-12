

export interface ChartStateForResult {

    coinState: number;

    date: Date;

}

export interface ChartState extends ChartStateForResult {

    coin: string;
}