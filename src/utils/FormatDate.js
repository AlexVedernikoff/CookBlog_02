import { format } from 'date-fns';

export const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'LLLL d, y');
};
