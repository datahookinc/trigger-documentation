export type Parameter = {
    name: string;
    description: string;
    optional: boolean;
    type: string;
}

export type APIEntry = {
    name: string;
    signature: string;
    examples: string[];
    description: string;
    parameters: Parameter[];
    returns: string;
}

export type Section = {
    name: string;
    description: string;
    api: APIEntry[];
}