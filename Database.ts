namespace FireworkSimulation {

    export interface Rocket {
        [name: string]: {
            particleAmount: number;
            color: string;
            size: number;
            lifetime: number;
        };
    }

    let url: string = "https://webuser.hs-furtwangen.de/~schindlr/Database/index.php/";
}