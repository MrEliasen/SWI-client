export function spacer(i: number, total: number) {
    if (i > 0) {
        if (total > i + 1) {
            return ", ";
        }

        if (total === i + 1) {
            return " and ";
        }
    }

    return "";
}
