﻿export enum Teams {
    None = 0,
    Red = 1,
    Black = 2
}

export enum Roles {
    Шериф = 1,
    Дон = 2,
    Мафія = 3,
    Мирний = 4
}

export enum BestPlayers {
    None = 0,
    Best1 = 1,
    Best2 = 2,
    Best3 = 3
}

export class Role {
    constructor(role: Roles, label: string) {
        this.role = role;
        this.label = label;
    }
    role: Roles;
    label: string;
}

export class BestPlayer {
    constructor(value: BestPlayers, label: string, enabled: boolean) {
        this.value = value;
        this.label = label;
        this.enabled = enabled;
    }
    value: BestPlayers;
    label: string;
    enabled: boolean;
}

export interface IPlayerEntry {
    index: number | null;
    nick: string;
    role?: Role | null;
    foul?: number;
    bestPlayer: BestPlayer;
    result?: number;
    mainScore: number;
    additionalScore: number;
    positionInKillQueue?: number;
    killedAtDay?: boolean;
    killedAtNight?: boolean;
    checkedAtNight?: number;
    rolesAvailable: Role[];
    bestPlayersAvailable: BestPlayer[];
    halfBestWay: boolean;
    fullBestWay: boolean;
}

export class PlayerEntry implements IPlayerEntry {
    constructor(player: IPlayerEntry = {
        index: null,
        nick: '',
        role: null,
        foul: null,
        bestPlayer: new BestPlayer(BestPlayers.None, '', true),
        result: null,
        mainScore: 0,
        additionalScore: 0,
        positionInKillQueue: null,
        killedAtDay: false,
        killedAtNight: false,
        checkedAtNight: null,
        rolesAvailable: [new Role(Roles.Шериф, Roles[1]), new Role(Roles.Дон, Roles[2]), new Role(Roles.Мафія, Roles[3]), new Role(Roles.Мирний, Roles[4])],
        bestPlayersAvailable: [new BestPlayer(BestPlayers.None, '', true), new BestPlayer(BestPlayers.Best1, 'Кращий 1', true),
            new BestPlayer(BestPlayers.Best2, 'Кращий 2', true), new BestPlayer(BestPlayers.Best3, 'Кращий 3', true)],
        halfBestWay: false,
        fullBestWay: false
    }) {
        this.index = player.index;
        this.nick = player.nick;
        this.role = player.role;
        this.foul = player.foul;
        this.bestPlayer = player.bestPlayer;
        this.result = player.result;
        this.mainScore = player.mainScore;
        this.additionalScore = player.additionalScore;
        this.positionInKillQueue = player.positionInKillQueue;
        this.killedAtDay = player.killedAtDay;
        this.killedAtNight = player.killedAtNight;
        this.checkedAtNight = player.checkedAtNight;
        this.rolesAvailable = player.rolesAvailable;
        this.bestPlayersAvailable = player.bestPlayersAvailable;
        this.halfBestWay = player.halfBestWay;
        this.fullBestWay = player.fullBestWay;
    }

    index: number | null;
    nick: string;
    role: Role;
    foul: number | null;
    bestPlayer: BestPlayer;
    result: number | null;
    mainScore: number;
    additionalScore: number;
    positionInKillQueue: number;
    killedAtDay: boolean;
    killedAtNight: boolean;
    checkedAtNight: number;
    rolesAvailable: Role[];
    bestPlayersAvailable: BestPlayer[];
    halfBestWay: boolean;
    fullBestWay: boolean;
}

export interface IProtocol {
    winner: Teams;
    game: number | null;
    table: number | null;
    killedAtDay: number[];
    killedAtNight: number[];
    bestWay: number[];
    donCheck: number | null;
    sheriffCheck: number | null;
    threeCheck: number | null;
    techRed: boolean;
    techBlack: boolean;
    ugadayka: number[];
    ugadaykaEnabled: boolean;
    falseSheriff: number | null;
    sheriffFirstKilled: boolean;
    players: PlayerDto[];
}

export class Protocol implements IProtocol {
    constructor(protocol: IProtocol = {
        winner: Teams.None,
        game: null,
        table: null,
        killedAtDay: [],
        killedAtNight: [],
        bestWay: [],
        donCheck: null,
        sheriffCheck: null,
        threeCheck: null,
        techRed: false,
        techBlack: false,
        ugadayka: [],
        ugadaykaEnabled: false,
        falseSheriff: null,
        sheriffFirstKilled: false,
        players: null
    }) {
        this.winner = protocol.winner;
        this.game = protocol.game;
        this.table = protocol.table;
        this.killedAtDay = protocol.killedAtDay;
        this.killedAtNight = protocol.killedAtNight;
        this.bestWay = protocol.bestWay;
        this.donCheck = protocol.donCheck;
        this.sheriffCheck = protocol.sheriffCheck;
        this.threeCheck = protocol.threeCheck;
        this.techRed = protocol.techRed;
        this.techBlack = protocol.techBlack;
        this.ugadayka = protocol.ugadayka;
        this.ugadaykaEnabled = protocol.ugadaykaEnabled;
        this.falseSheriff = protocol.falseSheriff;
        this.sheriffFirstKilled = protocol.sheriffFirstKilled;
        this.players = protocol.players;
    }

    winner: Teams;
    game: number;
    table: number;
    killedAtDay: number[];
    killedAtNight: number[];
    bestWay: number[];
    donCheck: number;
    sheriffCheck: number;
    threeCheck: number;
    techRed: boolean;
    techBlack: boolean;
    ugadayka: number[];
    ugadaykaEnabled: boolean;
    falseSheriff: number;
    sheriffFirstKilled: boolean;
    players: PlayerDto[];
}

export class PlayerDto {
    index: number;
    nick: string;
    role: Roles;
    foul: number | null;
    bestPlayer: BestPlayers;
    result: number | null;
    positionInKillQueue: number | null;
    killedAtDay: boolean;
    killedAtNight: boolean;
    checkedAtNight: number | null;
    halfBestWay: boolean;
    fullBestWay: boolean;
}

export class ServiceProps {

    constructor() {
        this.night = true;
        this.notOnVote = Array.apply(null, { length: 10 }).map((value: any, index: number) => index + 1);
        this.onVote = [];
        this.killQueue = 1;
        this.miskills = 0;
        this.canFillRedRoles = false;
        this.canClearRoles = false;
        this.rolesValid = false;
        this.nicksValid = false;
        this.checkVisibility = false;
        this.checkSuccess = null;
        this.checkTypeIsDon = null;
        this.currentCheckIndex = null;
    }

    night: boolean;
    onVote: number[];
    notOnVote: number[];
    killQueue: number;
    miskills: number;
    canFillRedRoles: boolean;
    canClearRoles: boolean;
    rolesValid: boolean;
    nicksValid: boolean;
    checkVisibility: boolean;
    checkSuccess: boolean | null;
    checkTypeIsDon: boolean | null;
    currentCheckIndex: number | null;
}