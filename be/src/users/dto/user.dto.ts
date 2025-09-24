export type UserPublicDto = {
    username: string;
}

export type UsersResponseDto = {
    success: boolean;
    users: UserPublicDto[];
}