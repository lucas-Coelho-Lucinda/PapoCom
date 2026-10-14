export type Device = {
    id: number;
    name: string;
    type: string;
    status: "online" | "offline";
};