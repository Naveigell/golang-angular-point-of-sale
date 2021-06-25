export interface AlertModel {
    message: string;
    // give -1 to deactivate timeout
    duration: number;
    style: string;
    name: string;
}
