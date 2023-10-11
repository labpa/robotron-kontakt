export {
    createTable,
    csv,
    fixAllDates,
    fixAllHeaderNames,
    forceLogin,
    richtigesDatum,
    supabase,
    xml,
}

import {
    createClient,
} from '@supabase/supabase-js';

const supabase = createClient(
    'https://lqgnahenxkmdkenuxbxw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const csv = data => {
    let keys = [];
    for (const key in data[0]) {
        keys.push(key);
    }
    const header = keys.join(";");
    const lines = [];
    for (const i in data) {
        const record = data[i];
        const values = [];
        for (const key in record) {
            const value = record[key];
            values.push("\"" + String(value).replaceAll("\"", "\"\"") + "\"");
        }
        const line = values.join(";");
        lines.push(line);
    }
    return header + "\n" + lines.join("\n");
}









const forceLogin = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session === null) {
        window.open("./login.html", "_self");
    }
};

const session = await supabase.auth.getSession();

const navbar = document.querySelector("nav#navbar");
navbar.classList.add("navbar");

const linkInput = (() => {
    const elem = document.createElement("a");
    if (window.location.href.includes("index.html")) elem.className += " active";
    elem.innerText = "Neuer Kontakt";
    elem.setAttribute("href", "./index.html");
    return elem;
})();

const linkKontakte = (() => {
    const elem = document.createElement("a");
    if (window.location.href.includes("kontakte.html")) elem.className += " active";
    elem.innerText = "Kontakte";
    elem.setAttribute("href", "./kontakte.html");
    return elem;
})();

const linkLogin = (() => {
    const elem = document.createElement("a");
    if (window.location.href.includes("login.html")) elem.className += " active";
    elem.innerText = "Anmelden";
    elem.setAttribute("href", "./login.html");
    return elem;
})();

const linkLogout = (() => {
    const elem = document.createElement("a");
    if (window.location.href.includes("login.html")) elem.className += " active";
    elem.innerText = session.data.session?.user.email + " abmelden";
    elem.setAttribute("href", "a");
    elem.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const {
            error
        } = await supabase.auth.signOut();
        window.open("./login.html", "_self");
    });
    return elem;
})();

navbar.appendChild(linkInput);
if (session.data.session) {
    navbar.appendChild(linkKontakte);
}
navbar.appendChild(session.data.session ? linkLogout : linkLogin);

const footer = document.querySelector("footer#footer");
const linkImpressum = (() => {
    const elem = document.createElement("a");
    elem.innerText = "Impressum";
    elem.setAttribute("href", "./impressum.html");
    return elem;
})();

const linkDokumentation = (() => {
    const elem = document.createElement("a");
    elem.innerText = "Dokumentation";
    elem.setAttribute("href", "./help.html");
    return elem;
})();
footer.appendChild(linkImpressum);
footer.appendChild(linkDokumentation);

const createTable = (data, isWithViewButton = true) => {
    let div = document.querySelector("#container");
    if (data.length === 0) {
        div.innerHTML = "";
        div.appendChild(document.createTextNode("Keine Daten"));
    } else {
        const table = document.createElement("table");
        createTableHead(data, table, isWithViewButton);
        createTableBody(data, table, isWithViewButton);
        div.innerHTML = "";
        div.appendChild(table);
    }
}

const createTableHead = (data, table, isWithViewButton) => {
    const thead = document.createElement("thead");
    const trhead = document.createElement("tr");
    const thView = document.createElement("th");
    if (isWithViewButton) {
        thView.appendChild(document.createTextNode("Ansehen"));
        trhead.appendChild(thView);
    }

    for (const key in data[0]) {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(key.replaceAll("_", " ")));
        trhead.appendChild(th);
    }
    table.appendChild(thead);
    thead.appendChild(trhead);
}

const createTableBody = (data, table, isWithViewButton) => {
    const tbody = document.createElement("tbody");
    for (const row of data) {
        const tr = document.createElement("tr");
        if (isWithViewButton) {
            const buttonView = document.createElement("button");
            buttonView.classList.add("smallButton");
            buttonView.appendChild(document.createTextNode("Details"));
            buttonView.addEventListener("click", () => window.open("./view.html?id=" + row.id, "_self"));
            const tdView = document.createElement("td");
            tdView.appendChild(buttonView);
            tr.appendChild(tdView);

        }
        for (const key in row) {
            let cellContent = row[key];
            const td = document.createElement("td");
            td.dataset.label = key;
            td.appendChild(document.createTextNode(cellContent));

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

const richtigesDatum = scheißdatum => {
    if (scheißdatum === null) {
        return null;
    }
    const date = new Date(scheißdatum);
    const deutschesDatum =
        wochentag(date.getDay()) +
        " " + leadingZero(String(date.getDate())) +
        "." + leadingZero(String(date.getMonth() + 1)) +
        "." + String(date.getFullYear()) +
        includesTime(date, scheißdatum.length);

    return deutschesDatum;
}

const leadingZero = string => {
    return string.length < 2 ? "0" + string : string;
}

const includesTime = (date, length) => {
    if (length > 10) {
        return " " + leadingZero(String(date.getHours())) +
            ":" + leadingZero(String(date.getMinutes())) +
            " Uhr";
    } else {
        return "";
    }
}

const wochentag = n => {
    if (n === 0) {
        return "So";
    }
    if (n === 1) {
        return "Mo";
    }
    if (n === 2) {
        return "Di";
    }
    if (n === 3) {
        return "Mi";
    }
    if (n === 4) {
        return "Do";
    }
    if (n === 5) {
        return "Fr";
    }
    if (n === 6) {
        return "Sa";
    }
}


const xml = data =>
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<kontakte>\n" +
    data.map(record => {
        const elements = [];
        for (let key in record) {
            const value = String(record[key])
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("'", "&apos;")
                .replaceAll("\"", "&quot;");
            key = key.replaceAll(" ", "_"); // XML does not allow whitespace in tags
            elements.push("        <" + key + ">" + value + "</" + key + ">");
        }
        return "    <kontakt>\n" + elements.join("\n") + "\n    </kontakt>";
    }).join("\n") + "\n</kontakte>\n";

const fixAllDates = data => {
    return data.map(record => {
        record.created_at = richtigesDatum(record.created_at);
        record.updated_at = richtigesDatum(record.updated_at);
        record.Beratungstermin = richtigesDatum(record.Beratungstermin);
        record.Gewuenschter_Starttermin = richtigesDatum(record.Gewuenschter_Starttermin);
        return record;
    });
}

const fixAllHeaderNames = data => {
    return data.map(oldRecord => {
        return Object.fromEntries(
            Object.entries(oldRecord).map(([key, value]) => {
                if (key === "created_at") return ["Erstellt_An", value];
                if (key === "Name") return ["Nachname", value];
                if (key === "Mobiltelefon") return ["Mobil", value];
                if (key === "Gewuenschte_Weiterbildung") return ["Weiterbildung", value];
                if (key === "Gewuenschter_Starttermin") return ["Starttermin", value];
                if (key === "Zustellung_Angebot") return ["Angebot", value];
                if (key === "Creator") return ["Mitarbeiter", value];
                if (key === "updated_at") return ["Bearbeitet_An", value];
                return [key, value];
            })
        );
    })
}
