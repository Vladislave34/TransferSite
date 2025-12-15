export default interface ITokenDecode {
    email: string;
    exp: number;
    name: string;
    image: string;
    role: string[] | string | null;
}