export {
    createTable,
    csv,
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
    withReadableDates,
    withReadableKeys,
    xml,
}

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
    'https://lqgnahenxkmdkenuxbxw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const csv = data =>
    Object.keys(data[0]).join(";") + "\n" +
    data.map(record =>
        Object.values(record).map(value =>
            "\"" + String(value).replaceAll("\"", "\"\"") + "\""
        ).join(";")
    ).join("\n");

const xml = data =>
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<kontakte>\n" +
    data.map(record => {
        const elements = Object.entries(record).map(kv =>
            "\t\t<" + kv[0] + ">" +
            String(kv[1]).replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll("'", "&apos;").replaceAll("\"", "&quot;")
            .replaceAll(" ", "_").replaceAll("\t", "_").replaceAll("\n", "_") +
            "</" + kv[0] + ">").join("\n");
        return "\t<kontakt>\n" + elements + "\n\t</kontakt>"
    }).join("\n") + "\n</kontakte>\n";

const forceLogin = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session === null) {
        window.open("./login.html", "_self");
    }
};

const showNavbar = async selector => {
    const navbar = document.querySelector(selector);

    navbar.appendChild((() => {
        const image = document.createElement("img");
        image.src= "./navbarLogo.png";
        image.classList.add("navbarlogo");
        return image;
    })())

    navbar.appendChild((() => {
        const elem = document.createElement("a");
        elem.textContent = "Neuer Kontakt";
        elem.setAttribute("href", "./index.html");
        if (window.location.href.includes("index.html")) {
            elem.classList.add("active");
        }
        return elem;
    })());

    const session = await supabase.auth.getSession();
    if (session.data.session) {
        navbar.appendChild((() => {
            const elem = document.createElement("a");
            elem.textContent = "Kontakte";
            elem.setAttribute("href", "./kontakte.html");
            if (window.location.href.includes("kontakte.html")) {
                elem.classList.add("active");
            }
            return elem;
        })());

        navbar.appendChild((() => {
            const elem = document.createElement("a");
            elem.textContent = "Mitarbeiter";
            elem.setAttribute("href", "./users.html");
            if (window.location.href.includes("users.html")) {
                elem.classList.add("active");
            }
            return elem;
        })());

        navbar.appendChild((() => {
            const elem = document.createElement("a");
            elem.textContent = session.data.session.user.email + " abmelden";
            elem.setAttribute("href", "a");
            elem.onclick = async ev => {
                ev.preventDefault();
                const { error } = await supabase.auth.signOut();
                window.open("./login.html", "_self");
            };
            if (window.location.href.includes("login.html")) {
                elem.classList.add("active");
            }
            return elem;
        })());
    } else {
        navbar.appendChild((() => {
            const elem = document.createElement("a");
            elem.textContent = "Anmelden";
            elem.setAttribute("href", "./login.html");
            if (window.location.href.includes("login.html")) {
                elem.classList.add("active");
            }
            return elem;
        })());
    }
};

const showFooter = selector => {
    const footer = document.querySelector(selector);
    footer.appendChild((() => {
        const elem = document.createElement("a");
        elem.textContent = "Impressum";
        elem.setAttribute("href", "./impressum.html");
        return elem;
    })());
    footer.appendChild((() => {
        const elem = document.createElement("a");
        elem.textContent = "Dokumentation";
        elem.setAttribute("href", "./help.html");
        return elem;
    })());
}

const createTable = (selector, data, withViewButton = true) => {
    let container = document.querySelector(selector);
    if (data.length === 0) {
        container.textContent = "Keine Daten";
    } else {
        const table = document.createElement("table");
        container.replaceChildren(table);

        // table head
        const tr = document.createElement("tr");
        if (withViewButton) {
            const th = document.createElement("th");
            th.textContent = "Details";
            tr.appendChild(th);
        }
        for (const key in data[0]) {
            const th = document.createElement("th");
            th.textContent = key.replaceAll("_", " ");
            tr.appendChild(th);
        }
        const thead = document.createElement("thead");
        thead.appendChild(tr);
        table.appendChild(thead);

        // table body
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for (const record of data) {
            const tr = document.createElement("tr");
            tbody.appendChild(tr);
            if (withViewButton) {
                const button = document.createElement("button");
                button.textContent = "Details";
                button.classList.add("smallButton");
                button.onclick = () => window.open("./view.html?id=" + record.id, "_self");
                const td = document.createElement("td");
                td.appendChild(button);
                tr.appendChild(td);
            }
            for (const key in record) {
                const value = record[key];
                const td = document.createElement("td");
                td.textContent = value || "null";
                td.dataset.label = key;
                tr.appendChild(td);
            }
        }
    }
}

const withReadableDates = data =>
    data.map(record => {
        record.created_at = readableDate(record.created_at);
        record.updated_at = readableDate(record.updated_at);
        record.Beratungstermin = readableDate(record.Beratungstermin);
        record.Gewuenschter_Starttermin = readableDate(record.Gewuenschter_Starttermin);
        return record;
    });

const withReadableKeys = data =>
    data.map(record =>
        Object.fromEntries(Object.entries(record).map(([key, value]) => [
            key === "created_at" ? "Erstellt am" :
            key === "Name" ? "Nachname" :
            key === "Mobiltelefon" ? "Mobil" :
            key === "Gewuenschte_Weiterbildung" ? "Gewünschte Weiterbildung" :
            key === "Gewuenschter_Starttermin" ? "Gewünschter Starttermin" :
            key === "Zustellung_Angebot" ? "Zustellung" :
            key === "Creator" ? "Erstellt von" :
            key === "updated_at" ? "Bearbeitet am" : key, value
        ])));

// Helpers

const readableDate = isoDate => {
    if (isoDate === null) {
        return null;
    }
    const date = new Date(isoDate);
    return abbrDayOfWeek(date.getDay()) +
        " " + String(date.getDate()).padStart(2, "0") +
        "." + String(date.getMonth() + 1).padStart(2, "0") +
        "." + String(date.getFullYear()) +
        timeOfDayIf(isoDate.length > 10, date);
}
const abbrDayOfWeek = n =>
    n === 0 ? "So" :
    n === 1 ? "Mo" :
    n === 2 ? "Di" :
    n === 3 ? "Mi" :
    n === 4 ? "Do" :
    n === 5 ? "Fr" :
    n === 6 ? "Sa" :
    "";

const timeOfDayIf = (pred, date) => pred ?
    " " + String(date.getHours()).padStart(2, "0") +
    ":" + String(date.getMinutes()).padStart(2, "0") +
    " Uhr" : "";
