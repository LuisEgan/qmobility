import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SocialNetworkLogInInput {
  @Field()
  accessToken: string;
}
