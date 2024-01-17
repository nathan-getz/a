const doc = document;
/**
 * @param {Date} date
 */
function daysSince(date) {
    return Math.floor((new Date() - date) / (24 * 60 * 60 * 1000));
}

const GRMN1020_CurrentModule = {
    getURL() {
        let weekNum = Math.floor(daysSince(new Date(2024, 0, 15, 0, 0)) / 7) + 1;
        let panelNum = this.getPanelNum();
        
        return `https://canvas.colorado.edu/courses/101256/pages/week-${weekNum}-overview#kl_panel_${panelNum}_content`;
    },
    getPanelNum() {
        let day = new Date().getDay() - 1;
        return Math.min(Math.max(day - (day > 2), 0), 3);
    }
}

const CSCI2270_CurrentAssignmentRepo = {
    getURL(username = "nathan-getz") {
        let weekNum = Math.floor(daysSince(new Date(2024, 0, 16, 0, 0)) / 7);
        weekNum -= (weekNum > 6) + (weekNum > 10);
        
        return `https://github.com/cu-csci-2270-spring-2023/assignment-${weekNum}-${username}`;
    }
}

const CSCI2270_CurrentRecitationRepo = {
    getURL(username = "nathan-getz") {
        let weekNum = Math.floor(daysSince(new Date(2024, 0, 16, 0, 0)) / 7);
        weekNum -= (weekNum > 6) + (weekNum > 10);

        return `https://github.com/cu-csci-2270-spring-2023/recitation-${++weekNum}-${username}`
    }
}

const urlParams = new URL(window.location.toLocaleString()).searchParams;
const id = urlParams.get("id").toString();
const username = (urlParams.get("username") == null) ? "nathan-getz" : urlParams.get("username").toString();

/**
 * @param {String} id
 */
function getUrl(id, username="nathan-getz") {
    if (id == "grmn1020") return GRMN1020_CurrentModule.getURL();
    if (id == "csci2270_a") return CSCI2270_CurrentAssignmentRepo.getURL(username);
    if (id == "csci2270_r") return CSCI2270_CurrentRecitationRepo.getURL(username);

    return id;
}

/**
 * @param {String} id
 * @param {String} username
 */
function redirect(id, username) {
    let url = getUrl(id, username);
    if (url == id) return false;

    let meta = doc.createElement("meta");
    meta.httpEquiv = "Refresh";
    meta.content = "0; url=" + url;
    doc.head.appendChild(meta);

    return true;
}

redirect(id, username);
