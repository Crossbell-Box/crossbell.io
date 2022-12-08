import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function formatDate(date: Date | number | string) {
	return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export function formatDateFromNow(date: Date | number | string) {
	return dayjs(date).fromNow();
}

export function formatToRFC3339(date: Date | number | string) {
	return dayjs(date).format("YYYY-MM-DDTHH:mm:ss[Z]");
}

export function formatToISO(date: Date | number | string) {
	return dayjs(date).toISOString();
}

export { dayjs };
