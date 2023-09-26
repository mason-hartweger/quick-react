export const containsSameMeetingDays = (x,y) => {
    if (x === "" || y === "") {
        return false;
    } else if (x.search("M") == -1 && y.search("M") == -1) {
        return true;
    } else if (x.search("Tu") == -1 && y.search("Tu") == -1) {
        return true;
    } else if (x.search("W") == -1 && y.search("W") == -1) {
        return true;
    } else if (x.search("Th") == -1 && y.search("Th") == -1) {
        return true;
    } else if (x.search("F") == -1 && y.search("F") == -1) {
        return true;
    }
}

export const containsSameTerm = (x,y) => {
    if (x === y) {
        return true;
    } else {
        return false;
    }
}

export const containsOverlappingMeetingTimes = (x,y) => {
    let x_start = x.substring(x.length-7,x.length-11);
    let x_end = x.substring(x.length-5,x.length);
    let y_start = y.substring(y.length-7,y.length-11);
    let y_end = y.substring(y.length-5,y.length);
    if (x === "" || y === "") {
        return false;
    } else if (x_start <= y_start && x_end <= y_end && y_start <= x_end) {
        return true;
    } else if (y_start <= x_start && y_end <= x_end && x_start <= y_end) {
        return true;
    } else if (x_start <= y_start && y_end <= x_end) {
        return true;
    } else if (y_start <= x_start && x_end <= y_end) {
        return true;
    } else {
        return false;
    }
}