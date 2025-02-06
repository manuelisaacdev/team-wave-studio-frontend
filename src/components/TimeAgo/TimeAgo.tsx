import React from 'react';
import dayjs from 'dayjs';
import TimeAgoJS from 'javascript-time-ago';

import pt from 'javascript-time-ago/locale/pt';
import ru from 'javascript-time-ago/locale/ru';
import de from 'javascript-time-ago/locale/de';
import es from 'javascript-time-ago/locale/es';
import en from 'javascript-time-ago/locale/en';

import TimeAgoProps from './TimeAgoProps';

TimeAgoJS.addLocale(ru)
TimeAgoJS.addLocale(de)
TimeAgoJS.addLocale(es)
TimeAgoJS.addLocale(pt)
TimeAgoJS.addDefaultLocale(en)

export default function TimeAgo({date=dayjs().toISOString(), locale="pt-BR", formatStyleName, ...rest}:TimeAgoProps) {
    const timeAgoJS = new TimeAgoJS(locale);

    return (
        <span {...rest}>{timeAgoJS.format(dayjs(date).toDate(), formatStyleName)}</span>
    )
}
