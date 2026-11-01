
const dishes = [
    {
        naziv: "Vojvodinska domača deska",
        opis: "Domača kulen, šunka, čvarci, mlad sir in vložena zelenjava",
        kategorija: "Predjedi",
        alergeni: "Mleko",
        cena: 5.80
    },
    {
        naziv: "Nedeljska goveja juha",
        opis: "Bistra goveja juha z domačimi rezanci in korenčkom",
        kategorija: "Predjedi",
        alergeni: "Gluten, jajca",
        cena: 3.20
    },
    {
        naziv: "Pogačice z ocvirki",
        opis: "Tople domače pogačice z ocvirki",
        kategorija: "Predjedi",
        alergeni: "Gluten, mleko, jajca",
        cena: 3.50
    },
    {
        naziv: "Kremna juha iz pečene paprike",
        opis: "Juha iz rdeče paprike z dodatkom kisle smetane",
        kategorija: "Predjedi",
        alergeni: "Mleko",
        cena: 3.80
    },
    {
        naziv: "Tavankutski goveji perkelt",
        opis: "Goveji perkelt z domačimi rezanci in skuto",
        kategorija: "Glavne jedi",
        alergeni: "Gluten, mleko, jajca",
        cena: 6.50
    },
    {
        naziv: "Subotiška polnjena vešalica",
        opis: "Svinjski file, polnjen s šunko in sirom, pečen na žaru",
        kategorija: "Glavne jedi",
        alergeni: "Mleko",
        cena: 9.90
    },
    {
        naziv: "Ribji paprikaš",
        opis: "Pikanten ribji paprikaš iz krapa z domačimi rezanci",
        kategorija: "Glavne jedi",
        alergeni: "Ribe, gluten, jajca",
        cena: 5.80
    },
    {
        naziv: "Polnjena paprika v omaki",
        opis: "Mleto meso in riž v paradižnikovi omaki s krompirjevim pirejem",
        kategorija: "Glavne jedi",
        alergeni: "Gluten, mleko",
        cena: 4.20
    },
    {
        naziv: "Bunjevački fanki",
        opis: "Cvrto kvašeno testo z domačo marelično marmelado",
        kategorija: "Sladice",
        alergeni: "Gluten, mleko, jajca",
        cena: 3.80
    },
    {
        naziv: "Slivovi gomboci",
        opis: "Krompirjevi cmoki s slivami, drobtinami in cimetom",
        kategorija: "Sladice",
        alergeni: "Gluten, mleko, jajca",
        cena: 3.50
    },
    {
        naziv: "Štrudla z makom in orehi",
        opis: "Domača pečena štrudla z makovim in orehovim nadevom",
        kategorija: "Sladice",
        alergeni: "Gluten, mleko, oreščki",
        cena: 3.90
    },
    {
        naziv: "Rezanci z makom",
        opis: "Domači široki rezanci z mletim makom in sladkorjem",
        kategorija: "Sladice",
        alergeni: "Gluten, jajca",
        cena: 3.50
    }
];

const menuContainer = document.getElementById("jedilnik");
const filterButtons = document.querySelectorAll(".filter-button");

function displayDishes(category) {
    menuContainer.replaceChildren();

    const categories = category === "Vse"
        ? ["Predjedi", "Glavne jedi", "Sladice"]
        : [category];
    categories.forEach(currentCategory => {
        const heading = document.createElement("h2");
        heading.textContent = currentCategory;
        menuContainer.appendChild(heading);

        const div = document.createElement("div");
        div.className = "table-wrapper";
        const table = document.createElement("table");

        const caption = document.createElement("caption");
        caption.className = "captions";
        if (currentCategory === "Predjedi") {
            caption.textContent = "Tradicionalne hladne in tople predjedi ter domače juhe";
        } else if (currentCategory === "Glavne jedi") {
            caption.textContent = "Bogate glavne jedi vojvodinske ravnice";
        } else if (currentCategory === "Sladice") {
            caption.textContent = "Avtentične bunjevačke in vojvodinske sladice";
        }
        table.appendChild(caption);

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        ["Jed", "Opis", "Alergeni", "Cena"].forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        dishes
            .filter(dish => dish.kategorija === currentCategory)
            .forEach(dish => {
                const row = document.createElement("tr");

                const nameCell = document.createElement("td");
                nameCell.textContent = dish.naziv;

                const descriptionCell = document.createElement("td");
                descriptionCell.textContent = dish.opis;

                const allergensCell = document.createElement("td");
                allergensCell.textContent = dish.alergeni;

                const priceCell = document.createElement("td");
                priceCell.textContent = dish.cena.toFixed(2)
                    .replace(".", ",") + " €";

                row.append(nameCell, descriptionCell, allergensCell, priceCell);
                tbody.appendChild(row);
            });

        table.appendChild(tbody);
        div.appendChild(table);
        menuContainer.appendChild(div);
    });
}


filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        displayDishes(button.dataset.category);
    });
});

displayDishes("Vse");
