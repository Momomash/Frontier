import { Event } from '@/screens';

export const calculateDuration = (times: Array<Event>): number => {
    let time = 0;
    let startMark = 0;
    for (let i = 0; i < times.length; i++) {
        if (times[i].status === 'active') {
            startMark = times[i].timestamp;
        } else {
            time += times[i].timestamp - startMark;
            startMark = 0;
        }
    }
    if (times[times.length - 1].status === 'active') {
        time += Date.now() - startMark;
    }
    return Math.floor(time / 60000);
};
