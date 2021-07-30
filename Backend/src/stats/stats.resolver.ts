import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GqlUser } from 'src/customization/decorators/decorators';
import { User } from 'src/user/user.entity';
import { Stats } from './stats.entity';
import { StatsService } from './stats.service';

@Resolver('Stats')
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  @Query(() => Stats)
  @UseGuards(GqlAuthGuard)
  async getMyStats(@GqlUser() user: User): Promise<Stats> {
    return this.statsService.getMyStats(user);
  }
}
