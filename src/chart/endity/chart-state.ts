import { ObjectType, Field } from "@nestjs/graphql";
import { ChartStateForResult } from "./chart-state-for-result";

@ObjectType()
export class ChartState extends ChartStateForResult {

    @Field()
    readonly coin: string;
}

export { ChartStateForResult };
