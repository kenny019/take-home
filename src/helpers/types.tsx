export type rowData = {
    [key: string]: {
        [props: string]: any,
    },
}

export type elementData = {
    [key: string]: {
        props: {
            type: string,
            descr: string,
            defVal? : string,
            name: string,
        }
    }
}