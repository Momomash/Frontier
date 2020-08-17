export const initialUsers = [
    {
        id: 1,
        name: 'Франц',
        tariff: '1',
        duration: 110,
        cost: 220,
        status: 'active',
    },
    {
        id: 2,
        name: 'AФранц2',
        tariff: '2',
        duration: 110,
        cost: 220,
        status: 'pause',
    },
    {
        id: 3,
        name: 'Франц3',
        tariff: '2',
        duration: 110,
        cost: 220,
        status: 'active',
    },
];

export const initialTariffs = [
    {
        id: 1,
        title: '2,5р/мин',
        cost: 2.5,
        maxCost: 600,
        isDuration: true,
    },
    {
        id: 2,
        title: 'Ночефка без буфета',
        cost: 0,
        maxCost: 400,
        isDuration: false,
    },
    {
        id: 3,
        title: 'Ночефка с буфетом',
        cost: 0,
        maxCost: 600,
        isDuration: false,
    },
    {
        id: 4,
        title: 'OneGame',
        cost: 0,
        maxCost: 100,
        isDuration: false,
    },
];
