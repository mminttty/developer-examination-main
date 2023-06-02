let endpoint = "http://128.199.80.110:12111";
// render
$(document).ready(function () {
  renderInit();
});

const renderInit = () => {
  renderTable();
};

const addForm = document.getElementById("add-form");
const inputName = document.getElementById("add-item-name");
const inputPrice = document.getElementById("add-item-price");
const inputQTY = document.getElementById("add-item-qty");
const inputDesc = document.getElementById("add-item-desc");

const updateForm = document.getElementById("update-form");
const fixID = document.getElementById("update-item-id");
const fixName = document.getElementById("update-item-name");
const fixPrice = document.getElementById("update-item-price");
const fixQTY = document.getElementById("update-item-qty");
const fixDesc = document.getElementById("update-item-desc");

const dataTable = [];

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const qty = inputQTY.value;
  const description = inputDesc.value;

  createItem({
    id: dataTable.length + 1,
    name,
    price,
    qty,
    description,
  });
});

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = fixName.value;
  const price = fixPrice.value;
  const qty = fixQTY.value;
  const description = fixDesc.value;

  updateItem({ id: fixID.value, name, price, qty, description });
});

const createItem = async (data) => {
  // console.log("NEW DATA : ", data);
  await dataTable.push(data);
  // console.log("Data in Table : ", dataTable);
  renderInit();
};

const updateItem = async (data) => {
  const toUpdate = dataTable.find((item) => item.id === parseInt(data.id));
  if (toUpdate) {
    toUpdate.name = data.name;
    toUpdate.price = data.price;
    toUpdate.qty = data.qty;
    toUpdate.description = data.description;
    renderInit();
  } else {
    console.log("NOT FOUND ID : ", data.id);
  }
  // console.log("Data in Table : ", dataTable);
};

const selected = (id) => {
  const value = dataTable.find((item) => item.id === id);

  fixID.value = value.id;
  fixName.value = value.name;
  fixPrice.value = value.price;
  fixQTY.value = value.qty;
  fixDesc.value = value.description;
};

const renderTable = async () => {
  const tableItems = document.getElementById("table-item");
  const tbody = tableItems.querySelector("tbody");

  try {
    console.log("loading");
    tbody.innerHTML = "";

    await dataTable.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${item.id}</id>
      <td>${item.name}</id>
      <td>${item.price}</id>
      <td>${item.qty}</id>
      <td>${item.description}</id>
      <td><button class="btn btn-warning" type="submit" onclick='selected(${item.id})'>Select</button></id>
      `;
      tbody.appendChild(row);
    });
  } catch {
    console.log("unloading");
  }
};
