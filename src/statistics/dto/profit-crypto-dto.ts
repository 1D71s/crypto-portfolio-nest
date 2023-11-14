import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { IdPortfolioInput } from "src/portfolio/dto/id-portfolio-dto"


@InputType()
export class GetProfitOneCryptoDto extends IdPortfolioInput {

    @IsNotEmpty()
    @Field()
    readonly coin: string
}