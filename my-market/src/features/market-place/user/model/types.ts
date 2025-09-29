export interface NonSellerResponse {
  response: {
    profileResponse: {
      name: string;
      email: string;
    };
    role: {
      roleName: string;
    };
  };
}

export interface SellerResponse {
  response: {
    postResponse: [
      {
        title: string
        description: string
        price: string
        status: string
        category: string
        url: string
        created_at: string
      }
    ]
    profileResponse: {
      name: string;
      email: string;
    };
    role: {
      roleName: string;
    };
  };
}

export type ProfileDataResponse = NonSellerResponse | SellerResponse;


export interface ProfileResponseState {
  profileResponse: ProfileDataResponse | null,
  loading: boolean,
  error: string | null
}