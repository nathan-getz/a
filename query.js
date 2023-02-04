const doc = document;
/**
 * @param {Date} date
 */
function daysSince(date) {
    return Math.floor((new Date() - date) / (24 * 60 * 60 * 1000));
}

const GRMN1020_CurrentModule = {
    getURL() {
        let weekNum = Math.floor(daysSince(new Date(2023, 0, 8, 0, 0)) / 7);
        let panelNum = this.getPanelNum();
        
        return `https://canvas.colorado.edu/courses/90354/pages/week-${weekNum}-overview#kl_panel_${panelNum}_content`;
    },
    getPanelNum() {
        let day = new Date().getDay() - 1;
        return Math.min(Math.max(day - (day > 2), 0), 3);
    }
}

const CSCI2270_CurrentAssignmentRepo = {
    getURL() {
        let day = new Date().getDay() - 1;
        let weekNum = Math.floor((new Date() - new Date(2023, 0, 8, 0, 0)) / (7 * 24 * 60 * 60 * 1000)).toString();
        let panelNum = Math.min(Math.max(day - (day > 2), 0), 3).toString();

        return `https://canvas.colorado.edu/courses/90354/pages/week-${weekNum}-overview#kl_panel_${panelNum}_content`;
    }
}

const urlParams = new URL(window.location.toLocaleString()).searchParams;
const id = urlParams.get("id").toString();

/**
 * @param {String} id
 */
function getUrl(id) {
    if (id == "grmn1020") return GRMN1020_CurrentModule.getURL();

    return id;
}

/**
 * @param {String} id 
 */
function redirect(id) {
    let url = getUrl(id);
    if (url == id) return false;

    let meta = doc.createElement("meta");
    meta.httpEquiv = "Refresh";
    meta.content = "0; url=" + url;
    doc.head.appendChild(meta);

    return true;
}

redirect(id);
