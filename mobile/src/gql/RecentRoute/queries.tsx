import { gql } from "@apollo/client";

export interface IRoute {
  origin?: string;
  destination?: string;
  userId?: string;
}

export interface IGetRouterRecent {
  getMyRecentRoutes: IRoute[];
}

export interface IGetRouterRecentVar {
  limit?: number;
}

// * Search Router Recent
const getMyRecentRoutes = gql`
  query GetMyRecentRoutes($limit: Float!) {
    getMyRecentRoutes(limit: $limit) {
      origin
      destination
      userId
    }
  }
`;

export default {
  getMyRecentRoutes,
};
