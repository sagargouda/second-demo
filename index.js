function saveToLocalStorage(event) {
  event.preventDefault();
  const price = event.target.price.value;
  const dish = event.target.dname.value;
  const table = event.target.tab.value;

  const obj = {
    price,
    dish,
    table,
  };

  axios
    .post(
      "https://crudcrud.com/api/94234d7e600b4f14bf8505062106b54c/container",
      obj
    )
    .then((response) => {
      showUserOnScreen(response.data);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/94234d7e600b4f14bf8505062106b54c/container")
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function showUserOnScreen(obj) {
  const parentElement = document.getElementById("listOfitems");
  const childElement = document.createElement("li");

  const displayText = `${obj.price || "Price"} - ${obj.dish || "Dish"} - ${
    obj.table || "Table"
  }`;
  childElement.textContent = displayText;
  childElement.id = obj._id; // Assign a unique ID based on the item's ID

  // Determine the correct table section based on obj.table
  const tableSection = document.getElementById(
    obj.table.toLowerCase().replace(" ", "")
  );

  if (tableSection) {
    // Remove the child element from its current location
    removeUserFromScreen(obj._id);

    // Append the child element to the correct table section
    tableSection.appendChild(childElement);

    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "edit product";
    editButton.style.marginLeft = "10px";
    editButton.onclick = () => {
      editUser(obj);
    };
    childElement.appendChild(editButton);

    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete product";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = () => {
      deleteUser(obj._id, childElement);
    };
    childElement.appendChild(deleteButton);
  }
}

function editUser(obj) {
  const newPrice = prompt("Enter new price:", obj.price);
  const newDish = prompt("Enter new dish:", obj.dish);
  const newTable = prompt("Enter new table:", obj.table);

  if (newPrice !== null && newDish !== null && newTable !== null) {
    const updatedObj = {
      price: newPrice,
      dish: newDish,
      table: newTable,
    };

    axios
      .put(
        "https://crudcrud.com/api/94234d7e600b4f14bf8505062106b54c/container/" +
          obj._id,
        updatedObj
      )
      .then((response) => {
        // Update the item on the screen
        removeUserFromScreen(obj._id);
        showUserOnScreen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function deleteUser(id, childElement) {
  axios
    .delete(
      "https://crudcrud.com/api/94234d7e600b4f14bf8505062106b54c/container" + id
    )
    .then((response) => {
      removeUserFromScreen(id);
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeUserFromScreen(id) {
  const childElement = document.getElementById(id);
  if (childElement && childElement.parentNode) {
    childElement.parentNode.removeChild(childElement);
  }
}
