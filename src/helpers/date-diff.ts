/**
 * This helper ensure that there's not more than 30 days between two given dates
 * @param start
 * @param end
 */
export default function validateInterval (start: Date, end: Date): boolean {
    if(start && end) {
        const diff_in_milliseconds = end.getTime() - start.getTime();
        const diff_in_months = diff_in_milliseconds / (1000 * 60 * 60 * 24 * 30);
        return diff_in_months <= 1;
    }
    return false;
}
